import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import HeroSpline from './HeroSpline'
import BioSidebar from './components/BioSidebar'
import BioCharts from './components/BioCharts'
import BioCards from './components/BioCards'

function App() {
  const [filters, setFilters] = useState({
    mutation: 42,
    branching: 4,
    crispr: true,
    nanobots: true,
    morph: true,
    energy: 68,
    seed: 1337,
  })

  useEffect(() => {
    if (!filters.morph) return
    const t = setInterval(() => {
      setFilters((f) => ({
        ...f,
        energy: (f.energy + 1) % 100,
        seed: (f.seed + 1) % 9999,
      }))
    }, 2200)
    return () => clearInterval(t)
  }, [filters.morph])

  const morphIntensity = useMemo(() => (filters.morph ? 1 : 0), [filters.morph])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070711] via-[#0b0b16] to-[#0a0f1f] text-white selection:bg-cyan-400 selection:text-black">
      <HeroSpline />

      <main className="mx-auto max-w-7xl px-6 sm:px-10 -mt-10">
        <div className="flex gap-6">
          <BioSidebar filters={filters} onChange={setFilters} />

          <div className="flex-1">
            <motion.div
              animate={{ filter: `hue-rotate(${(filters.seed % 360)}deg)` }}
              transition={{ duration: 1.2 }}
              className="space-y-6"
            >
              <BioCards />
              <BioCharts filters={filters} />

              {/* Bio-modular cards with translucent gel surfaces */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-cyan-200">CRISPR Editing Stream</h3>
                  <p className="mt-2 text-cyan-100/80 text-sm">Live edit visualization of sequence operations with iridescent feedback.</p>
                  <div className="mt-4 h-40 overflow-hidden rounded-2xl bg-black/20 p-2">
                    <div className="flex gap-2 text-[10px] font-mono">
                      {Array.from({ length: 120 }).map((_, i) => (
                        <span key={i} className={`px-1 rounded ${i % 7 === 0 ? 'bg-pink-500/20' : 'bg-cyan-500/10'}`}>{['A','T','C','G'][(i*filters.branching + (filters.seed%4))%4]}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-cyan-200">Nanobot Swarm Telemetry</h3>
                  <p className="mt-2 text-cyan-100/80 text-sm">Adaptive agents coordinate patterns like living data tissue.</p>
                  <div className="mt-4 h-40 relative">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/90 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"
                        style={{ left: `${(i*17)%100}%`, top: `${(i*9)%100}%` }}
                        animate={{ x: [0, (i%2?10:-10)], y: [0, (i%3?-8:8)], opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
                        transition={{ duration: 2 + (i%5)*0.3, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 sm:px-10 py-10 text-center text-xs text-white/60">
        Living Analytics Interface • Hybrid Bio-Mechanical Lab
      </footer>
    </div>
  )
}

export default App
