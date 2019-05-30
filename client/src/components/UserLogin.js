import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledSection = styled.section`
  & {
    display: flex;
    flex-flow: column nowrap;
    width: 60%;
    height: 100%;
    max-width: 50rem;
    margin: 5rem auto;
    justify-content: center;
    align-items: center;
    color: slategray;
    text-shadow: 1px 0 1px lightgray;
    form {
      padding: 0;
      width: 20rem;
    }
    fieldset {
      height: 100%;
      width: 100%;
      padding: 1rem;
      margin: 0;
      border: none;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: flex-start;
    }
    legend {
      position: relative;
      top: .8rem;
      padding: 0;
    }
    input {
      width: 100%;
      height: 2rem;
      font-size: 1.2rem;
      margin: 1rem 0;
      border: none;
      border: 1px solid lightgray;
      padding-left: .5rem;
      border-radius: 8px;
      :first-of-type {
        margin-top: 0;
      }
    }
    input:last-of-type {
      font-size: 1.2rem;
      margin: 2px;
      color: white;
      height: 2rem;
      border: none;
      border-radius: 5px;
      text-shadow: 0 1px 2px gray;
      background: linear-gradient(lightskyblue, skyblue);
      box-shadow: 0 0 .5rem lightgrey;
      :hover {
        filter: brightness(105%);
        box-shadow: 0 0 1px lightgray;
        text-shadow: 0 -1px 3px gray;
      }
      :active {
        filter: brightness(.8);
        box-shadow: none;
        text-shadow: none;
      }
      :disabled {
        background: lightgrey;
        filter: brightness(.8);
        box-shadow: none;
        text-shadow: none;
      }
    }
  }
`

const UserLogin = (props) => {
  const { loginUser, firebase } = props
  const [user, setUser] = useState('brastrullo@gmail.com')
  const [pass, setPass] = useState('login123')
  const [newUser, setNewUser] = useState('')
  const [userLoading, setUserLoading] = useState(false)


  useEffect(() => { firebase.setUserObserver() }, [firebase])
  useEffect(() => { if (user !== '') console.log(`user: ${user}`)}, [user])
  useEffect(() => { if (pass !== '') console.log(`pass: ${pass}`)}, [pass])
  useEffect(() => { if (newUser !== '') console.log(`newUser: ${newUser}`)}, [newUser])

  const handleChangeInput = (e) => {
    if (e.target.id === 'username') setUser(e.target.value)
    if (e.target.id === 'password') setPass(e.target.value)
    if (e.target.id === 'newUser') setNewUser(e.target.value)
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    setUserLoading(true)
    firebase.doSignInWithEmailAndPassword(user, pass).then(userObj => {
      if (userObj.email) {
        setUserLoading(false)
        loginUser(userObj)
      }
    })
  }

  const guestLogin = async (e) => {
    e.preventDefault()
    setUserLoading(true)
    firebase.auth.signInAnonymously().then(userObj => {
      setUserLoading(false)
      loginUser(userObj.user)
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`)
    })
  }

  return (
    <StyledSection>
      <p>CHATTAP v2</p>
      <form onSubmit={submitLogin}>
        <fieldset>
          <legend>user login</legend>
          <label className="visuallyhidden" htmlFor="username">Email: </label>
          <input placeholder="username" type="text" name="username" id="username" onChange={handleChangeInput} autoFocus={true} />
          <label className="visuallyhidden" htmlFor="password">Password: </label>
          <input placeholder="password" type="password" name="password" id="password" onChange={handleChangeInput} />
          <label className="visuallyhidden" htmlFor="login">Login</label>
          <input type="submit" name="login" id="login" value={userLoading ? 'logging in...' : 'login'} disabled={userLoading} />
        </fieldset>
      </form>
      <form onSubmit={guestLogin}>
        {/* <fieldset>
          <legend>create new user</legend>
          <label className="visuallyhidden" htmlFor="newUser">Email: </label>
          <input placeholder="email" type="text" name="newUser" id="newUser" onChange={handleChangeInput} />
          <label className="visuallyhidden" htmlFor="createNewUser">Create New User</label>
          <input type="submit" name="createNewUser" id="createNewUser" value="new user" />
        </fieldset> */}
        <fieldset>
          <legend>login as guest</legend>
          <label className="visuallyhidden" htmlFor="guestLogin">Guest Login</label>
          <input type="submit" name="guestLogin" id="guestLogin" value="guest" />
        </fieldset>
      </form>
    </StyledSection>
  )
}

export default UserLogin

