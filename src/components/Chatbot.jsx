'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import CustomRenderer from './CustomRenderer'
import { Loader, Loader2, SendHorizonal } from 'lucide-react'
import { RiChat1Line } from "react-icons/ri"

const MessageSkeleton = () => (
  <div className="flex justify-start">
    <div className="mb-2 rounded-xl px-3 py-2 bg-gray-100 dark:bg-zinc-900 animate-pulse">
      <div className='text-sm flex items-center gap-1 mb-2'><Loader size={15} className='animate-spin'/>Thinking...</div>
      <div className=" w-64 rounded-lg">
        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-2"></div>
      </div>
    </div>
  </div>
)

const suggestedPrompts = [
  "Tell me a joke",
  "Hydration error in next js.",
  "What is LSTM in ML?",
  "Explain quantum physics",
  "Give me a recipe",
  "Tell me about space",
  "How to learn programming?",
  "Best travel destinations"
]

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSuggestedPrompt = async (prompt) => {
    setInput(prompt)
    const fakeEvent = { preventDefault: () => {} }
    await handleSubmit(fakeEvent, prompt)
  }

  const handleSubmit = async (e, suggestedPrompt = null) => {
    e.preventDefault()
    const messageToSend = suggestedPrompt || input
    if ((!messageToSend.trim() && !suggestedPrompt) || isLoading) return

    const userMessage = { id: Date.now(), text: messageToSend, sender: 'user' }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      })

      if (response.ok) {
        const data = await response.json()
        const botMessage = { id: Date.now(), text: data.reply, sender: 'bot' }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      } else {
        console.error('Chat request failed')
        const errorMessage = { id: Date.now(), text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }
        setMessages((prevMessages) => [...prevMessages, errorMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { id: Date.now(), text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full custom-glass rounded-xl font-inter max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <RiChat1Line /> Chatbot<span className='text-sm font-normal'>(llama-3.2-3B-Instruct)</span>
        </h2>
        <div ref={messagesContainerRef} className="h-[480px] overflow-y-auto mb-4 p-4 rounded-lg">
          {messages.length === 0 && (
            <div className="text-center text-4xl flex flex-col justify-center items-center h-full">
              <RiChat1Line className='w-20 h-20 mb-4' />
              <p>Welcome to the chatbot!</p>
              <p>Ask me anything...</p>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`${m.sender==="user"? 'flex justify-end': 'flex justify-start'}`}>
              <div className={`mb-2 rounded-xl px-3 ${
                m.sender === 'user' ? ' bg-slate-400 dark:bg-zinc-600 text-right' : 'bg-gray-100 dark:bg-zinc-900'
              }`}>
                <CustomRenderer content={m.text}/>
              </div>
            </div>
          ))}
          {isLoading && <MessageSkeleton />}
        </div>
      
        
  <div className='custom-glass rounded-xl dark:bg-zinc-900 px-5 py-2'>
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedPrompt(prompt)}
                disabled={isLoading}
                className="px-4 py-2 text-sm whitespace-nowrap rounded-full border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className=" flex space-x-2">
         
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button className="dark:bg-zinc-900 dark:text-white border" type="submit" disabled={isLoading}>
            {isLoading ? 
              <div className='flex items-center gap-2'><SendHorizonal/> Sending...</div> : 
              <div className='flex items-center gap-2'><SendHorizonal/> Send</div>
            }
          </Button>
        </form>
        </div>
      </CardContent>
    </div>
  )
}