import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, MapPin, ArrowRight, X, User, Command, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { resolveNavigationQuery } from '../data/searchEngine';

const SearchSystem = ({ onResultsChange, onSearchFocus, currentFloor }) => {
  const [query, setQuery] = useState('');
  const [resolution, setResolution] = useState(null); 
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isResolving, setIsResolving] = useState(false);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Resolve query through the Intent-Aware Engine
  useEffect(() => {
    if (!query.trim()) {
      setResolution(null);
      setIsResolving(false);
      return;
    }

    setIsResolving(true);
    // Simulate high-end engine processing
    const timer = setTimeout(() => {
      const result = resolveNavigationQuery(query, { currentFloor });
      setResolution(result);
      setIsResolving(false);
      setSelectedIndex(0);

      if (onResultsChange) {
        const hasResults = result && (result.confidence_score >= 40 || (result.alternatives && result.alternatives.length > 0));
        if (hasResults) {
          const ids = [
            result.confidence_score >= 20 ? result.id : null, 
            ...(result.alternatives?.map(a => a.id) || [])
          ].filter(Boolean);
          onResultsChange(ids);
        } else {
          onResultsChange(null);
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, currentFloor, onResultsChange]);

  useEffect(() => {
    if (onSearchFocus) onSearchFocus(isFocused);
  }, [isFocused, onSearchFocus]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const max = (resolution?.alternatives?.length || 0);
      setSelectedIndex(prev => (prev < max ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (selectedIndex === 0 && resolution?.url) {
        handleSelect(resolution);
      } else if (resolution?.alternatives?.[selectedIndex - 1]) {
        handleSelect(resolution.alternatives[selectedIndex - 1]);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item) => {
    if (!item.url) return;
    navigate(item.url);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Premium Cyber Search Bar - Centered & Prominent */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-blue-500/10 blur-3xl transition-opacity duration-1000 rounded-full ${isFocused ? 'opacity-100' : 'opacity-20'}`} />
        
        <div className={`relative flex items-center bg-black/40 dark:bg-white/[0.03] backdrop-blur-3xl border transition-all duration-700 rounded-2xl overflow-hidden shadow-2xl
          ${isFocused ? 'border-blue-500/50 ring-[16px] ring-blue-500/[0.05]' : 'border-white/10 hover:border-white/20'}`}>
          
          {/* Permanent glowing accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-700 ${isFocused ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]'}`} />

          <div className="pl-6 pr-2">
            <Search className={`w-4 h-4 transition-colors duration-500 ${isFocused ? 'text-blue-400' : 'text-white/20'}`} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="SEARCH ROOMS, FACULTY, OR DEPARTMENTS..."
            className="w-full py-6 bg-transparent outline-none text-[12px] font-orbitron font-black uppercase tracking-[0.3em] text-white/90 placeholder:text-white/10"
          />

          <AnimatePresence>
            {isResolving && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="mr-6"
               >
                 <div className="w-4 h-4 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
               </motion.div>
            )}
            {query && !isResolving && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuery('')}
                className="p-3 hover:bg-white/5 text-white/20 hover:text-red-400 mr-4 rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {!query && (
            <div className="pr-8 flex items-center gap-3 opacity-20 pointer-events-none hidden sm:flex">
              <span className="text-[10px] font-orbitron font-black tracking-widest">COMMAND</span>
              <div className="px-2 py-1 bg-white/10 rounded-md text-[8px]">⌘ K</div>
            </div>
          )}
        </div>
      </div>

      {/* Structured Resolution Overlay */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-4 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden z-[150]"
          >
            <div className="absolute inset-0 scanline-effect opacity-[0.04] pointer-events-none" />

            {!query.trim() ? (
              /* Instant Suggestions / Quick Navigation */
              <div className="p-4">
                <div className="px-4 py-3 text-[9px] font-orbitron font-black text-blue-500/50 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Zap className="w-3 h-3" />
                  Quick Navigation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {[
                    { title: 'MAIN STAFF ROOM', desc: 'General Faculty Area', url: '/floor/floor1?room=staff-room-1' },
                    { title: 'BIOPROCESS LAB', desc: 'BTL09 - Biotechnology', url: '/floor/floor2?room=btl09' },
                    { title: 'RESEARCH LAB', desc: 'BTL11 - 2nd Floor', url: '/floor/floor2?room=btl11' },
                    { title: 'HOD OFFICE', desc: 'Biotechnology HOD', url: '/floor/floor2?room=hod-cabin-bt' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item)}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-orbitron font-black text-white/80 tracking-widest">{item.title}</div>
                        <div className="text-[8px] text-white/20 font-medium uppercase mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : resolution && !isResolving && (
              /* Active Results */
              <>
                {/* Clean Results Overlay */}
                <div className="p-2 border-b border-white/5">
                  {resolution.confidence_score > 0 && (
                    <div className="px-3 py-2 flex justify-end">
                      <span className={`text-[8px] font-orbitron font-black tracking-widest ${resolution.confidence_score >= 80 ? 'text-emerald-500/50' : 'text-amber-500/50'}`}>
                        {resolution.confidence_score}% MATCH
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => handleSelect(resolution)}
                    onMouseEnter={() => setSelectedIndex(0)}
                    className={`w-full text-left p-5 rounded-2xl transition-all relative overflow-hidden mt-1
                      ${selectedIndex === 0 ? 'bg-blue-500/[0.07] border border-blue-500/20' : 'border border-transparent'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0
                        ${selectedIndex === 0 ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-white/20'}`}>
                        {resolution.confidence_score === 0 ? <AlertCircle className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-[13px] font-orbitron font-black tracking-widest truncate ${selectedIndex === 0 ? 'text-blue-400' : 'text-white/90'}`}>
                            {resolution.title}
                          </h4>
                          {resolution.source_freshness === 'live' && (
                            <div className="flex gap-0.5">
                               {[1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse" />)}
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] text-white/30 mt-1.5 line-clamp-1 font-medium tracking-tight uppercase">
                          {resolution.description}
                        </p>
                      </div>

                      {selectedIndex === 0 && resolution.url && (
                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                          <ArrowRight className="w-4 h-4 text-blue-500/50" />
                        </motion.div>
                      )}
                    </div>
                  </button>
                </div>

                {/* Alternative Resolvers */}
                {resolution.alternatives && resolution.alternatives.length > 0 && (
                  <div className="p-2 pt-1">
                    <div className="px-3 py-3 text-[8px] font-orbitron font-black text-white/10 uppercase tracking-[0.2em]">
                      Alternative Resolutions
                    </div>
                    <div className="flex flex-col gap-1.5 px-1">
                      {resolution.alternatives.map((alt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(alt)}
                          onMouseEnter={() => setSelectedIndex(idx + 1)}
                          className={`flex items-center gap-5 px-4 py-3 rounded-xl transition-all text-left group
                            ${selectedIndex === idx + 1 ? 'bg-white/[0.04] border border-white/5' : 'border border-transparent hover:bg-white/[0.01]'}`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0
                            ${selectedIndex === idx + 1 ? 'bg-blue-500/10 text-blue-400/70' : 'bg-white/5 text-white/10 group-hover:text-white/20'}`}>
                            {alt.category_tags.includes('faculty') ? <User className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-orbitron font-black tracking-[0.1em] text-white/60 uppercase group-hover:text-white/80 transition-colors">{alt.title}</div>
                            <div className="text-[8px] text-white/10 font-orbitron font-black uppercase tracking-[0.2em] mt-1">
                              {alt.category_tags.join(' • ')}
                            </div>
                          </div>
                          <div className="text-[9px] font-orbitron font-black text-white/5 group-hover:text-blue-500/30 transition-colors">{alt.confidence_score}%</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* Minimal Footer */}
            <div className="px-5 py-2 border-t border-white/5 bg-white/[0.01]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchSystem;
