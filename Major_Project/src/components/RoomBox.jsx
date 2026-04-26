import { motion } from 'framer-motion'
import { memo } from 'react'

const TYPE_COLORS = {
  classroom: '#3b82f6', // blue
  lab: '#22c55e',       // green
  staffroom: '#facc15', // yellow
  hod: '#f97316',       // orange
  utility: '#9ca3af',   // gray
  corridor: 'transparent'
}

const RoomBox = ({ room, onClick, isSelected, isEditMode, onMove }) => {
  const isCorridor = room.type === 'corridor'
  const color = TYPE_COLORS[room.type] || '#ffffff'
  const c = 6 // chamfer size

  // Path for chamfered rectangle
  const roomPath = `
    M ${room.x + c} ${room.y}
    H ${room.x + room.w - c} 
    L ${room.x + room.w} ${room.y + c}
    V ${room.y + room.h - c}
    L ${room.x + room.w - c} ${room.y + room.h}
    H ${room.x + c}
    L ${room.x} ${room.y + room.h - c}
    V ${room.y + c}
    Z
  `

  return (
    <motion.g
      onClick={!isEditMode ? onClick : undefined}
      drag={isEditMode && !isCorridor}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(e, info) => {
        if (isEditMode && onMove) {
          const newX = Math.round((room.x + info.offset.x) / 5) * 5
          const newY = Math.round((room.y + info.offset.y) / 5) * 5
          onMove(room.id, newX, newY)
        }
      }}
      className={(room.clickable !== false || isEditMode) ? 'cursor-pointer' : ''}
      animate={{
        ...(isSelected ? {
          filter: [
            `drop-shadow(0 0 8px ${color}66)`,
            `drop-shadow(0 0 15px ${color}aa)`,
            `drop-shadow(0 0 8px ${color}66)`
          ],
          scale: 1.07,
          opacity: 1
        } : {
          filter: 'drop-shadow(0 0 0px transparent)',
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1
        }),
        pointerEvents: 'auto'
      }}
      whileHover={(room.clickable !== false || isEditMode) && !isSelected ? { 
        filter: `drop-shadow(0 0 12px ${color}88)`,
        scale: 1.05
      } : {}}
      transition={isSelected ? { 
        filter: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 300, damping: 25 }
      } : { type: "spring", stiffness: 400, damping: 25 }}
      role={(room.clickable !== false || isEditMode) ? "button" : "presentation"}
      aria-label={room.name || "Corridor"}
    >
      {/* Edit Mode Glow */}
      {isEditMode && !isCorridor && (
        <rect
          x={room.x - 4}
          y={room.y - 4}
          width={room.w + 8}
          height={room.h + 8}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-pulse"
        />
      )}

      {/* Glow Backing */}
      {!isCorridor && (
        <path
          d={roomPath}
          fill={color}
          opacity="0.05"
        />
      )}

      {/* Main Body */}
      <motion.path
        d={roomPath}
        fill={isCorridor ? 'var(--room-corridor)' : 'var(--room-bg)'}
        stroke={isCorridor ? 'var(--blueprint-line)' : (isSelected || isEditMode ? color : 'var(--text-main)')}
        strokeOpacity={isCorridor ? 0.5 : (isSelected || isEditMode ? 1 : 0.2)}
        strokeWidth={isCorridor ? '1' : (isSelected || isEditMode ? '2' : '1.5')}
        strokeDasharray={isCorridor ? '4 4' : '0'}
        animate={isSelected ? {
          strokeOpacity: [0.4, 1, 0.4],
          strokeWidth: [2, 3, 2]
        } : {
          strokeOpacity: isCorridor ? 0.5 : 0.2,
          strokeWidth: 1.5
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      
      {!isCorridor && (
        <>
          {/* Holographic Scanline Effect */}
          {isSelected && (
            <motion.rect
              x={room.x}
              y={room.y}
              width={room.w}
              height="2"
              fill={color}
              opacity="0.3"
              animate={{
                opacity: [0, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="pointer-events-none"
            />
          )}

          {/* Corner Accents - Unique Tech Decor */}
          <motion.path
            d={`M ${room.x} ${room.y + c + 8} V ${room.y + c} L ${room.x + c} ${room.y}`}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={isSelected ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          
          <path
            d={`M ${room.x + room.w - c - 4} ${room.y + room.h} H ${room.x + room.w - c} L ${room.x + room.w} ${room.y + room.h - c}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Room Label - Multi-line wrapping with auto-scaling */}
          {(() => {
            const getLines = (text) => {
              if (!text) return [''];
              const words = text.split(' ');
              const lines = [];
              let currentLine = words[0];
              
              // Split if name is multi-word and doesn't fit a very wide profile
              const threshold = Math.max(7, Math.floor((room.w - 12) / 14));
              
              for (let i = 1; i < words.length; i++) {
                if ((currentLine + ' ' + words[i]).length <= threshold) {
                  currentLine += ' ' + words[i];
                } else {
                  lines.push(currentLine);
                  currentLine = words[i];
                }
              }
              lines.push(currentLine);
              return lines;
            };

            const lines = getLines(room.name);
            const maxLineLength = Math.max(...lines.map(l => l.length), 1);
            const padding = 10;
            const lineHeight = 1.1; 
            
            // Orbitron is wide; 0.75 is a very safe factor to guarantee fit
            const fontSizeW = (room.w - padding) / (maxLineLength * 0.75);
            const fontSizeH = (room.h - padding) / (lines.length * lineHeight);
            
            // Allow text to grow much larger to fill the box
            const maxCap = 32; 
            const finalFontSize = Math.max(Math.min(fontSizeW, fontSizeH, maxCap), 7);

            return (
              <motion.text
                fontWeight="black"
                fill="var(--text-main)"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-orbitron font-black pointer-events-none select-none uppercase transition-colors duration-300"
                animate={isSelected ? {
                  fill: ['var(--text-main)', color, 'var(--text-main)']
                } : {
                  fill: 'var(--text-main)'
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                style={{ 
                  textShadow: isSelected ? `0 0 10px ${color}44` : 'none',
                  letterSpacing: '-0.05em',
                  fontSize: `${finalFontSize}px`
                }}
              >
                {lines.map((line, i) => {
                  const startY = room.y + room.h / 2 - ((lines.length - 1) * (finalFontSize * lineHeight)) / 2;
                  return (
                    <tspan
                      key={i}
                      x={room.x + room.w / 2}
                      y={startY + i * (finalFontSize * lineHeight)}
                      dominantBaseline="central"
                    >
                      {line}
                    </tspan>
                  );
                })}
              </motion.text>
            );
          })()}

          {/* Coordinate Tooltip in Edit Mode */}
          {isEditMode && (
             <text
             x={room.x}
             y={room.y - 10}
             fontSize="10"
             fill={color}
             fontWeight="bold"
             className="font-mono pointer-events-none"
           >
             {room.x}, {room.y}
           </text>
          )}

          {/* Small Tech Detail - Type Indicator */}
          <circle 
            cx={room.x + room.w - 10} 
            cy={room.y + 10} 
            r="1.5" 
            fill={color} 
            className="animate-pulse"
          />
        </>
      )}
    </motion.g>
  )
}

export default memo(RoomBox)


