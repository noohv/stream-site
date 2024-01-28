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
    socket.emit('message', inputMessage)
    setInputMessage('')
  }

  return (  
    <>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
