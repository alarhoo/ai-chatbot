'use client' // Client component

import { useState, useRef, useEffect } from 'react'
import Message from './Message'

const ChatArea = ({ conversation, onSendMessage }) => {
  const [messages, setMessages] = useState(conversation?.messages || [])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages(conversation?.messages || [])
  }, [conversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow p-4 space-y-2 overflow-y-auto'>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 border-t border-gray-700 flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          className='flex-grow bg-gray-800 text-white p-2 rounded mr-2'
        />
        <button onClick={handleSendMessage} className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded'>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatArea
