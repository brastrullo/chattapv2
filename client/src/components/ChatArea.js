import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const loremipsum = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
const ChatArea = (props) => {
  const { userId } = props
  const dbMsgs = [
    { sender: 'Bro', text: 'hey' },
    { sender: 'Bro', text: loremipsum },
    { sender: 'Brad', text: '?' },
  ]
  const [ messages, setMessages ] = useState(dbMsgs)
  const updateMessages = (msg) => setMessages([ ...messages, ...msg])

  const Messages = ({className}) => messages.map( (obj, i) => (
    <div key={i} className={`${className} ${userId === obj.sender ? 'msg-sent' : 'msg-received'}`}>
      <span className="sender">
        { userId === obj.sender ? 'You' : obj.sender }
      </span>
      <div className="text">{obj.text}</div>
    </div>
  ))

  const StyledSection = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    margin: auto;
    padding: 1rem;
  `

  const StyledMessages = styled(Messages)`
    border-radius: 7px;
    padding: .1rem 1rem 1rem;
    margin: 0;
    word-wrap: break-word;
    width: 40%;
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
  `
  return (
    <StyledSection>
      <StyledMessages />
    </StyledSection>
  )
}

export default ChatArea
