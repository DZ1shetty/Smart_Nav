import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, Users, FlaskConical, GraduationCap, Map, ArrowUpRight, Building2, ChevronLeft } from 'lucide-react'
import SearchSystem from './SearchSystem'

const floors = [
  { id: 'basement', label: 'BASEMENT FLOOR' },
  { id: 'ground', label: 'GROUND FLOOR' },
  { id: 'first', label: 'FIRST FLOOR' },
  { id: 'second', label: 'SECOND FLOOR' },
  { id: 'third', label: 'THIRD FLOOR' },
  { id: 'fourth', label: 'FOURTH FLOOR' },
  { id: 'fifth', label: 'FIFTH FLOOR' },
]

export default function HomePage() {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-space overflow-x-hidden p-6 md:p-12 lg:p-20 selection:bg-blue-500/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]">
        <div className="absolute inset-0 blueprint-grid" />
      </div>
      
      {/* SCANLINE OVERLAY - Only visible in dark mode for tactical feel */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-0 dark:opacity-20" />

      {/* HEADER SECTION */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-orbitron font-black tracking-tighter leading-none"
          >
            SMART <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">NAVIGATION</span>
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <SearchSystem />
        </motion.div>
      </header>

      {/* MAIN NAVIGATION GRID */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {!selectedBuilding ? (
            <motion.div
              key="building-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center py-12"
            >
              <motion.button
                onClick={() => setSelectedBuilding('apj')}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-md overflow-hidden transition-all hover:border-blue-500/50 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
              >
                 <div className="flex flex-col md:flex-row items-center gap-6">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform duration-500">
                      <Building2 className="w-6 h-6 md:w-8 md:h-8" />
                   </div>
                   <div className="text-center md:text-left flex-1">
                      <h2 className="text-3xl md:text-4xl font-orbitron font-black tracking-tighter group-hover:text-blue-500 transition-colors">APJ-BLOCK</h2>
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                 </div>
                 
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan-slow pointer-events-none" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="floor-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-6 mb-12">
                 <button 
                   onClick={() => setSelectedBuilding(null)}
                   className="group p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/50 transition-all active:scale-90"
                 >
                   <ChevronLeft className="w-6 h-6 text-[var(--text-main)] group-hover:text-blue-500" />
                 </button>
                 <div>
                    <h3 className="text-2xl font-orbitron font-black tracking-tighter uppercase leading-none">APJ-BLOCK</h3>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {floors.map((floor, idx) => (
                  <motion.button
                    key={floor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => navigate(`/floor/${floor.id}`)}
                    className={`group relative overflow-hidden bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 text-center transition-all hover:bg-blue-500/[0.08] hover:border-blue-500/50 active:scale-[0.98] rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-base md:text-lg font-orbitron font-black tracking-widest text-black/40 dark:text-white/40 group-hover:text-blue-500 transition-colors duration-300">
                      {floor.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* QUICK NAVIGATION TIPS */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3 text-blue-500">
                    <Map className="w-4 h-4" />
                    <h4 className="text-[10px] font-orbitron font-black uppercase tracking-widest">Main Entrance</h4>
                  </div>
                  <p className="text-[11px] text-black/40 dark:text-white/30 leading-relaxed uppercase font-bold tracking-tight">
                    APJ Block main entrance is located on the ground floor. Use the central staircase or elevator for quick floor access.
                  </p>
                </div>

                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3 text-emerald-500">
                    <FlaskConical className="w-4 h-4" />
                    <h4 className="text-[10px] font-orbitron font-black uppercase tracking-widest">Lab Access</h4>
                  </div>
                  <p className="text-[11px] text-black/40 dark:text-white/30 leading-relaxed uppercase font-bold tracking-tight">
                    Most BTL labs are situated on the 3rd and 4th floors. Follow the 'BTL' signs from the elevator lobby.
                  </p>
                </div>

                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3 text-amber-500">
                    <Users className="w-4 h-4" />
                    <h4 className="text-[10px] font-orbitron font-black uppercase tracking-widest">Staff Rooms</h4>
                  </div>
                  <p className="text-[11px] text-black/40 dark:text-white/30 leading-relaxed uppercase font-bold tracking-tight">
                    Department staff rooms are distributed across all floors. Search by faculty name for precise office directions.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  )
}
