import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Building, Users, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function RoomModal({ room, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = room?.images || (room?.image ? [room.image] : [])
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!room) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch max-h-[85vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all group z-[60] border border-black/5 dark:border-white/5 backdrop-blur-md"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-black/40 dark:text-white/20 group-hover:text-blue-500 transition-colors" />
          </button>

          {/* Left Side: Image Carousel */}
          <div className="relative w-full md:w-[50%] bg-black/[0.03] dark:bg-white/[0.02] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 overflow-hidden">
             {images.length > 0 ? (
                <div className="relative w-full h-full group">
                  <motion.img 
                    key={images[currentImageIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={images[currentImageIndex]} 
                    alt={room.name} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  
                  {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)) }}
                        className="p-2 bg-black/50 hover:bg-blue-500/80 rounded-lg border border-white/10 text-white transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)) }}
                        className="p-2 bg-black/50 hover:bg-blue-500/80 rounded-lg border border-white/10 text-white transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-black/5 dark:text-white/5">
                  <Building className="w-12 h-12 mb-3" />
                  <span className="text-[10px] font-orbitron font-black uppercase tracking-widest">No Visual Data</span>
                </div>
              )}
          </div>

          {/* Right Side: Information */}
          <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="mb-8">
              <h2 className="text-3xl font-orbitron font-black uppercase tracking-tighter text-black dark:text-white mb-2">
                {room.name}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-[10px] font-orbitron font-black uppercase tracking-[0.2em]">{room.type}</span>
                <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                <span className="text-black/40 dark:text-white/30 text-[10px] font-orbitron font-bold uppercase tracking-widest">{room.id}</span>
              </div>
            </div>

            <div className="space-y-8 flex-1">
              <InfoSection label="Description" value={room.description} />
              
              <div className="grid grid-cols-2 gap-8">
                {room.faculty && <InfoSection label="Personnel" value={room.faculty} />}
                {room.department && <InfoSection label="Affiliation" value={room.department} />}
              </div>

              <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl">
                <InfoSection label="Directions" value={room.directions} />
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/[0.1] hover:border-blue-500/50 border border-black/10 dark:border-white/10 rounded-xl transition-all text-[11px] font-orbitron font-black uppercase tracking-[0.3em] text-black/40 dark:text-white/30 hover:text-blue-500"
              >
                Close Module
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function InfoSection({ label, value }) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-orbitron font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/20">
        {label}
      </span>
      <p className="text-sm font-medium leading-relaxed text-black/70 dark:text-white/70">
        {value || 'Not specified'}
      </p>
    </div>
  )
}
