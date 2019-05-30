import React, { useState, useEffect } from 'react'
import ChatArea from './ChatArea'
import ChatInput from './ChatInput'
import styled from 'styled-components'
import ChatThreads from './ChatThreads'

const StyledSection = styled.section`
  width: 60%;
  max-width: 80rem;
  margin: 5rem auto;
  background: whitesmoke;
`

const ChatContainer = (props) => {
  const { firebase, authObj, signUserOut } = props
  const [thread, setThread] = useState(null)
  const [threadId, setThreadId] = useState(null)
  const threadSelected = threadId ? threadId : null
  const [contacts, setContacts] = useState(null)
  const [msgPreviews, setMsgPreviews] = useState(null)
  const [msgPreviewsLoading, setMsgPreviewsLoading] = useState(false)
  const [usersOnline, setUsersOnline] = useState({})
  const updateContacts = (obj) => setContacts(obj)
  const updateMsgPreviews = (obj) => setMsgPreviews(obj)

  useEffect(() => {if (usersOnline !== null) console.log('USERS ONLINE: ', usersOnline)}, [usersOnline])
  useEffect(() => {if (contacts !== null) console.log('CONTACTS: ', contacts)}, [contacts])
  useEffect(() => {if (msgPreviews !== null) console.log('MSG_PREVIEWS: ', msgPreviews)}, [msgPreviews])
  useEffect(() => {if (thread !== null) console.log('THREAD: ', thread)}, [thread])

  useEffect(() => {
    const contactsArrayListener = () => firebase.db.collection('users').onSnapshot(snapshot => {
      const contactsArray = firebase.contactsFromUsersSnapshotHelper(snapshot)
      updateContacts(contactsArray)
    })
    contactsArrayListener()
  }, [firebase])

  useEffect(() => {
    if (contacts !== null) {
      const messagePreviewListener = async () => {
        let msgPreview = {}
        contacts.forEach(contact => {
          firebase.db.collection('chats').doc(contact.id).onSnapshot(snapshot => {
            setMsgPreviewsLoading(true)
            msgPreviewHelper(snapshot, contact, msgPreview)
            updateMsgPreviews(msgPreview)
            setMsgPreviewsLoading(false)
          })
        })
        const msgPreviewHelper = (snapshot, contact, obj) => {
          const lastMsg = Object.values(snapshot.data())[0]
          const messageObj = {
            'id'          : contact.id,
            'displayName' : contact.displayName,
            'messageText' : lastMsg.messageText,
            'status'      : lastMsg.status,
            'timestamp'   : lastMsg.timestamp
          }
          obj[contact.id] = messageObj
          return obj
        }
      }
      
      messagePreviewListener()
    }
  }, [firebase, contacts])

  useEffect(() => {
    if (threadId !== null) {
      firebase.db.collection('chats').doc(threadId)
      .onSnapshot(snapshot => setThread(Object.values(snapshot.data())))
    }
  }, [firebase, threadId])

  useEffect(() => {
    firebase.rt.ref('/status/').on('value', snapshot => {
      const filtered = Object.entries(snapshot.val())
        .map(user => ({ ...user[1], 'uid': user[0]}))
        .filter(obj => obj.state === 'online')
        
      setUsersOnline({...filtered})
    })
  }, [firebase])

  const threadClicked = (threadId) => {
    console.log('thread selected: ', threadId)
    setThreadId(threadId)
  }

  const sendMessage = (messageText) => {
    console.log(authObj.displayName,':', messageText)
    const receiverId = threadId.replace(authObj.uid,'')
    const senderId = authObj.uid
    const message = {
      messageText,
      senderId,
      receiverId
    }
    firebase.sendMessage(message)
  }

  const signOut = () => signUserOut()
  
  return (
    <StyledSection>
      <button onClick={signOut}>sign out</button>
      { threadSelected &&  thread ? (
            <>
              <ChatArea authObj={authObj} thread={thread} />
              <ChatInput sendMessage={sendMessage} />
            </>
        ) : (
          <>
            {
              authObj.isAnonymous || (!authObj.isAnonymous && msgPreviews && !msgPreviewsLoading) ? (
                <ChatThreads
                  firebase={firebase}
                  msgPreviews={msgPreviews !== {} ? msgPreviews : null}
                  authObj={authObj}
                  usersOnline={usersOnline}
                  userThreads={contacts}
                  threadClicked={threadClicked}
                  getContactDisplayName={(id) => firebase.getContactDisplayName(id)}
                />
              ) : (
                <p>Loading...{` yes${authObj.isAnonymous}`}</p>
              )
            }
          </>
        )
      }
    </StyledSection>
  )
}

export default ChatContainer