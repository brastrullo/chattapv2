import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ChatArea = (props) => {
  const { authObj, thread, contactName, backToThreads} = props
  const messagesEnd = useRef(null)
  const scrollToBottom = () => messagesEnd.current.scrollIntoView()

  useEffect(() => scrollToBottom(), [thread])

  const formattedMessages = thread.map(item => item).sort((a, b) => a.timestamp - b.timestamp)

  const Messages = ({className}) => formattedMessages.map((obj, i) => {
    const timestamp = new Date(obj.timestamp).toLocaleString()
    return (
      <div key={i} className={`${className} ${authObj.uid === obj.senderId ? 'msg-sent' : 'msg-received'}`}>
        <span className="sender">
          { authObj.uid === obj.senderId ? 'You' : contactName }
        </span>
        <div className="text">{obj.messageText}</div>
        <p className="timestamp">{`${timestamp} ${obj.status}`}</p>
      </div>
    )
  })
  
  const StyledSection = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100%;
    margin: auto;
    padding: 2rem 1rem 3.5rem;
    overflow: scroll;

    .back-btn {
      position: absolute;
      top: .5rem;
      left: .5rem;
      z-index: 99999999;
      display: inline-block;
      background: none;
      border: none;
      text-shadow: 0 0 1px darkgrey;
      color: darkgrey;
      font-size: 1.5rem;
      height: 1.5rem;
      padding: 0;
      &:hover {
        text-shadow: 0 -1px 1px darkgrey;
      }
      &:active {
        text-shadow: 0 0 1px black;
      }
    }

    .contact-name {
      display: inline-block;
      padding: .5rem;
      margin: 0;
      height: 3rem;
      line-height: 2rem;
      color: grey;
      text-shadow: 0 0 1px grey;
      font-size: 1.5rem;
      width: 100%;
      position: absolute;
      background: linear-gradient(to bottom, whitesmoke, rgba(0,0,0, 0));
      top: 0;
      left: 0;
    }
  `

  const StyledMessages = styled(Messages)`
    & {
      border-radius: 7px;
      padding: .1rem 1rem 1rem;
      margin-bottom: 1.2rem;
      word-wrap: break-word;
      width: 45%;
      max-width: 500px;
      display: block;
      box-shadow: 0 1px 5px lightgray;
      position: relative;
      background: #00aabb;
      border-radius: .4em;
      .timestamp {
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: -1.1rem;
        font-size: .8rem;
        color: lightgray;
        text-shadow: 0 0 1px lightgray;
      }
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
        .timestamp {
          right: 1rem; 
        }
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
      <button className="back-btn" onClick={backToThreads}>&lt;back</button>
      <p className="contact-name">{contactName}</p>
      <StyledMessages />
      <div ref={messagesEnd} />
    </StyledSection>
  )
}

export default ChatArea
