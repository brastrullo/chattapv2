import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ChatArea = (props) => {
  const { authObj, thread } = props
  const [ messages, setMessages ] = useState(thread)
  const messagesEnd = useRef(null)
  const scrollToBottom = () => messagesEnd.current.scrollIntoView()

  useEffect(() => scrollToBottom(), [thread])

  const formattedMessages = thread.map(item => item).sort((a, b) => a.timestamp - b.timestamp)
  const updateMessages = (msg) => setMessages([ ...messages, ...msg])
  
  const Messages = ({className}) => formattedMessages.map((obj, i) => (
    <div key={i} className={`${className} ${authObj.uid === obj.senderId ? 'msg-sent' : 'msg-received'}`}>
      <span className="sender">
        { authObj.uid === obj.senderId ? 'You' : 'Sender' }
      </span>
      <div className="text">{obj.messageText}</div>
      <p className="timestamp">{obj.status} {obj.timestamp}</p>
    </div>
  ))
  
  const StyledSection = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    margin: auto;
    padding: 1rem;
    max-height: 50vh;
    overflow: scroll;
  `

  const StyledMessages = styled(Messages)`
    & {
      border-radius: 7px;
      padding: .1rem 1rem 1rem;
      margin: 0;
      word-wrap: break-word;
      width: 45%;
      max-width: 500px;
      display: block;
      box-shadow: 0 1px 5px lightgray;
      position: relative;
      background: #00aabb;
      border-radius: .4em;
      ::before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        top: 0px;
      }
      & + & {
        margin-top: .5em;
      }
      .sender {
        font-size: .75rem;
        opacity: .4;
      }
      &.msg-sent {
        margin-right: 10px;
        background: linear-gradient(lightskyblue, skyblue);
        text-align: right;
        color: whitesmoke;
        text-shadow: 0px 1px 2px gray;
        ::before {
          left: auto;
          right: -10px;
          bottom: auto;
          border: 10px solid;
          border-color: lightskyblue transparent transparent transparent;
        }
        .sender {
          text-align: right;
        }
      }
      &.msg-received {
        color: darkslategrey;
        margin-left: 10px;
        align-self: flex-start;
        background: lightgrey;
        text-align: left;
        text-shadow: 0px 1px 1px gray;
        ::before {
          right: auto;
          left: -10px;
          bottom: auto;
          border: 10px solid;
          border-color: lightgrey transparent transparent transparent;
        }
        .sender {
          text-align: left;
        }
      }
    }
  `

  return (
    <StyledSection>
      <StyledMessages />
      <div ref={messagesEnd} />
    </StyledSection>
  )
}

export default ChatArea
