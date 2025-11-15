import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function HeroSpline() {
  return (
    <section className="relative h-[46vh] min-h-[360px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/D17NpA0ni2BTjUzp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Neon gradient overlay that doesn't block pointer events */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />

      {/* Heading overlay */}
      <div className="relative z-10 flex h-full items-end px-6 sm:px-10 pb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(124,58,237,0.35)]">
            Bio-Mechanical AI Analytics
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80">
            Data behaves like living digital tissue—growing, branching, and morphing in real time.
          </p>
        </motion.div>
      </div>

      {/* Subtle floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(18)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + '%'}
              cy={Math.random() * 100 + '%'}
              r={Math.random() * 2 + 0.5}
              fill="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -8, 0] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </svg>
      </div>
    </section>
  )
}
