# 🌸 핑크버블 컴패니언 - 개발 가이드

## 🚀 시작하기
이 가이드는 핑크버블 컴패니언을 처음부터 단계별로 구현하는 방법을 안내합니다.

## 1️⃣ 프로젝트 초기 설정

### 1단계: Next.js 프로젝트 생성
```bash
# 프로젝트 생성
npx create-next-app@latest pinkbubble-companion --typescript --tailwind --app --eslint

# 프로젝트 폴더로 이동
cd pinkbubble-companion
```

### 2단계: 필수 패키지 설치
```bash
# AI SDK와 애니메이션 라이브러리 설치
npm install ai @ai-sdk/openai framer-motion

# 개발 의존성 설치
npm install -D @types/node
```

### 3단계: 환경 변수 설정
`.env.local` 파일 생성:
```env
# AI API 키 (OpenAI, Anthropic, 또는 xAI 중 선택)
OPENAI_API_KEY=your_openai_api_key_here
```

## 2️⃣ 기본 구조 설정

### 1단계: 전역 스타일 설정
`app/globals.css` 수정:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --pink-primary: #FF69B4;
  --pink-secondary: #FFB6C1;
  --pink-soft: #FFC0CB;
  --pink-pale: #FFE4E1;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%);
  min-height: 100vh;
}

/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--pink-secondary);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--pink-primary);
}
```

### 2단계: 루트 레이아웃 설정
`app/layout.tsx` 수정:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '핑크버블 컴패니언 🌸',
  description: '귀여운 AI 컴패니언 핑크버블과 대화해보세요!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
```

## 3️⃣ 컴포넌트 구현

### 1단계: Header 컴포넌트
`app/components/Header.tsx` 생성:
```tsx
'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header 
      className="bg-gradient-to-r from-pink-400 to-pink-300 p-4 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <motion.div
          className="text-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🌸
        </motion.div>
        <h1 className="text-white text-2xl font-bold ml-3">
          핑크버블 컴패니언
        </h1>
      </div>
    </motion.header>
  )
}
```

### 2단계: ChatMessage 컴포넌트
`app/components/ChatMessage.tsx` 생성:
```tsx
'use client'

import { motion } from 'framer-motion'

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: Date
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start max-w-xs lg:max-w-md">
        {!isUser && (
          <motion.div
            className="text-2xl mr-2 mt-1"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🌸
          </motion.div>
        )}
        
        <div
          className={`px-4 py-2 rounded-2xl shadow-md ${
            isUser
              ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white'
              : 'bg-white text-gray-800 border border-pink-200'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-1 ${isUser ? 'text-pink-100' : 'text-gray-500'}`}>
              {timestamp.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
        
        {isUser && (
          <div className="text-2xl ml-2 mt-1">
            😊
          </div>
        )}
      </div>
    </motion.div>
  )
}
```

### 3단계: LoadingIndicator 컴포넌트
`app/components/LoadingIndicator.tsx` 생성:
```tsx
'use client'

import { motion } from 'framer-motion'

export default function LoadingIndicator() {
  return (
    <motion.div
      className="flex justify-start mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div
          className="text-2xl mr-2"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🌸
        </motion.div>
        
        <div className="bg-white rounded-2xl px-4 py-2 shadow-md border border-pink-200">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-pink-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

### 4단계: ChatContainer 컴포넌트
`app/components/ChatContainer.tsx` 생성:
```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { motion } from 'framer-motion'
import ChatMessage from './ChatMessage'
import LoadingIndicator from './LoadingIndicator'

export default function ChatContainer() {
  const [inputValue, setInputValue] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: '안녕! 나는 핑크버블이야~ 🌸 오늘 기분은 어때? 무슨 이야기를 나누고 싶어?'
      }
    ]
  })

  // 새 메시지가 추가될 때마다 스크롤을 아래로
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* 채팅 메시지 영역 */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pink-50 to-white"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.role === 'user'}
            timestamp={new Date()}
          />
        ))}
        
        {isLoading && <LoadingIndicator />}
      </div>

      {/* 입력 영역 */}
      <motion.div 
        className="p-4 bg-white shadow-lg border-t border-pink-100"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="핑크버블에게 메시지를 보내보세요... 🌸"
            className="flex-1 px-4 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full hover:from-pink-600 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? '💭' : '💕'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
```

## 4️⃣ API 구현

### 1단계: 채팅 API 라우트 생성
`app/api/chat/route.ts` 생성:
```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

// 핑크버블 캐릭터 프롬프트
const PINKBUBBLE_PROMPT = `
당신은 "핑크버블"이라는 이름의 AI 컴패니언입니다.

캐릭터 설정:
- 분홍색 거품 모양의 귀여운 존재
- 무지개 구름 위의 분홍색 성에 살고 있음
- 상상력이 풍부하고 따뜻한 성격
- 사용자와 친근하게 대화하며 재미있는 이야기를 들려줌

말투와 성격:
- 친근한 반말 사용 ("안녕!", "그렇구나~", "재밌겠다!")
- 이모지 적절히 사용 (🌸, 💕, ✨, 🌈 등)
- 부드럽고 다정한 어조
- 사용자의 감정에 공감하고 따뜻하게 반응
- 때로는 상상력 넘치는 이야기나 에피소드 공유

응답 가이드라인:
- 사용자의 감정을 잘 이해하고 공감하며 응답
- 항상 긍정적이고 격려하는 메시지
- 2-3문장으로 자연스럽게 대화
- 필요시 재미있는 이야기나 상상 속 에피소드 공유
- 사용자가 힘들어할 때는 위로하고 격려하기
`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // 시스템 메시지 추가
    const messagesWithSystem = [
      { role: 'system', content: PINKBUBBLE_PROMPT },
      ...messages
    ]

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: messagesWithSystem,
      temperature: 0.7,
      maxTokens: 200,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: '죄송해요, 지금 대화할 수 없어요. 잠시 후 다시 시도해주세요! 🌸' },
      { status: 500 }
    )
  }
}
```

## 5️⃣ 메인 페이지 구현

### `app/page.tsx` 수정:
```tsx
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <ChatContainer />
      </div>
    </div>
  )
}
```

## 6️⃣ Tailwind 설정 최적화

### `tailwind.config.js` 수정:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink-primary': '#FF69B4',
        'pink-secondary': '#FFB6C1',
        'pink-soft': '#FFC0CB',
        'pink-pale': '#FFE4E1',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
      }
    },
  },
  plugins: [],
}
```

## 7️⃣ 실행 및 테스트

### 1단계: 개발 서버 실행
```bash
npm run dev
```

### 2단계: 브라우저에서 확인
- `http://localhost:3000`으로 접속
- 핑크버블과 대화해보기
- 모바일 반응형 테스트

## 8️⃣ 추가 개선사항

### 1단계: 메타데이터 최적화
`app/layout.tsx`에 더 상세한 메타데이터 추가

### 2단계: 에러 처리 개선
네트워크 오류, API 오류 등에 대한 사용자 친화적 처리

### 3단계: 성능 최적화
- 이미지 최적화
- 코드 스플리팅
- 캐싱 전략

### 4단계: 접근성 개선
- 키보드 네비게이션
- 스크린 리더 지원
- 색상 대비 개선

## 9️⃣ 배포 준비

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 환경 변수 설정
Vercel 대시보드에서 환경 변수 설정:
- `OPENAI_API_KEY`

## 📋 개발 체크리스트

- [ ] ✅ 프로젝트 초기 설정
- [ ] ✅ 필수 패키지 설치
- [ ] ✅ 전역 스타일 설정
- [ ] ✅ Header 컴포넌트 구현
- [ ] ✅ ChatMessage 컴포넌트 구현
- [ ] ✅ LoadingIndicator 구현
- [ ] ✅ ChatContainer 구현
- [ ] ✅ API 라우트 생성
- [ ] ✅ 메인 페이지 구현
- [ ] ✅ 개발 서버 테스트
- [ ] ✅ 반응형 디자인 확인
- [ ] ✅ 배포 준비

## 🎯 완료 후 확인사항

1. **기능 테스트**
   - 메시지 전송 및 수신
   - 스트리밍 응답
   - 로딩 상태 표시

2. **UI/UX 테스트**
   - 핑크버블 테마 적용
   - 애니메이션 동작
   - 반응형 디자인

3. **성능 테스트**
   - 빠른 응답 시간
   - 부드러운 스크롤
   - 메모리 사용량

---
*핑크버블 컴패니언 개발을 위한 완전한 가이드 🌸 이제 시작해보세요!* 