'use client'
import { useState } from 'react'
import { Send, Search, Plus, Loader } from 'lucide-react'

function Sidebar({ onSearch }) {
  return (
    <div className='w-1/4 bg-gray-800 p-4 flex flex-col space-y-4'>
      <button onClick={onSearch} className='p-2 bg-blue-600 rounded-lg flex items-center'>
        <Search className='w-5 h-5 text-white mr-2' /> Search
      </button>
      <button className='p-2 bg-green-600 rounded-lg flex items-center'>
        <Plus className='w-5 h-5 text-white mr-2' /> New Chat
      </button>
    </div>
  )
}

function Mainbar({ messages, setMessages }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user' }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { text: data.response || 'No response received.', sender: 'bot' }])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [...prev, { text: 'Failed to get response from API.', sender: 'bot' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-900 text-white w-3/4'>
      <div className='flex-1 overflow-auto p-4 space-y-4'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className='p-4 bg-gray-800 flex items-center sticky bottom-0'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 p-2 bg-gray-700 rounded-lg focus:outline-none text-white sm:p-3 md:p-4'
          placeholder='Type a message...'
          disabled={loading}
        />
        <button onClick={sendMessage} className='ml-2 p-2 bg-blue-600 rounded-lg sm:p-3 md:p-4' disabled={loading}>
          {loading ? <Loader className='w-5 h-5 text-white animate-spin' /> : <Send className='w-5 h-5 text-white' />}
        </button>
      </div>
    </div>
  )
}

export default function ChatUI() {
  const [messages, setMessages] = useState([{ text: 'Hello! How can I assist you today?', sender: 'bot' }])

  return (
    <div className='flex h-screen w-full'>
      <Sidebar onSearch={() => {}} />
      <Mainbar messages={messages} setMessages={setMessages} />
    </div>
  )
}
