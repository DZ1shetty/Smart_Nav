import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Navigation, Building2 } from 'lucide-react'
import { useEffect } from 'react'

export default function FacultyProfileModal({ faculty, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!faculty) return null

  // Get directions from the associated room if available
  const directions = faculty.originalRoom?.directions || "Located in the department staff room."

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-3xl"
          onClick={onClose}
        />

        {/* Cinematic Backdrop Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all group z-50 border border-black/5 dark:border-white/5"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-black/30 dark:text-white/20 group-hover:text-blue-500 transition-colors" />
          </button>

          {/* Left Side: Portrait Area */}
          <div className="relative w-full md:w-[40%] p-8 flex flex-col items-center justify-center bg-black/[0.02] dark:bg-white/[0.02] border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 p-1 bg-white dark:bg-black shadow-xl">
              <div className="w-full h-full rounded-xl overflow-hidden bg-black/[0.05] dark:bg-white/[0.05]">
                {faculty.image ? (
                  <img 
                    src={faculty.image} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover object-[45%_10%] scale-[1.65] brightness-95" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-black/10 dark:text-white/5" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Information Area */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-orbitron font-black uppercase tracking-tighter text-black dark:text-white leading-tight mb-2">
                {faculty.name}
              </h2>
              <div className="flex items-center gap-2 text-blue-500">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-orbitron font-black uppercase tracking-widest">
                  {faculty.floorKey?.replace('floor', 'LEVEL ')} • {faculty.roomName}
                </span>
              </div>
            </div>

            <div className="p-6 bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-3 h-3 text-blue-500" />
                <span className="text-[9px] font-orbitron font-black uppercase tracking-widest text-black/40 dark:text-white/20">Location Details</span>
              </div>
              <p className="text-[11px] font-orbitron font-bold text-black/60 dark:text-white/60 leading-relaxed uppercase tracking-wider">
                {directions}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-3 bg-black/[0.05] dark:bg-white/5 hover:bg-blue-500/10 hover:text-blue-500 border border-black/10 dark:border-white/10 rounded-xl transition-all text-[10px] font-orbitron font-black uppercase tracking-widest text-black/30 dark:text-white/20"
            >
              Close Record
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
