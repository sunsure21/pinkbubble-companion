'use client'

import { motion } from 'framer-motion'

interface SuggestionButtonsProps {
  onSuggestionClick: (text: string) => void
  isLoading?: boolean
}

const suggestions = [
  { 
    text: "핑크버블의 탄생 이야기를 듣고 싶어!", 
    emoji: "🌸",
    color: "from-pink-400 to-pink-600"
  },
  { 
    text: "바다거북 오는 어떤 친구야?", 
    emoji: "🐢",
    color: "from-blue-400 to-blue-600"
  },
  { 
    text: "플라스틱을 다시 사용하는 방법을 알려줘!", 
    emoji: "♻️",
    color: "from-green-400 to-green-600"
  },
  { 
    text: "바다를 깨끗하게 지키는 모험을 떠나자!", 
    emoji: "🌊",
    color: "from-cyan-400 to-cyan-600"
  }
]

export default function SuggestionButtons({ onSuggestionClick, isLoading = false }: SuggestionButtonsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          핑크버블과 함께 시작해보세요
        </h2>
        <p className="text-sm text-gray-600">
          궁금한 것을 클릭하거나 직접 메시지를 보내보세요! 🌸
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            disabled={isLoading}
            className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-pink-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${suggestion.color} flex items-center justify-center shadow-sm`}>
                <span className="text-white text-lg">{suggestion.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {suggestion.text}
                </p>
              </div>
            </div>
            
            {/* 호버 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          위의 질문들을 클릭하거나 아래에 직접 메시지를 입력해 보세요!
        </p>
      </div>
    </div>
  )
} 