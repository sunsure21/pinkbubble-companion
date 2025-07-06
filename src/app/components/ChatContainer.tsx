'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import LoadingIndicator from './LoadingIndicator'
import SuggestionButtons from './SuggestionButtons'

export default function ChatContainer() {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: '안녕! 나는 핑크버블이야! 분홍분홍하고 말랑말랑한 나를 만나서 반가워! 🌸\n\n있잖아, 나는 버려진 플라스틱에서 태어난 특별한 친구야. 바다거북 오와 함께 지구와 바다를 깨끗하게 지키는 모험을 하고 있어!\n\n오늘은 뭘 하고 놀까? 같이 모험을 떠날래? 우와! 🌊'
      }
    ]
  })

  // 새 메시지가 추가될 때마다 스크롤을 아래로
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // 메시지가 추가되면 추천 질문 숨기기
  useEffect(() => {
    if (messages.length > 1) {
      setShowSuggestions(false)
    }
  }, [messages])

  // 추천 질문 클릭 핸들러
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 pink-gradient rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🌸</span>
            </div>
            <h1 className="text-xl font-semibold pink-gradient-text">
              핑크버블
            </h1>
          </div>
        </div>
      </header>

      {/* 메인 채팅 영역 */}
      <main className="flex-1 overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="h-full overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto">
            {/* 환영 메시지 및 채팅 메시지 */}
            <div className="px-4 py-8 space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.role === 'user'}
                />
              ))}
              
              {/* 추천 질문 버튼 */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <SuggestionButtons 
                      onSuggestionClick={handleSuggestionClick}
                      isLoading={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 입력 영역 */}
      <footer className="flex-shrink-0 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* 로딩 인디케이터 - 입력창 위에 표시 */}
          {isLoading && (
            <div className="mb-4">
              <LoadingIndicator />
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 focus-within:border-pink-400 transition-colors">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="핑크버블에게 메시지를 보내보세요..."
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 resize-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 p-2 mr-2 pink-gradient text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed button-hover"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
          
          {/* 하단 안내 텍스트 */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              핑크버블은 실수를 할 수 있어요. 중요한 정보는 다시 한 번 확인해 주세요.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 