'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  const [imageError, setImageError] = useState(false)

  // 마크다운 컴포넌트 스타일링
  const markdownComponents: Components = {
    // 제목들
    h1: ({ children, ...props }) => <h1 className="text-lg font-bold mb-2 text-gray-800" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="text-base font-bold mb-2 text-gray-800" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="text-sm font-bold mb-1 text-gray-800" {...props}>{children}</h3>,
    
    // 문단
    p: ({ children, ...props }) => <p className="mb-2 leading-relaxed" {...props}>{children}</p>,
    
    // 강조
    strong: ({ children, ...props }) => <strong className="font-bold text-pink-600" {...props}>{children}</strong>,
    em: ({ children, ...props }) => <em className="italic text-gray-700" {...props}>{children}</em>,
    
    // 목록
    ul: ({ children, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="text-sm" {...props}>{children}</li>,
    
    // 코드
    code: ({ children, className, ...props }) => {
      const isInline = !className || !className.includes('language-')
      return isInline ? (
        <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-800" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 overflow-x-auto" {...props}>
          {children}
        </code>
      )
    },
    
    // 인용문
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-pink-300 pl-3 italic text-gray-600 mb-2" {...props}>
        {children}
      </blockquote>
    ),
    
    // 링크
    a: ({ children, ...props }) => (
      <a className="text-pink-500 hover:text-pink-600 underline" target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
    
    // 구분선
    hr: ({ ...props }) => <hr className="my-3 border-gray-200" {...props} />,
  }

  // 사용자 메시지용 스타일
  const userMarkdownComponents: Components = {
    ...markdownComponents,
    // 사용자 메시지에서는 흰색 텍스트 사용
    p: ({ children, ...props }) => <p className="mb-2 leading-relaxed text-white" {...props}>{children}</p>,
    strong: ({ children, ...props }) => <strong className="font-bold text-white" {...props}>{children}</strong>,
    em: ({ children, ...props }) => <em className="italic text-white" {...props}>{children}</em>,
    h1: ({ children, ...props }) => <h1 className="text-lg font-bold mb-2 text-white" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 className="text-base font-bold mb-2 text-white" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 className="text-sm font-bold mb-1 text-white" {...props}>{children}</h3>,
    code: ({ children, className, ...props }) => {
      const isInline = !className || !className.includes('language-')
      return isInline ? (
        <code className="bg-white/20 px-1 py-0.5 rounded text-xs font-mono text-white" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-white/20 p-2 rounded text-xs font-mono text-white overflow-x-auto" {...props}>
          {children}
        </code>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-white/30 pl-3 italic text-white/90 mb-2" {...props}>
        {children}
      </blockquote>
    ),
    a: ({ children, ...props }) => (
      <a className="text-white underline hover:text-white/90" target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {isUser ? (
        /* 사용자 메시지 */
        <div className="flex items-end space-x-3 max-w-[80%]">
          <div className="pink-gradient rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
            <div className="text-white text-sm leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={userMarkdownComponents}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
          <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">👤</span>
          </div>
        </div>
      ) : (
        /* AI 메시지 */
        <div className="flex items-start space-x-3 max-w-[80%]">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0 w-8 h-8 pink-gradient rounded-full flex items-center justify-center shadow-sm">
            {!imageError ? (
              <Image
                src="/pinkbubble.png"
                alt="핑크버블"
                width={32}
                height={32}
                className="w-full h-full object-cover rounded-full"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-white text-sm">🌸</span>
            )}
          </div>
          
          {/* 메시지 내용 */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100">
              <div className="text-gray-800 text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {message}
                </ReactMarkdown>
              </div>
            </div>
            

          </div>
        </div>
      )}
    </motion.div>
  )
} 