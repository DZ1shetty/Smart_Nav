import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, Plus, Minus, Maximize, Edit3, Save, Undo2, Redo2, XCircle, Users, RotateCcw } from 'lucide-react'
import { floorsData } from '../data/floorsData'
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
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false)
  const [selectedFacultyProfile, setSelectedFacultyProfile] = useState(null)
  const [highlightedRoomId, setHighlightedRoomId] = useState(null)
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved'

  const [rooms, setRooms] = useState([]);
  const [faculty, setFaculty] = useState([]); // Dynamic faculty list
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [mapImage, setMapImage] = useState(null);

  // ABSOLUTE SOURCE OF TRUTH: API -> Physical File
  useEffect(() => {
    async function loadLayout() {
      try {
        const res = await fetch(`/api/layout/${floorId}`);
        const data = await res.json();

          if (data.rooms && data.rooms.length > 0) {
            setRooms(data.rooms);           // file is source of truth
            setFaculty(data.faculty || []);  // persistent faculty
            setIsLocked(data.locked !== false);
            // Mirror to localStorage as offline backup
            localStorage.setItem(`layout_floor_${floorId}`, JSON.stringify(data));
            if (data.mapImage) setMapImage(data.mapImage);
          } else {
          // No file exists yet — try localStorage fallback
          const local = localStorage.getItem(`layout_floor_${floorId}`);
          if (local) {
            const parsed = JSON.parse(local);
            setRooms(Array.isArray(parsed) ? parsed : (parsed.rooms || []));
            setFaculty(parsed.faculty || []);
            if (parsed.mapImage) setMapImage(parsed.mapImage);
            setIsLocked(false);
          } else {
            setRooms([]);
            setFaculty([]);
            setIsLocked(false);
          }
        }
      } catch (err) {
        console.error("API Load failed, using localStorage fallback", err);
        const local = localStorage.getItem(`layout_floor_${floorId}`);
        if (local) {
          const parsed = JSON.parse(local);
          const r = Array.isArray(parsed) ? parsed : (parsed.rooms || []);
          setRooms(r);
          setFaculty(parsed.faculty || []);
          if (parsed.mapImage) setMapImage(parsed.mapImage);
        }
      }
    }
    loadLayout();
  }, [floorId]);

  // Merge loaded room positions with static data (for metadata like descriptions/images)
  // This ensures we keep rich info but follow the pixel-lock rule
  const roomsWithMetadata = useMemo(() => {
    const staticFloor = floorsData[floorId] || {};
    const staticRooms = staticFloor.rooms || [];
    
    return rooms.map(savedRoom => {
      const metadata = staticRooms.find(r => r.id === savedRoom.id) || {};
      return { ...metadata, ...savedRoom };
    });
  }, [rooms, floorId]);

  const onSave = async () => {
    setSaveStatus('saving');
    
    // Round all coordinates before saving
    const cleanRooms = rooms.map(room => ({
      id: room.id,
      label: room.name || room.label,
      x: Math.round(room.x),
      y: Math.round(room.y),
      w: Math.round(room.w || room.width),
      h: Math.round(room.h || room.height),
      width: Math.round(room.w || room.width),
      height: Math.round(room.h || room.height),
      floor: floorId
    }));

    try {
      // 1. save to file via API
      const res = await fetch(`/api/layout/${floorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rooms: cleanRooms, faculty: faculty, lastEditedBy: 'admin', mapImage })
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }

      // 2. Mirror to localStorage
      localStorage.setItem(`layout_floor_${floorId}`, JSON.stringify({ rooms: cleanRooms, faculty, mapImage }));

      // 3. UI Updates
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setIsEditMode(false);
        setIsLocked(true);
        setRooms(cleanRooms);
        setFaculty(faculty);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('Save failed. Layout NOT locked. Try again.');
      setSaveStatus('idle');
    }
  };

  const handleEditUnlock = async () => {
    try {
      // unlock in file first
      await fetch(`/api/layout/${floorId}/unlock`, { method: 'PATCH' });
      setIsLocked(false);
      setIsEditMode(true);
    } catch (err) {
      console.error("Unlock failed", err);
      setIsEditMode(true);
      setIsLocked(false);
    }
  }

  const handleRoomMove = (roomId, newX, newY) => {
    if (!isEditMode) return;
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, x: newX, y: newY } : r));
  };

  const handleRoomResize = (roomId, newW, newH) => {
    if (!isEditMode) return;
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, w: newW, h: newH, width: newW, height: newH } : r));
  };

  const handleInitializeDefault = () => {
    const staticFloor = floorsData[floorId];
    if (staticFloor) {
      if (staticFloor.rooms) setRooms(staticFloor.rooms);
      if (staticFloor.faculty) setFaculty(staticFloor.faculty);
    }
  };

  const handleRoomUpdate = (roomId, updates) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, ...updates } : r));
  };

  const handleDeleteFaculty = (facultyId) => {
    if (!window.confirm("Are you sure you want to remove this faculty from the directory?")) return;
    
    // We only delete from the explicit 'faculty' array state. 
    // If it's a 'list-' prefixed ID, it means it's in the gallery.
    setFaculty(prev => prev.filter((f, idx) => {
      const id = `list-${idx}-${f.name}`;
      return id !== facultyId;
    }));
  };

  const handleMapImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setMapImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const floorData = {
    ...(floorsData[floorId] || {}),
    rooms: roomsWithMetadata,
    faculty: faculty.length > 0 ? faculty : (floorsData[floorId]?.faculty || []),
    mapImage
  };
  const [zoom, setZoom] = useState(0.9)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
  const constraintsRef = useRef(null)
  const floorMenuRef = useRef(null)

  // Close Floor Menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (floorMenuRef.current && !floorMenuRef.current.contains(event.target)) {
        setIsFloorMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isEditMode) return;
    const container = e.currentTarget.getBoundingClientRect();
    const svg = e.currentTarget.querySelector('svg');
    if (!svg) return;
    
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    setMouseCoords({
      x: Math.round(svgPt.x),
      y: Math.round(svgPt.y)
    });
  }, [isEditMode]);
  
  // Aggregate all faculty sources (STRICTLY CURRENT FLOOR)
  const allFaculty = useMemo(() => {
    if (!floorData) return []
    
    // 1. From rooms that have 'faculty' field
    const roomFaculty = (floorData.rooms || [])
      .filter(room => room.faculty && room.faculty !== 'N/A' && room.faculty !== '')
      // Aggressive Deduplication: Remove room entries if they exist in the portrait gallery
      .filter(room => {
        const galleryEntries = floorData.faculty || [];
        return !galleryEntries.some(f => f.roomId === room.id || f.name === room.faculty);
      })
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
  }, [floorData, floorId, faculty])
  
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
    // We just navigate away; the useEffect will see the empty URL and close the modal
    if (selectedRoom) {
      setHighlightedRoomId(selectedRoom.id) // Keep highlight
    }
    navigate(location.pathname, { replace: true })
  }

  const handleCloseFaculty = () => {
    setSelectedFacultyProfile(null)
    setHighlightedRoomId(null) // Clear highlight so the room stops glowing after closing modal
    setActiveSearchIds(null)
    navigate(location.pathname, { replace: true })
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const roomId = searchParams.get('room')
    const facultyName = searchParams.get('faculty')

    if (roomId && floorData && floorData.rooms) {
      const room = floorData.rooms.find(r => r.id === roomId)
      if (room) {
        // Only update if it's a different room to avoid re-render loops
        if (selectedRoom?.id !== room.id) {
          setHighlightedRoomId(room.id)
          // Only open RoomModal if NOT searching for a faculty member
          if (!facultyName) {
            setSelectedRoom(room)
          }
        }
        
        if (room.type && activeFilters.length > 0 && !activeFilters.includes(room.type)) {
          setActiveFilters(prev => [...prev, room.type])
        }
      }
    } else if (!roomId && selectedRoom) {
      // URL cleared, so close the modal
      setSelectedRoom(null)
    }

    if (facultyName) {
      // 1. Try current floor first
      let faculty = allFaculty.find(f => f.name === facultyName)
      
      // 2. If not found (glitch protection), lookup globally
      if (!faculty) {
        faculty = findFacultyGlobally(facultyName)
      }

      if (faculty && selectedFacultyProfile?.name !== faculty.name) {
        setSelectedFacultyProfile(faculty)
      }
    } else if (!facultyName && selectedFacultyProfile) {
      setSelectedFacultyProfile(null)
    }
  }, [location.search, floorData, allFaculty, activeFilters])

  const handleZoom = (delta) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3))
  }

  const resetView = () => {
    setZoom(0.9)
    setPan({ x: 0, y: 0 })
  }

  const floors = [
    { id: 'basement', label: 'Basement Floor' },
    { id: 'ground', label: 'Ground Floor' },
    { id: 'first', label: 'First Floor' },
    { id: 'second', label: 'Second Floor' },
    { id: 'third', label: 'Third Floor' },
    { id: 'fourth', label: 'Fourth Floor' },
    { id: 'fifth', label: 'Fifth Floor' },
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
            onMouseDown={() => navigate('/')}
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

            <div className="relative mt-1" ref={floorMenuRef}>
              <button
                onMouseDown={() => setIsFloorMenuOpen(!isFloorMenuOpen)}
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
                          onMouseDown={(e) => {
                            e.preventDefault();
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
          <div className="max-w-[700px] w-full relative group">
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
                    <div className="flex items-center border-r border-black/10 dark:border-white/10 mr-1 pr-1 gap-1">
                      {rooms.length === 0 && (
                        <button
                          onClick={handleInitializeDefault}
                          className="px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg transition-all font-orbitron font-black text-[8px] uppercase tracking-tighter animate-pulse"
                        >
                          PLACE DEFAULT ROOMS
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (window.confirm("Clear all rooms and start from scratch?")) {
                            setRooms([]);
                          }
                        }}
                        className="px-3 py-2 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 rounded-lg transition-all font-orbitron font-black text-[8px] uppercase tracking-tighter"
                      >
                        CLEAR ALL
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Reset to default file layout? This will lose all manual changes.")) {
                            localStorage.removeItem(`layout_floor_${floorId}`);
                            window.location.reload();
                          }
                        }}
                        className="px-3 py-2 hover:bg-amber-500/10 text-amber-500/60 hover:text-amber-500 rounded-lg transition-all font-orbitron font-black text-[8px] uppercase tracking-tighter"
                      >
                        RESET DEFAULT
                      </button>

                      <label className="px-3 py-2 hover:bg-emerald-500/10 text-emerald-500/60 hover:text-emerald-500 rounded-lg transition-all font-orbitron font-black text-[8px] uppercase tracking-tighter cursor-pointer">
                        UPLOAD REF IMAGE
                        <input type="file" className="hidden" accept="image/*" onChange={handleMapImageUpload} />
                      </label>
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
                        onMouseDown={() => setIsFacultyModalOpen(true)}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-blue-500 rounded-lg transition-all"
                        title="Manage Faculty"
                      >
                        <Users className="w-4 h-4" />
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
                       onMouseDown={() => setIsFacultyModalOpen(true)}
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
                         disabled={zoom <= 0.5}
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
                        onClick={handleEditUnlock}
                        className={`p-2.5 bg-black/[0.03] dark:bg-white/5 hover:bg-blue-500/10 border border-black/10 dark:border-white/10 rounded-xl transition-all ${isLocked ? 'text-black/40 dark:text-white/30' : 'text-blue-500'} hover:text-blue-500`}
                        title={isLocked ? "Unlock Layout" : "Layout Unlocked"}
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
              x: 0,
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
            style={{
              aspectRatio: floorData?.viewWidth && floorData?.viewHeight ? `${floorData.viewWidth}/${floorData.viewHeight}` : '640/663',
              willChange: 'transform, opacity'
            }}
            className={`layout-container floor-${floorId} relative w-auto h-auto max-w-full max-h-full bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500`}
            onMouseMove={handleMouseMove}
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
              onRoomResize={handleRoomResize}
              onRoomClick={(room) => {
                if (room.clickable === false) return;
                if (room.type === 'staffroom') {
                  setIsFacultyModalOpen(true);
                } else {
                  navigate(`?room=${room.id}`);
                }
              }}
              onBoundaryChange={undefined}
            />
        </motion.div>
        
        {/* Live Coordinate Overlay (Edit Mode Only) */}
        {isEditMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-4 z-50 pointer-events-none"
          >
            <div className="flex flex-col">
              <span className="text-[8px] font-orbitron text-white/40 uppercase tracking-widest">CURSOR POSITION</span>
              <div className="flex items-center gap-3 text-xs font-mono text-blue-400">
                <span>X: {mouseCoords.x}</span>
                <span className="text-white/20">|</span>
                <span>Y: {mouseCoords.y}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Filter Dock */}
      <div className={`absolute top-1/2 -translate-y-1/2 left-8 flex flex-col gap-4 z-30 transition-all duration-500 ${selectedRoom ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 p-2 rounded-2xl shadow-xl flex flex-col gap-1">
          {[
            { id: 'classroom', label: 'CLASSROOMS', color: 'bg-blue-500' },
            { id: 'lab', label: 'LABS', color: 'bg-emerald-500' },
            { id: 'staffroom', label: 'STAFF', color: 'bg-amber-400' },
            { id: 'hod', label: 'HOD', color: 'bg-orange-500' },
            { id: 'hall', label: 'HALLS', color: 'bg-red-500' },
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
            onMouseDown={(e) => {
              e.preventDefault();
              setActiveFilters([]);
            }}
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
          onMouseDown={() => setIsFacultyModalOpen(true)}
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
      facultyList={allFaculty}
      isEditMode={isEditMode}
      onDeleteFaculty={handleDeleteFaculty}
      onSelectFaculty={(faculty) => {
        setSelectedFacultyProfile(faculty)
        setIsFacultyModalOpen(false)
        if (faculty.originalRoom) {
          setHighlightedRoomId(faculty.originalRoom.id)
        }
      }}
    />

    <RoomModal 
      room={selectedRoom} 
      onClose={handleCloseRoom} 
      onUpdateDirections={(newDirections) => handleRoomUpdate(selectedRoom.id, { directions: newDirections })}
    />
    <FacultyProfileModal faculty={selectedFacultyProfile} onClose={handleCloseFaculty} />
  </motion.div>
  )
}
