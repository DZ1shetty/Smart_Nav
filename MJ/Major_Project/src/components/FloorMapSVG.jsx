import { motion } from 'framer-motion'
import RoomBox from './RoomBox'
import { memo } from 'react'

/**
 * Renders the SVG representation of a building floor plan.
 * Handles the outer border geometry and child room rendering.
 */
const FloorMapSVG = memo(function FloorMapSVG({ 
  floorData, 
  isEditMode, 
  selectedRoomId, 
  highlightedRoomId,
  activeFilters,
  activeSearchIds,
  onRoomMove,
  onRoomResize,
  onRoomClick,
  onBoundaryChange
}) {
  const { viewWidth, viewHeight, mainWidth, bulgeWidth, bulgeHeight } = floorData || {};
  const w = viewWidth || 640;
  const h = viewHeight || 663;
  const mainW = mainWidth || 455;
  const bW = bulgeWidth || 165;
  const bH = bulgeHeight || 200;
  const midY = h / 2;
  const rounded = 40;

  // Calculate centering offsets accurately
  const minX = 5;
  const maxX = mainW + bW;
  const buildingCenter = (minX + maxX) / 2;
  const viewCenter = w / 2;
  const dx = viewCenter - buildingCenter;
  const dy = 0;

  // Outer border path calculation
  const borderPath = `
    M ${rounded + 5},10 
    L ${mainW - rounded},10 
    Q ${mainW},10 ${mainW},${rounded + 10} 
    L ${mainW},${midY - bH/2} 
    L ${mainW + bW},${midY - bH/2} 
    L ${mainW + bW},${midY + bH/2} 
    L ${mainW},${midY + bH/2} 
    L ${mainW},${h - rounded} 
    Q ${mainW},${h} ${mainW - rounded},${h} 
    L ${rounded + 5},${h} 
    Q 5,${h} 5,${h - rounded} 
    L 5,${rounded + 10} 
    Q 5,10 ${rounded + 5},10 
    Z
  `;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full p-2"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      {/* Background Image Layer (Uploaded Reference) */}
      {floorData?.mapImage && (
        <image 
          href={floorData.mapImage}
          x="0"
          y="0"
          width={w}
          height={h}
          preserveAspectRatio="xMidYMid slice"
          opacity={isEditMode ? 0.4 : 0.1}
          style={{ pointerEvents: 'none' }}
        />
      )}

      <g transform={`translate(${dx}, ${dy})`}>
        {/* Floor Border */}
      <path
        d={borderPath}
        fill="none"
        stroke={isEditMode ? "rgba(59, 130, 246, 0.7)" : "var(--boundary-stroke)"}
        strokeWidth={isEditMode ? "4" : "3"}
        strokeDasharray={isEditMode ? "12 6" : "10 5"}
      />

      {/* Boundary Adjustment Handles (Edit Mode only) */}
      {isEditMode && (
        <g className="cursor-pointer">
          <motion.circle
            cx={mainW} cy={100} r="8" fill="#3b82f6"
            drag="x" dragMomentum={false}
            onDrag={(e, info) => onBoundaryChange('mainWidth', info.delta.x)}
            whileHover={{ scale: 1.5 }}
          />
          <text x={mainW + 15} y={105} fontSize="10" fill="#3b82f6" className="font-orbitron font-black select-none tracking-widest">WIDTH</text>

          <motion.circle
            cx={mainW + bW} cy={midY} r="8" fill="#3b82f6"
            drag="x" dragMomentum={false}
            onDrag={(e, info) => onBoundaryChange('bulgeWidth', info.delta.x)}
            whileHover={{ scale: 1.5 }}
          />
          <text x={mainW + bW + 15} y={midY + 5} fontSize="10" fill="#3b82f6" className="font-orbitron font-black select-none tracking-widest">BULGE</text>

          <motion.circle
            cx={mainW + bW / 2} cy={midY + bH / 2} r="8" fill="#3b82f6"
            drag="y" dragMomentum={false}
            onDrag={(e, info) => onBoundaryChange('bulgeHeight', info.delta.y * 2)}
            whileHover={{ scale: 1.5 }}
          />

          <motion.circle
            cx={100} cy={h} r="8" fill="#3b82f6"
            drag="y" dragMomentum={false}
            onDrag={(e, info) => onBoundaryChange('viewHeight', info.delta.y)}
            whileHover={{ scale: 1.5 }}
          />
          <text x={115} y={h + 5} fontSize="10" fill="#3b82f6" className="font-orbitron font-black select-none tracking-widest">LENGTH</text>
        </g>
      )}

      {/* Rooms */}
      {floorData?.rooms && floorData.rooms
        .filter(room => 
          room.type !== 'corridor' && (
            isEditMode || 
            (!room.hideOnMap && (activeFilters.length === 0 || activeFilters.includes(room.type)))
          )
        )
        .map((room) => {
          return (
            <RoomBox
              key={room.id}
              room={room}
              isSelected={selectedRoomId === room.id || highlightedRoomId === room.id}
              isEditMode={isEditMode}
              onMove={onRoomMove}
              onResize={onRoomResize}
              onClick={() => onRoomClick(room)}
            />
          );
        })}
      </g>
    </svg>
  );
})

export default FloorMapSVG;
