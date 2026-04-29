import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Building, Users, Info, ChevronLeft, ChevronRight, Edit3, Save } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function RoomModal({ room, onClose, onUpdateRoomData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDirections, setEditedDirections] = useState('')
  const [editedImage, setEditedImage] = useState('')

  const images = room?.images || (room?.image ? [room.image] : [])
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (room) {
      setEditedDirections(room.directions || '')
      setEditedImage(room.image || '')
      setIsEditing(false)
    }
  }, [room])

  if (!room) return null

  const handleSave = () => {
    if (onUpdateRoomData) {
      onUpdateRoomData({ directions: editedDirections, image: editedImage })
    }
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
          onMouseDown={onClose}
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
            onMouseDown={onClose}
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
                    className="w-full h-full object-contain"
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

              <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl relative group/directions overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-orbitron font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/20">
                    Room Details
                  </span>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 hover:border-blue-500 text-blue-500 hover:text-white rounded-lg transition-all duration-300 group"
                    >
                      <Edit3 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-orbitron font-black uppercase tracking-widest">Edit Details</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="p-1.5 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/10 dark:border-white/10 hover:border-red-500/50 text-black/40 dark:text-white/30 hover:text-red-500 rounded-lg transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[9px] font-orbitron font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        SAVE ALL
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[8px] font-orbitron font-black uppercase text-black/30 dark:text-white/20 block mb-2">ImgBB Link (Direct Image URL)</span>
                      <input
                        type="text"
                        value={editedImage}
                        onChange={(e) => setEditedImage(e.target.value)}
                        className="w-full bg-black/5 dark:bg-white/5 border-2 border-blue-500/20 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-black dark:text-white focus:outline-none transition-all shadow-inner"
                        placeholder="https://i.ibb.co/..."
                      />
                    </div>
                    <div>
                      <span className="text-[8px] font-orbitron font-black uppercase text-black/30 dark:text-white/20 block mb-2">Navigation Path</span>
                      <textarea
                        value={editedDirections}
                        onChange={(e) => setEditedDirections(e.target.value)}
                        className="w-full bg-black/5 dark:bg-white/5 border-2 border-blue-500/20 focus:border-blue-500 rounded-xl p-4 text-sm font-medium text-black dark:text-white focus:outline-none transition-all min-h-[100px] custom-scrollbar shadow-inner"
                        placeholder="Describe the path to this room..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <DirectionDisplay value={room.directions} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function DirectionDisplay({ value }) {
  if (!value || value === 'TBD') return <p className="text-sm font-medium text-black/40 dark:text-white/20">Not specified</p>;
  
  // Split primarily by newlines
  let items = value.split('\n').map(item => item.trim()).filter(item => item);
  
  // If still one block, try splitting by patterns but more carefully
  if (items.length === 1) {
    items = value.split(/(?=[a-z]\)\s|(?:\s|^)(?:[ivx]+\.\s|\d+\.\s|•\s))/i)
      .map(item => item.trim())
      .filter(item => item);
  }
  
  if (items.length > 1 || /^[ivx]+\.|^[a-z]\)|^\d+\.|^•/i.test(value.trim())) {
    return (
      <ul className="space-y-3 mt-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <span className="flex-1 text-[15px] font-black leading-snug text-black dark:text-white tracking-tight">
              {item.trim()}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  
  return (
    <p className="leading-relaxed text-[15px] font-black text-black dark:text-white">
      {value}
    </p>
  );
}

function InfoSection({ label, value }) {
  const renderValue = () => {
    if (!value || value === 'TBD') return 'Not specified';
    
    return (
      <p className="leading-relaxed text-sm font-bold text-black dark:text-white">
        {value}
      </p>
    );
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-orbitron font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/20">
        {label}
      </span>
      {renderValue()}
    </div>
  )
}
