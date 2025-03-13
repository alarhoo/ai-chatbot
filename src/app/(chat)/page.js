'use client'

import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import ChatArea from '../../components/ChatArea'
import axios from 'axios'

export default function ChatPage() {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)

  const handleSendMessage = async (message) => {
    const response = await axios.post('/api/chat', { query: message })
    const newMessage = { text: message, sender: 'user' }
    const botMessage = { text: response.data.response, sender: 'bot' }

    setActiveConversation((prev) => ({
      ...prev,
      messages: [...(prev?.messages || []), newMessage, botMessage],
    }))
  }

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation)
  }

  return (
    <>
      <Sidebar conversations={conversations} onConversationClick={handleConversationClick} />
      <ChatArea messages={activeConversation?.messages || []} onSendMessage={handleSendMessage} />
    </>
  )
}
