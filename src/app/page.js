import ChatUI from '@/components/ChatUI'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid min-h-screen'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <ChatUI />
      </main>
    </div>
  )
}
