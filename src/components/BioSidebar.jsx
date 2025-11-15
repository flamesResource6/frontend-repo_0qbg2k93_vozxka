import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Activity, Zap, Sparkles } from 'lucide-react'

export default function BioSidebar({ filters, onChange }) {
  const [open, setOpen] = useState(true)

  const toggle = () => setOpen((o) => !o)

  const update = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <aside className="relative">
      <button
        onClick={toggle}
        className="group absolute -right-3 top-6 z-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 p-2 shadow-lg hover:shadow-cyan-400/30"
      >
        <SlidersHorizontal className="h-4 w-4 text-white" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -16, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-72 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-300" />
              <h3 className="text-sm font-semibold tracking-wide text-cyan-200">Bio-panel Controls</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="flex items-center justify-between text-xs text-cyan-100/80">
                  Mutation Rate
                  <span className="font-mono text-cyan-300">{filters.mutation}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.mutation}
                  onChange={(e) => update('mutation', +e.target.value)}
                  className="w-full accent-cyan-400"
                />
                <div className="mt-1 h-1 w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 animate-pulse" />
              </div>

              <div>
                <label className="flex items-center justify-between text-xs text-cyan-100/80">
                  Neural Branching
                  <span className="font-mono text-cyan-300">{filters.branching}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={filters.branching}
                  onChange={(e) => update('branching', +e.target.value)}
                  className="w-full accent-purple-400"
                />
                <div className="mt-1 flex gap-1">
                  {[...Array(filters.branching)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 rounded-full bg-purple-400/60" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-100/80">CRISPR Edits</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.crispr}
                    onChange={(e) => update('crispr', e.target.checked)}
                  />
                  <div className="h-6 w-11 rounded-full bg-white/10 backdrop-blur peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-cyan-400 transition-all">
                    <div className="ml-[2px] mt-[2px] h-5 w-5 rounded-full bg-white/70 peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-100/80">Nanobot Swarm</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.nanobots}
                    onChange={(e) => update('nanobots', e.target.checked)}
                  />
                  <div className="h-6 w-11 rounded-full bg-white/10 backdrop-blur peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-cyan-400 transition-all">
                    <div className="ml-[2px] mt-[2px] h-5 w-5 rounded-full bg-white/70 peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-100/80">Auto Morph</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={filters.morph}
                    onChange={(e) => update('morph', e.target.checked)}
                  />
                  <div className="h-6 w-11 rounded-full bg-white/10 backdrop-blur peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-cyan-400 transition-all">
                    <div className="ml-[2px] mt-[2px] h-5 w-5 rounded-full bg-white/70 peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2 text-xs text-cyan-100/80">
                  <Zap className="h-3.5 w-3.5 text-yellow-300" />
                  Energy Budget
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${filters.energy}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="mt-1 text-right font-mono text-xs text-cyan-200/80">{filters.energy}%</div>
              </div>

              <button
                onClick={() => update('seed', Math.floor(Math.random() * 9999))}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-cyan-400/30"
              >
                <Sparkles className="h-4 w-4" />
                Shuffle DNA Seed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
