import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
const StyledSection = styled.section`
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
  }

  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`
const UserLogin = (props) => {
  const { loginUser } = props
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  useEffect(() => { if (user !== '') console.log(`user: ${user}`)}, [user])
  useEffect(() => { if (pass !== '') console.log(`pass: ${pass}`)}, [pass])

  const handleChangeInput = (e) => {
    if (e.target.id === 'username') setUser(e.target.value)
    if (e.target.id === 'password') setPass(e.target.value)
  }

  const submitLogin = (e) => {
    e.preventDefault()
    const isValid = isAuth(user, pass)
    // if (isValid) { 
    //   loginUser(user)
    //   console.log('Login')
    // } else {
    //   console.log('Invalid Login')
    // }
    user === '' ?
      loginUser('Brad') :
      loginUser(user)
  }

  const createNewUser = (e) => {
    e.preventDefault()
    console.log(`new user created`)
  }


  const isAuth = (user, pass) => {
    // TO-DO
    if (user && pass) return false
  }

  return (
    <StyledSection>
      <p>CHATTAP v2</p>
      <form onSubmit={submitLogin}>
        <fieldset>
          <legend>user login</legend>
          <label className="visuallyhidden" htmlFor="username">Email: </label>
          <input placeholder="username" type="text" name="username" id="username" onChange={handleChangeInput} />
          <label className="visuallyhidden" htmlFor="password">Password: </label>
          <input placeholder="password" type="password" name="password" id="password" onChange={handleChangeInput} />
          <label className="visuallyhidden" htmlFor="login">Submit</label>
          <input type="submit" name="login" id="login" value="login" onChange={handleChangeInput} />
        </fieldset>
      </form>
      <form onSubmit={createNewUser}>
        <fieldset>
          <legend>new user</legend>
          <label className="visuallyhidden" htmlFor="newuser">Email: </label>
          <input placeholder="email" type="text" name="newuser" id="newuser" onChange={handleChangeInput} />
          <label className="visuallyhidden" htmlFor="submit">Submit</label>
          <input type="submit" name="submit" id="submit" value="submit" />
        </fieldset>
        <fieldset>
          <legend>login as guest</legend>
          <label className="visuallyhidden" htmlFor="guestuser">Submit</label>
          <input type="submit" name="guestuser" id="guestuser" value="guest" />
        </fieldset>
      </form>
    </StyledSection>
  )
}

export default UserLogin