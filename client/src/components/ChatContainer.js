import React, { useState, useEffect } from 'react'
import ChatArea from './ChatArea'
import ChatInput from './ChatInput'
import styled from 'styled-components'

const ChatContainer = (props) => {
  const { userId } = props
  console.log(`Logged in as ${userId}`)


  // const {chats, users, chatId} = props
  const sendMessage = (msg) => {
    console.log(userId,':', msg)
    const msgObj = {
      userId,
      text: msg
    }
    // appendMessagesToChat(msgObj)
  }

  const StyledSection = styled.section`
    width: 60%;
    max-width: 80rem;
    margin: 5rem auto;
    border: 1px solid lightgrey;
    background: whitesmoke;
  `

  return (
    <StyledSection>
      <span>Logged in as '{userId}'</span>
      <ChatArea userId={userId} />
      <ChatInput sendMessage={sendMessage} />
    </StyledSection>
  )
}

export default ChatContainer