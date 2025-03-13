'use client' // Client component

import { useState } from 'react'

const Sidebar = ({ conversations, onSelectConversation }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`bg-gray-800 text-white w-64 p-4 space-y-2 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button onClick={() => setIsCollapsed(!isCollapsed)} className='text-gray-400 hover:text-white mb-4'>
        {isCollapsed ? '☰' : '✕'}
      </button>

      {!isCollapsed && (
        <>
          <h2 className='text-lg font-semibold mb-2'>Conversations</h2>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className='p-2 hover:bg-gray-700 cursor-pointer rounded'
            >
              {conversation.title}
            </div>
          ))}
        </>
      )}
    </aside>
  )
}

export default Sidebar
