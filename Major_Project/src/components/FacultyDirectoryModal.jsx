import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Search, MapPin, Building2, User } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function FacultyDirectoryModal({ 
  isOpen, 
  onClose, 
  floorData, 
  onSelectFaculty 
}) {
  const [searchTerm, setSearchTerm] = useState('')

  const floorFaculty = useMemo(() => {
    if (!floorData) return []
    
    // 1. From rooms
    const roomFaculty = (floorData.rooms || [])
      .filter(room => room.faculty && room.faculty !== 'N/A' && room.faculty !== '')
      .map(room => ({
        id: room.id,
        name: room.faculty,
        image: room.image,
        roomName: room.name,
        department: room.department,
        originalRoom: room,
        floorLabel: floorData.label
      }))
    
    // 2. From explicit faculty list
    const listFaculty = (floorData.faculty || []).map((f, idx) => {
      const room = floorData.rooms.find(r => r.id === f.roomId)
      return {
        id: `list-${idx}-${f.name}`,
        name: f.name,
        image: f.image,
        roomName: room?.name || 'Staff Area',
        department: f.department || room?.department || 'Department',
        originalRoom: room,
        floorLabel: floorData.label
      }
    })
    
    // Merge and filter by search
    const all = [...roomFaculty, ...listFaculty]
    if (!searchTerm) return all
    
    return all.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [floorData, searchTerm])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all group z-[60] border border-black/5 dark:border-white/5 backdrop-blur-md"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-black/30 dark:text-white/20 group-hover:text-blue-500 transition-colors" />
            </button>

            {/* Header */}
            <div className="p-8 pb-4 border-b border-black/5 dark:border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-orbitron font-black uppercase tracking-tighter text-black dark:text-white">
                      FACULTY <span className="text-blue-500">DIRECTORY</span>
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-orbitron font-black text-blue-500 uppercase tracking-widest">{floorData?.label || 'APJ-BLOCK'}</span>
                      <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                      <span className="text-[10px] font-orbitron font-bold text-black/30 dark:text-white/20 uppercase tracking-widest">{floorFaculty.length} PERSONNEL</span>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="relative group max-w-[280px] w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 dark:text-white/10 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder="SEARCH DIRECTORY..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-[11px] font-orbitron font-bold text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {floorFaculty.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {floorFaculty.map((item, idx) => (
                    <motion.div
                      key={item.id || idx}
                      onClick={() => onSelectFaculty(item)}
                      className="group relative bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer active:scale-[0.98]"
                    >
                      <div className="aspect-[4/5] relative overflow-hidden bg-black/[0.05] dark:bg-white/[0.05]">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain brightness-[0.9] dark:brightness-[0.8] group-hover:brightness-105 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8 text-black/10 dark:text-white/5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 via-transparent to-transparent" />
                      </div>

                      <div className="p-3 text-center">
                        <h3 className="text-[10px] font-orbitron font-black text-black/80 dark:text-white/80 uppercase tracking-tight truncate group-hover:text-blue-500 transition-colors">
                          {item.name}
                        </h3>
                        <div className="mt-1 flex items-center justify-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                          <MapPin className="w-2.5 h-2.5 text-blue-500" />
                          <span className="text-[8px] font-orbitron font-bold uppercase tracking-widest truncate">{item.roomName}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-20">
                  <User className="w-12 h-12 mb-4" />
                  <h3 className="font-orbitron font-black uppercase tracking-[0.3em] text-xs">No Records Found</h3>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 px-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                 <span className="text-[9px] font-orbitron font-black text-black/20 dark:text-white/10 uppercase tracking-widest">Database Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
