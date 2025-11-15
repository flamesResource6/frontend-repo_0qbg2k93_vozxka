import React from 'react'
import { motion } from 'framer-motion'

export default function BioCards() {
  const cards = [
    { title: 'Tissue Flux', value: '1.28k', accent: 'from-cyan-400 to-emerald-400' },
    { title: 'Genome Throughput', value: '98.6%', accent: 'from-fuchsia-400 to-violet-500' },
    { title: 'Swarm Efficiency', value: '72%', accent: 'from-sky-400 to-cyan-400' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 * i, duration: 0.5 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
        >
          <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent} opacity-30 blur-2xl`} />
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(200px_200px_at_80%_20%,black,transparent)]">
            <svg className="absolute right-0 top-0 h-40 w-40 opacity-40" viewBox="0 0 100 100">
              {[...Array(12)].map((_, i) => (
                <circle key={i} cx={(i*7)%100} cy={(i*13)%100} r={0.6+(i%3)} fill="currentColor" />
              ))}
            </svg>
          </div>
          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-cyan-100/70">{c.title}</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-3xl font-extrabold text-white">{c.value}</p>
              <span className="text-xs text-cyan-200/80">live</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
