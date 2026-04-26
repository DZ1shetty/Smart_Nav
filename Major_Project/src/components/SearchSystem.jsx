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
      {/* Premium Cyber Search Bar - Vertically Extended for Elegance */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-blue-500/5 blur-3xl transition-opacity duration-1000 rounded-full ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className={`relative flex items-center bg-white/[0.03] backdrop-blur-2xl border transition-all duration-700 rounded-2xl overflow-hidden
          ${isFocused ? 'border-blue-500/40 ring-[12px] ring-blue-500/[0.03]' : 'border-white/5 hover:border-white/10'}`}>
          
          {/* Elegant Left Accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-700 ${isFocused ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-transparent'}`} />

          <div className="pl-5 pr-2">
            <Search className={`w-3.5 h-3.5 transition-colors duration-500 ${isFocused ? 'text-blue-400' : 'text-white/10'}`} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="TYPE TO NAVIGATE..."
            className="w-full py-5 bg-transparent outline-none text-[11px] font-orbitron font-black uppercase tracking-[0.25em] text-white/90 placeholder:text-white/5"
          />

          <AnimatePresence>
            {isResolving && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="mr-5"
               >
                 <div className="w-3 h-3 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
               </motion.div>
            )}
            {query && !isResolving && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuery('')}
                className="p-2.5 hover:bg-white/5 text-white/10 hover:text-red-400/50 mr-3 rounded-xl transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>

          {!query && (
            <div className="pr-6 flex items-center gap-2 opacity-5 pointer-events-none hidden sm:flex">
              <span className="text-[9px] font-orbitron font-black tracking-widest">RESOLVE</span>
              <Command className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Structured Resolution Overlay */}
      <AnimatePresence>
        {isFocused && query.trim() && resolution && !isResolving && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-[150]"
          >
            <div className="absolute inset-0 scanline-effect opacity-[0.03] pointer-events-none" />

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
            
            {/* Minimal Footer */}
            <div className="px-5 py-2 border-t border-white/5 bg-white/[0.01]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchSystem;
