import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'

const socket = io('http://localhost:3000')

function App() {
  const [messages, setMessages] = useState<String[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(()=> {
    socket.on('message', (msg) => {
      setMessages([...messages, msg])
    })
  },[messages])

  const handleSendMessage = () => {
    if(inputMessage !== "") {
      socket.emit('message', inputMessage)
      setInputMessage('')
    }
  }

  const handleEnter = (e) => {
    if(e.keyCode == 13 && !e.shiftKey) {
      handleSendMessage()
    }
  }

  return (  
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col h-max max-h-full overflow-y-auto'>
          {messages.map((msg, index) => (
            <div
              className='h-6 text-left'
              key={index}>{msg}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='bg-slate-950'
            onKeyDown={handleEnter}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
  )
}

export default App
