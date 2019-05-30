// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import namor from 'namor'

const namorConfig = { words: 2, numbers: 2, char: 'a', manly: true }

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig)
    this.auth = firebase.auth()
    this.userObj = null
    this.chatsCollection = null
    this.db = firebase.firestore()
    this.rt = firebase.database()

    if (this.userObj === null) {
      this.doSignOut()
      this.chatsCollection = null
    }
  }

  // *** Auth API ***
    setUserObserver = () => new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged(async user => {
        if (user) {
          const isAnonymous = user.isAnonymous;
          if (isAnonymous) console.log("*** USER IS ANONYMOUS ***")
          console.log("Sign-in provider: " + user.providerId)
          console.log("  UID: " + user.uid)
          if (!isAnonymous) (console.log("  Email: " + user.email))
          if (user.displayName) console.log("  Name: " + user.displayName)
          
          if (isAnonymous) {
            const randomName = namor.generate(namorConfig)
            console.log('is anon', randomName)
            await user.updateProfile({
              displayName: randomName,
            }).then(res => console.log(`Updated anonymous displayName:`, user.displayName))
            .catch(err => console.log(`${err.code}: ${err.message}`))
          }

          // SET PRESENCE
          const userStatusDatabaseRef = this.rt.ref('/status/' + user.uid)
          const isOfflineForDatabase = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
          }
          const isOnlineForDatabase = {
            state: 'online',
            nickname: user.displayName,
            last_changed: firebase.database.ServerValue.TIMESTAMP,
          }

          this.rt.ref('.info/connected').on('value', snapshot => {
            if (!snapshot.val()) return
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
              userStatusDatabaseRef.set(isOnlineForDatabase)
            })
          })

          this.userObj = user
          unsubscribe()
          return user
        } else {
          this.userObj = null
          this.chatsCollection = null
          console.log('Please sign in.')
        }
      })
    })

    getUserObj = () => this.userObj

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password).catch(err => console.log(err))
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password).then(res => res.user).catch(err => console.log(err))
    doSignOut = () => {
      const userObj = this.auth.currentUser
      console.log('doSignout', userObj)
      if (userObj) {
        this.rt.ref('/status/' + userObj.uid).set({
          state: 'offline',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        }).then(() => {
          if (userObj.isAnonymous) console.log('Removed anon from rt')
        })
      }
      if (userObj && userObj.isAnonymous) {
        userObj.delete().then(res => {
          console.log('Deleted anon')
        }).catch(err => console.log(err.code, err.message))
        this.auth.signOut().then(res => console.log('signed out:', res)).catch(err => console.log(err.code, err.message))
      } else {
        this.auth.signOut().then(res => console.log('signed out:', res)).catch(error => console.log('error:', error))
      }
    }
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email).catch(err => console.log(err))
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password).catch(err => console.log(err))

    // *** Firestore API ***

    getContactDisplayName = async (contactId) => {
      let contact = await this.db.collection("users").doc(contactId).get()
      return contact.data().displayName
    }

    contactsFromUsersSnapshotHelper = (snapshot, uid = this.auth.currentUser.uid) => {
      if (this.auth.currentUser.isAnonymous) return null
      const users = snapshot.docs.map(doc => doc.data())
      const userThreads = users.find(user => user.id === uid).threads
      const filteredThreads = userThreads.filter(el => el.length > 20)
      const contactsArray = filteredThreads.map(id => {
          const contactId = id.replace(uid, '')
          const contactObj = users.find(user => user.id === contactId)
          const displayName = contactObj === undefined ? '' : contactObj.displayName
          return { id, displayName }
      })
      return contactsArray.filter(el => el !== undefined)
    }

    sendMessage = async ({senderId, receiverId, messageText}) => {
      const docId = senderId > receiverId ? `${senderId}${receiverId}` : `${receiverId}${senderId}`
      const status = 'sent'
      const refId = await this.db.collection('chats').doc().id
      console.log(refId)
      const message = {
        messageText,
        senderId,
        receiverId,
        status,
        'timestamp': Date.now()
      }
      return this.db.collection("chats").doc(docId).update({ [refId] : message })
      .then(console.log("Document successfully written!"))
      .catch(err => console.error("Error writing document: ", err))
    }
}

export default Firebase

    // contactsOnlineListener = () => {
    //   const userStatusDatabaseRef = this.rt.ref('/status/')
    //   userStatusDatabaseRef.on('value', snapshot => {
    //     const users = snapshot.val()
    //     console.log('USERS ONLINE:', users)
    //   })
    // }

    // getUserThreadIds = async () => {
    //   let fetch = await this.db.collection("users").doc(this.userObj.uid).get()
    //   let filteredThreads = fetch.data().threads
    //   return await filteredThreads
    // }