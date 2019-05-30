import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  & {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin: .5rem;
    padding: .1rem 1rem .1rem;
    box-shadow: 0px 1px 5px lightgray;
    background: white;
    border-radius: 5px;
    label {
      display: none;
      visibility: hidden;
    }
    .input-msg {
      margin: 0;
      padding: 0px;
      width: 100%;
      border: none;
      height: 2rem;
      font-size: 1rem;
    }
    .submit-btn {
      font-size: 1.2rem;
      margin: 2px;
      color: white;
      height: 2rem;
      width: 2rem;
      border: none;
      border-radius: 50%;
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
  }
`

const ChatInput = (props) => {
  const sendMessage = props.sendMessage
  const [message, setMessage] = useState('')

  useEffect(() => { if (message !== '') console.log('Typing...')}, [message])
  const updateMessage = (e) => setMessage(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="message"></label>
        <input
          key='chatinputone'
          className="input-msg"
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={updateMessage}
        />
        <label htmlFor="submit"></label>
      <input className="submit-btn" type="submit" id="submit" name="submit" value="#"/>
    </StyledForm>
  )
}

export default ChatInput