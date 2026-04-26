import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, Plus, Minus, Maximize, Edit3, Save, Undo2, Redo2, XCircle, Users, RotateCcw } from 'lucide-react'
import { floorsData } from '../data/floorsData'
import { useFloorHistory } from '../hooks/useFloorHistory'
import FloorMapSVG from './FloorMapSVG'
import RoomModal from './RoomModal'
import FacultyProfileModal from './FacultyProfileModal'
import FacultyDirectoryModal from './FacultyDirectoryModal'
import SearchSystem from './SearchSystem'

export default function FloorPlan() {
  const { floorId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isFloorMenuOpen, setIsFloorMenuOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false)
  const [selectedFacultyProfile, setSelectedFacultyProfile] = useState(null)
  const [highlightedRoomId, setHighlightedRoomId] = useState(null)

  // Floor Data Initialization Helper
  const getInitialData = useCallback(() => {
    const baseData = floorsData[floorId] || floorsData.floor5
    const CURRENT_VERSION = '1.0'
    const saved = localStorage.getItem(`floor_data_${floorId}`)
    
    if (saved) {
      try {
        const payload = JSON.parse(saved)
        // If it's a versioned save, use the data property. Otherwise (legacy), use it directly.
        const savedData = payload.version === CURRENT_VERSION ? payload.data : null
        
        if (!savedData) return baseData

        return {
          ...baseData,
          mainWidth: savedData.mainWidth || baseData.mainWidth,
          bulgeWidth: savedData.bulgeWidth || baseData.bulgeWidth,
          bulgeHeight: savedData.bulgeHeight || baseData.bulgeHeight,
          viewWidth: savedData.viewWidth || baseData.viewWidth,
          viewHeight: savedData.viewHeight || baseData.viewHeight,
          rooms: baseData.rooms.map(baseRoom => {
            const savedRoom = savedData.rooms?.find(r => r.id === baseRoom.id)
            if (savedRoom) {
              return { ...baseRoom, x: savedRoom.x, y: savedRoom.y }
            }
            return baseRoom
          })
        }
      } catch (e) {
        console.error("Failed to parse saved floor data", e)
      }
    }
    return baseData
  }, [floorId])

  const {
    localFloorData,
    historyIndex,
    historyLength,
    handleUndo,
    handleRedo,
    handleSaveLayout,
    handleRoomMove,
    handleBoundaryChange
  } = useFloorHistory(floorId, getInitialData)

  const floorData = localFloorData

  // Architect Mode Toggle
  const toggleEditMode = () => setIsEditMode(!isEditMode)

  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved'

  const onSave = () => {
    setSaveStatus('saving');
    // Actual save to localStorage happens inside handleSaveLayout
    handleSaveLayout();
    
    // Artificial delay for "Powerful" feedback
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setIsEditMode(false);
      }, 1500);
    }, 800);
  }

  // Navigation State
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const constraintsRef = useRef(null)
  
  // Aggregate all faculty sources (STRICTLY CURRENT FLOOR)
  const allFaculty = useMemo(() => {
    if (!floorData) return []
    
    // 1. From rooms that have 'faculty' field
    const roomFaculty = (floorData.rooms || [])
      .filter(room => room.faculty && room.faculty !== 'N/A' && room.faculty !== '')
      .map(room => ({
        id: room.id,
        name: room.faculty,
        image: room.image,
        roomName: room.name,
        department: room.department,
        originalRoom: room,
        floorKey: floorId
      }))
    
    // 2. From the explicit 'faculty' array (the gallery images)
    const listFaculty = (floorData.faculty || []).map((f, idx) => {
      const room = floorData.rooms.find(r => r.id === f.roomId)
      return {
        id: `list-${idx}-${f.name}`,
        name: f.name,
        image: f.image,
        roomName: room?.name || 'Staff Area',
        department: f.department || room?.department,
        originalRoom: room,
        floorKey: floorId
      }
    })
    
    return [...roomFaculty, ...listFaculty]
  }, [floorData, floorId])
  
  // Global Faculty Lookup Helper (to fix search glitches across floors)
  const findFacultyGlobally = (name) => {
    for (const [fKey, fData] of Object.entries(floorsData)) {
      // Check rooms
      const roomMatch = fData.rooms?.find(r => r.faculty === name)
      if (roomMatch) return {
        id: roomMatch.id,
        name: roomMatch.faculty,
        image: roomMatch.image,
        roomName: roomMatch.name,
        department: roomMatch.department,
        originalRoom: roomMatch,
        floorKey: fKey
      }
      
      // Check explicit list
      const listMatch = fData.faculty?.find(f => f.name === name)
      if (listMatch) {
        const room = fData.rooms?.find(r => r.id === listMatch.roomId)
        return {
          id: `list-${name}`,
          name: listMatch.name,
          image: listMatch.image,
          roomName: room?.name || 'Staff Area',
          department: listMatch.department || room?.department,
          originalRoom: room,
          floorKey: fKey
        }
      }
    }
    return null
  }
  
  const [activeFilters, setActiveFilters] = useState([])

  const toggleFilter = (type) => {
    setActiveFilters(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  // Close handlers that also clear URL params to allow re-searching same item
  const handleCloseRoom = () => {
    setSelectedRoom(null)
    setHighlightedRoomId(null)
    setActiveSearchIds(null)
    navigate(location.pathname, { replace: true })
  }

  const handleCloseFaculty = () => {
    setSelectedFacultyProfile(null)
    setHighlightedRoomId(null) // Clear highlight so the room stops glowing after closing modal
    setActiveSearchIds(null)
    navigate(location.pathname, { replace: true })
  }

  // Handle auto-opening room from search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const roomId = searchParams.get('room')
    const facultyName = searchParams.get('faculty')

    if (roomId && floorData) {
      const room = floorData.rooms.find(r => r.id === roomId)
      if (room) {
        setHighlightedRoomId(room.id)
        // Only open RoomModal if NOT searching for a faculty member
        if (!facultyName) {
          setSelectedRoom(room)
        }
        
        if (room.type && activeFilters.length > 0 && !activeFilters.includes(room.type)) {
          setActiveFilters(prev => [...prev, room.type])
        }
      }
    }

    if (facultyName) {
      // 1. Try current floor first
      let faculty = allFaculty.find(f => f.name === facultyName)
      
      // 2. If not found (glitch protection), lookup globally
      if (!faculty) {
        faculty = findFacultyGlobally(facultyName)
      }

      if (faculty) {
        setSelectedFacultyProfile(faculty)
      }
    }
  }, [location.search, floorData, allFaculty, activeFilters])

  const handleZoom = (delta) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 1), 3))
  }

  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const floors = [
    { id: 'basement', label: 'Basement' },
    { id: 'floor1', label: '1st Floor' },
    { id: 'floor2', label: '2nd Floor' },
    { id: 'floor3', label: '3rd Floor' },
    { id: 'floor4', label: '4th Floor' },
    { id: 'floor5', label: '5th Floor' },
  ]

  const [activeSearchIds, setActiveSearchIds] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center overflow-hidden select-none"
    >
      {/* Background accents */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />

      {/* Clean Dashboard Header */}
      <header className="w-full z-40 bg-[var(--bg-main)]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-3 px-6 md:px-12 flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/10 border border-black/10 dark:border-white/10 rounded-xl transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-black/40 dark:text-white/30 group-hover:text-blue-500 transition-colors" />
          </button>

          <div className="flex flex-col">
            <nav className="flex items-center gap-2 text-[9px] font-orbitron font-black uppercase tracking-[0.2em] text-black/30 dark:text-white/20">
              <Link to="/" className="hover:text-blue-500 transition-colors">HOME</Link>
              <span>/</span>
              <span>{floorData?.buildingName || 'APJ-BLOCK'}</span>
              <span>/</span>
              <span className="text-blue-500">{floorData?.label}</span>
            </nav>

            <div className="relative mt-1">
              <button
                onClick={() => setIsFloorMenuOpen(!isFloorMenuOpen)}
                className="flex items-center gap-2 text-xl font-orbitron font-black uppercase tracking-tighter hover:text-blue-500 transition-colors"
              >
                <span>{floorData?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${isFloorMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFloorMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                  >
                    <div className="p-2 grid grid-cols-1 gap-1">
                      {floors.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            navigate(`/floor/${f.id}`)
                            setIsFloorMenuOpen(false)
                            resetView()
                          }}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-[10px] font-orbitron font-black uppercase tracking-widest ${f.id === floorId ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/30 hover:text-blue-500'}`}
                        >
                          {f.label}
                          {f.id === floorId && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Integrated Search & Utility Dock */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="max-w-[500px] w-full relative group">
            <div className="absolute -inset-4 bg-blue-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <SearchSystem currentFloor={floorId} />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 min-w-[300px] justify-end">
          <div className="flex items-center gap-3">
             <AnimatePresence>
               {isEditMode ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/30 p-1 rounded-xl"
                 >
                   <div className="flex items-center border-r border-black/10 dark:border-white/10 mr-1 pr-1">
                      <button
                        onClick={handleUndo}
                        disabled={historyIndex === 0}
                        className="p-2 hover:bg-blue-500/20 text-black/40 dark:text-white/30 hover:text-blue-500 disabled:opacity-20 rounded-lg transition-all"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={historyIndex === historyLength - 1}
                        className="p-2 hover:bg-blue-500/20 text-black/40 dark:text-white/30 hover:text-blue-500 disabled:opacity-20 rounded-lg transition-all"
                      >
                        <Redo2 className="w-3.5 h-3.5" />
                      </button>
                   </div>

                   <button
                     onClick={onSave}
                     disabled={saveStatus !== 'idle'}
                     className={`px-4 py-2 rounded-lg transition-all font-orbitron font-black text-[9px] uppercase tracking-widest flex items-center gap-2 ${
                       saveStatus === 'saved' ? 'bg-emerald-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                     }`}
                   >
                     {saveStatus === 'saving' ? (
                       <>
                         <div className="w-2 h-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         WRITING DATA...
                       </>
                     ) : saveStatus === 'saved' ? (
                       'LOCKED & PERSISTED'
                     ) : (
                       'SAVE LAYOUT'
                     )}
                   </button>
                   <button
                       onClick={() => setIsEditMode(false)}
                       className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/30 hover:text-red-500 rounded-lg transition-all"
                     >
                       <XCircle className="w-3.5 h-3.5" />
                     </button>
                   </motion.div>
                 ) : (
                   <div className="flex items-center gap-3">
                     <button
                       onClick={() => setIsFacultyModalOpen(true)}
                       className="p-2.5 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/10 border border-black/10 dark:border-white/10 rounded-xl transition-all group flex items-center gap-2"
                     >
                       <Users className="w-4 h-4 text-blue-500" />
                       <span className="hidden lg:inline text-[9px] font-orbitron font-black uppercase tracking-widest text-black/40 dark:text-white/30 group-hover:text-blue-500">FACULTY</span>
                     </button>

                     <div className="flex items-center bg-black/[0.03] dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 p-1">
                       <button
                         onClick={() => handleZoom(0.25)}
                         disabled={zoom >= 3}
                         className="p-2 hover:bg-blue-500/10 text-black/40 dark:text-white/30 hover:text-blue-500 rounded-lg transition-all disabled:opacity-10"
                       >
                         <Plus className="w-3.5 h-3.5" />
                       </button>
                       <div className="px-2 text-[9px] font-orbitron font-black text-blue-500 min-w-[40px] text-center">{Math.round(zoom * 100)}%</div>
                       <button
                         onClick={() => handleZoom(-0.25)}
                         disabled={zoom <= 1}
                         className="p-2 hover:bg-blue-500/10 text-black/40 dark:text-white/30 hover:text-blue-500 rounded-lg transition-all disabled:opacity-10"
                       >
                         <Minus className="w-3.5 h-3.5" />
                       </button>
                     </div>

                     <button
                       onClick={resetView}
                       className="p-2.5 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/10 border border-black/10 dark:border-white/10 rounded-xl transition-all text-black/40 dark:text-white/30 hover:text-blue-500"
                     >
                       <Maximize className="w-3.5 h-3.5" />
                     </button>
                     
                     <button
                       onClick={() => setIsEditMode(true)}
                       className="p-2.5 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/10 border border-black/10 dark:border-white/10 rounded-xl transition-all text-black/40 dark:text-white/30 hover:text-blue-500"
                     >
                       <Edit3 className="w-3.5 h-3.5" />
                     </button>
                   </div>
                 )}
               </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="relative flex-1 w-full flex items-center justify-center p-4 md:p-8 overflow-hidden" ref={constraintsRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={floorId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={selectedRoom ? {
              scale: 0.8,
              x: -280,
              y: 0,
              opacity: 1
            } : {
              scale: zoom,
              x: 0,
              y: 0,
              opacity: 1
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            drag={!selectedRoom}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            style={{
              aspectRatio: floorData?.viewWidth && floorData?.viewHeight ? `${floorData.viewWidth}/${floorData.viewHeight}` : '640/663',
              willChange: 'transform, opacity'
            }}
            className="relative w-full max-w-[1000px] max-h-[85vh] bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <FloorMapSVG 
              floorData={floorData}
              isEditMode={isEditMode}
              selectedRoomId={selectedRoom?.id}
              highlightedRoomId={highlightedRoomId}
              activeSearchIds={activeSearchIds}
              activeFilters={activeFilters}
              onRoomMove={handleRoomMove}
              onRoomClick={(room) => {
                if (room.clickable === false) return;
                if (room.type === 'staffroom') {
                  setIsFacultyModalOpen(true);
                } else {
                  setSelectedRoom(room);
                }
              }}
              onBoundaryChange={handleBoundaryChange}
            />
        </motion.div>
      </AnimatePresence>

      {/* Minimal Filter Dock */}
      <div className={`absolute top-1/2 -translate-y-1/2 left-8 flex flex-col gap-4 z-30 transition-all duration-500 ${selectedRoom ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 p-2 rounded-2xl shadow-xl flex flex-col gap-1">
          {[
            { id: 'classroom', label: 'CLASSROOMS', color: 'bg-blue-500' },
            { id: 'lab', label: 'LABS', color: 'bg-emerald-500' },
            { id: 'staffroom', label: 'STAFF', color: 'bg-amber-400' },
            { id: 'hod', label: 'HOD', color: 'bg-orange-500' },
            { id: 'utility', label: 'UTILS', color: 'bg-slate-400' },
          ].map((item) => {
            const isActive = activeFilters.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleFilter(item.id)}
                className={`group relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/30 dark:text-white/20'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? item.color : 'bg-current opacity-20'}`} />
                <span className="text-[9px] font-orbitron font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </button>
            )
          })}
          
          <div className="h-px bg-black/5 dark:bg-white/5 my-1 mx-2" />
          
          <button
            onClick={() => setActiveFilters([])}
            disabled={activeFilters.length === 0}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${activeFilters.length > 0 ? 'text-blue-500 hover:bg-blue-500/10 cursor-pointer' : 'text-black/10 dark:text-white/10 cursor-default'}`}
            title="Reset Filters"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${activeFilters.length > 0 ? 'animate-pulse' : ''}`} />
            <span className="text-[9px] font-orbitron font-black uppercase tracking-widest">RESET</span>
          </button>
        </div>
      </div>

      {/* Mobile Floating Utility Bar */}
      <div className="md:hidden fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 bg-white/90 dark:bg-[#0d0d0d]/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-2 rounded-2xl shadow-2xl">
        <button
          onClick={() => setIsFacultyModalOpen(true)}
          className="p-3 bg-blue-500/10 rounded-xl text-blue-500"
        >
          <Users className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
        <div className="flex-1 min-w-[140px]">
          <SearchSystem currentFloor={floorId} />
        </div>
      </div>
    </main>

    <FacultyDirectoryModal
      isOpen={isFacultyModalOpen}
      onClose={() => setIsFacultyModalOpen(false)}
      floorData={floorData}
      onSelectFaculty={(faculty) => {
        setSelectedFacultyProfile(faculty)
        setIsFacultyModalOpen(false)
        if (faculty.originalRoom) {
          setHighlightedRoomId(faculty.originalRoom.id)
        }
      }}
    />

    <RoomModal room={selectedRoom} onClose={handleCloseRoom} />
    <FacultyProfileModal faculty={selectedFacultyProfile} onClose={handleCloseFaculty} />
  </motion.div>
  )
}
