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