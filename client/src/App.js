import React, { useState, useEffect } from 'react'
import './App.css'
import UserLogin from './components/UserLogin.js'
import ChatContainer from './components/ChatContainer.js'

function App() {
  const [userLogin, setUserLogin] = useState(null)
  useEffect(() => {

  })
  const isLoggedIn = (userLogin === null) ? false : true

  const loginUser = (user) => setUserLogin(user)

  return (
    <div className="App">
      { !isLoggedIn
        ? <UserLogin loginUser={loginUser} />
        : <ChatContainer userId={userLogin} />
      }
    </div>
  )
}

export default App