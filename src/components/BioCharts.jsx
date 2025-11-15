import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function organicPath(seed = 1, branches = 3, points = 48) {
  const rand = mulberry32(seed)
  const paths = []
  for (let b = 0; b < branches; b++) {
    let d = ''
    let x = 20 + rand() * 20
    let y = 80 + rand() * 20
    d += `M ${x},${y}`
    for (let i = 0; i < points; i++) {
      const nx = x + (rand() - 0.3) * 10 + i * (120 / points)
      const ny = y - (rand() - 0.5) * 10 - Math.sin(i / 3 + b) * 3
      const cx1 = (x + nx) / 2 + (rand() - 0.5) * 6
      const cy1 = (y + ny) / 2 + (rand() - 0.5) * 6
      const cx2 = cx1 + (rand() - 0.5) * 6
      const cy2 = cy1 + (rand() - 0.5) * 6
      d += ` C ${cx1},${cy1} ${cx2},${cy2} ${nx},${ny}`
      x = nx; y = ny
      if (i % Math.max(6 - b, 3) === 0 && rand() > 0.6) {
        // side twig
        const sx = x + (rand() - 0.5) * 14
        const sy = y - (rand() - 0.5) * 14
        const scx = (x + sx) / 2 + (rand() - 0.5) * 5
        const scy = (y + sy) / 2 + (rand() - 0.5) * 5
        paths.push({ d: `M ${x},${y} C ${scx},${scy} ${scx},${scy} ${sx},${sy}`, w: 1 + rand() * 2 })
      }
    }
    paths.push({ d, w: 2 + rand() * 2 })
  }
  return paths
}

function dnaBars(seed = 1, count = 10) {
  const r = mulberry32(seed + 42)
  return new Array(count).fill(0).map((_, i) => ({
    h: 20 + r() * 70,
    tilt: (r() - 0.5) * 8,
    glow: r() * 0.6 + 0.3,
  }))
}

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

export default function BioCharts({ filters }) {
  const paths = useMemo(() => organicPath(filters.seed, filters.branching, 56), [filters.seed, filters.branching])
  const bars = useMemo(() => dnaBars(filters.seed, 14), [filters.seed])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Neural network line chart */}
      <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {/* CRISPR edit markers */}
          {filters.crispr && (
            <svg className="absolute inset-0 w-full h-full">
              {paths.slice(0, 4).map((p, idx) => (
                <circle key={idx} cx={(idx + 1) * 80} cy={80 + (idx % 2) * 20} r="4" className="mix-blend-screen">
                  <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite"/>
                </circle>
              ))}
            </svg>
          )}
        </div>
        <svg viewBox="0 0 320 160" className="w-full h-64">
          <defs>
            <linearGradient id="neon" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee"/>
              <stop offset="40%" stopColor="#a78bfa"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {paths.map((p, i) => (
            <motion.path
              key={i}
              d={p.d}
              stroke="url(#neon)"
              strokeWidth={p.w}
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6 + i * 0.04, ease: 'easeOut' }}
            />
          ))}
        </svg>
        {filters.nanobots && (
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div key={i} className="absolute h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.65)]" style={{ left: `${(i * 11) % 100}%`, top: `${(i * 7) % 100}%` }} animate={{ x: [0, (i % 2 ? 10 : -10)], y: [0, (i % 2 ? -8 : 8)] }} transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity, repeatType: 'reverse' }} />
            ))}
          </motion.div>
        )}
      </div>

      {/* DNA rod bars */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        <svg viewBox="0 0 160 160" className="w-full h-64">
          <defs>
            <linearGradient id="rod" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9"/>
              <stop offset="60%" stopColor="#a78bfa"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          {bars.map((b, i) => (
            <g key={i} transform={`translate(${10 + i * 10}, ${80 - b.h / 2}) rotate(${b.tilt})`}>
              <motion.rect
                x="0"
                y="0"
                width="6"
                height={b.h}
                rx="3"
                fill="url(#rod)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                style={{ filter: `drop-shadow(0 0 ${8 * b.glow}px rgba(167,139,250,0.6))` }}
              />
              <motion.circle cx="3" cy={b.h / 2} r="1.6" fill="#fff" animate={{ r: [1.2, 2.2, 1.2] }} transition={{ duration: 2.2, delay: i * 0.03, repeat: Infinity }} />
            </g>
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_60%)]" />
      </div>
    </div>
  )
}
