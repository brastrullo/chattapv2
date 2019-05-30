import React, { useState } from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  & {
    background: lightgrey;
    display: flex;
    flex-flow: column nowrap;
    padding: 0;
    margin: 0;
    list-style-type: none;
    z-index: -1;
    box-shadow: 0 1px 10px lightgray;

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row nowrap;
      background: white;
      width: 100%;
      height: 6rem;
      padding: 1rem;
      & + li {
        border-top: 1px solid lightgrey;
      }
      .display-picture {
        width: 3.5rem;
        height: 3.5rem;
        background: lightgrey;
        border-radius: 50%;
        margin-right: 1rem;
      }
      .text {
        text-align: left;
        width: calc(100% - 3.5rem - 2rem);
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        span {
          display: inline-block;
          height: 1.2rem;
          color: darkgrey;
          margin-bottom: .5rem;
        }
        p {
          margin: 0;
          padding: 0;
          display: block;
        }
        small {
          font-size: .8rem;
          color: grey;
        }
      }
    }
  }
`
const StyledDiv = styled.div`
  & {
    position: relative;
    height: 100%;
    text-shadow: 0 1px 2px lightgray;
    header {
      position: relative;
      padding: .5rem;
      color: white;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      align-items: center;
      background: linear-gradient(lightskyblue, skyblue);
      box-shadow: 0 1px 10px lightgrey;
      z-index: 999;

      .chattap {
        align-self: flex-start;
      }
      .display-picture {
        width: 5rem;
        height: 5rem;
        background: grey;
        border-radius: 50%;
        box-shadow: 0 1px 3px grey;
      }
    }
    .header-username {
      margin: .5rem;
      font-size: 1.5rem;
    }
    &.isAnon {
      header {
        background: rgb(25%, 25%, 25%);
      }
      .display-picture {
        background: grey;
      }
    }
  }
`

const ChatThreads = (props) => {
  const { 
    authObj,
    usersOnline,
    msgPreviews,
    threadClicked
  } = props
  const username = authObj.displayName ? authObj.displayName: authObj.email
  const [isModalShown, setIsModalShown] = useState(false)

  const Threads = () => {
    const arr = msgPreviews ? Object.values(msgPreviews).map(obj => obj) : []
    const selectThread = (id, contact) => {
      threadClicked(id, contact)
    }
    return arr.map((thread, i) => {
      const timestamp = new Date(thread.timestamp).toLocaleString()
      return (
        <li key={i} onClick={() => selectThread(thread.id, thread.displayName)}>
          <div className="display-picture" src="/" alt="display-picture"/>
          <div className="text">
            <span>{thread.displayName}</span>
            <p>{thread.messageText}</p>
            <small>{`${timestamp}`}</small>
          </div>
        </li>
      )

    })
  }
  
  const newThread = ({className}) => {
    return (
      <button
        id="addNewThread"
        onClick={showModal}
        className={className}
      >+</button>
    )
  }

  const showModal = (e) => {
    e.preventDefault()
    setIsModalShown(true)
    console.log('Modal shown', e.target)
  }

  const StyledNewThread = styled(newThread)`
    & {
      position: absolute;
      display: inline-block;
      bottom: 1rem;;
      right: 1rem;
      background: lightblue;
      text-shadow: 0 0px 2px lightgrey;
      box-shadow: 0 0 3px lightgrey;
      border: none;
      color: white;
      font-size: 2rem;
      border-radius: 50%;
      line-height: 100%;
      vertical-align: middle;
      text-align: center;
      height: 2.5rem;
      width: 2.5rem;
      padding: 0;
      margin: 0;
    }
  `

  const createThread = (contactUid) => {
    const chatId = authObj.uid > contactUid ? `${authObj.uid}${contactUid}` : `${contactUid}${authObj.uid}`
    threadClicked(chatId)
  }

  const Modal = ({className, title, contents}) => {
    const contacts = usersOnline ? Object.values(usersOnline).filter(user => user.uid !== authObj.uid) : []
    const contactsList = contacts.map((contact, i) => {
      return (
        <li onClick={createThread(contact.uid)} key={`contact${i}`}>
          <span>{contact.nickname}</span>
        </li>
      )
    })
    const closeModal = () => setIsModalShown(false)
    return (
      <div className={className}>
        <section className="modal">
          <button onClick={closeModal} className="modal-close">X</button>
          <h1>Add or Invite Contact</h1>
          <ul>
            { contactsList }
          </ul>
        </section>
      </div>
    )
  }

  const StyledModal = styled(Modal)`
    & {
      z-index: 999999999999;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(50, 50, 50, 0.6);
      h1 {
        font-size: 1rem;
        color: darkgrey;
      }
      .modal {
        z-index: 9999999;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20rem;
        width: 20rem;
        max-height: 80%;
        max-width: 80%;
        background: white;
        box-shadow: 0 0 1rem grey;
        border-radius: .8rem;
      }
      .modal-close {
        padding: 0;
        margin: 0;
        background: rgb(80%, 10%, 10%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1rem;
        height: 2rem;
        width: 2rem;
        text-shadow: 0 0 1px lightgrey;
        box-shadow: 0 0 1rem rgb(30%, 30%, 30%);
        position: absolute;
        display: inline-block;
        top: -.75rem;
        right: -.75rem;
      }
    }
  `

  // const SearchBar = () => {
  //   return <input type="search" placeholder="Search contacts" />
  // }



  return (
    <StyledDiv className={authObj.isAnonymous ? 'isAnon' : false}>
      <header>
        <span className="chattap">chattapp</span>
        <div className="display-picture" src="/" alt="display-picture" />
        <div className="header-username">{ username }</div>
        { authObj.isAnonymous && <small>Anon</small>}
      </header>
      <StyledList>
        <Threads />
      </StyledList>
      <StyledNewThread />
      { isModalShown && <StyledModal />}
    </StyledDiv>
  )
}

export default ChatThreads