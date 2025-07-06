'use client'

import { motion } from 'framer-motion'

export default function LoadingIndicator() {
  return (
    <div className="flex items-start space-x-3 max-w-[80%]">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0 w-8 h-8 pink-gradient rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white text-sm">🌸</span>
      </div>
      
      {/* 로딩 메시지 */}
      <div className="flex-1">
        <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">핑크버블이 생각 중</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-pink-400 rounded-full"
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
      </div>
    </div>
  )
} 