import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { useParams } from 'react-router-dom'

const socket = io('http://localhost:3000')

interface Message {
  user: string
  text: string
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const lastMessageRef = useRef<null | HTMLDivElement>(null)
  let { username } = useParams()

  useEffect(() => {
    socket.emit('join', username);
  }, [username])

  useEffect(()=> {
    socket.on('message', (msg) => {
      setMessages([...messages, {user: 'USERIS', text: msg}])
    })

    lastMessageRef.current?.scrollIntoView()
  },[messages])

  const handleSendMessage = () => {
    if(inputMessage !== "") {
      socket.emit('message', {message: inputMessage, room: username})
      setInputMessage('')
    }
  }

  const handleEnter = (e: { keyCode: number; shiftKey: any }) => {
    if(e.keyCode == 13 && !e.shiftKey) {
      handleSendMessage()
    }
  }

  return (  
      <div className='flex flex-col justify-between h-full'>
        <div
          className='flex flex-col h-max max-h-full overflow-y-auto'
        >
          {messages.map((msg, index) => (
            <div
              className='h-10 p-2 rounded text-left hover:bg-gray-600'
              key={index} ref={lastMessageRef}>
              <span>{msg.user}: </span>
              <span>{msg.text}</span>  
            </div>
          ))}
        </div>
        <div>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='bg-slate-950 resize-none'
            onKeyDown={handleEnter}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
  )
}

export default Chat
