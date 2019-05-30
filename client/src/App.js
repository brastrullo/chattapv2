import React, { useState, useEffect } from 'react'
import './App.css'
import UserLogin from './components/UserLogin.js'
import ChatContainer from './components/ChatContainer.js'
import { FirebaseContext } from './Firebase'

  // set up security
  // add db write rules (max msgs)

const App = () => {
  const [authObj, setAuthObj] = useState(null)

  useEffect(() => { if (authObj !== null) console.log('App has AUTH_OBJ: ', authObj)}, [authObj])

  const updateUserObject = (obj) => setAuthObj(obj)

  return (
    <FirebaseContext.Consumer>
      {firebase =>
        <div className="App">
          { authObj === null ? (
              <UserLogin
                firebase={firebase}
                loginUser={updateUserObject}
              />
            ) : (
              <ChatContainer
                firebase={firebase}
                signUserOut={() => { firebase.doSignOut(); setAuthObj(null) }}
                authObj={authObj}
              />
            )
          }
        </div>
      }
    </FirebaseContext.Consumer>
  )
}

export default App