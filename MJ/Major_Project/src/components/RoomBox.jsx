import { memo, useState } from 'react'

const TYPE_COLORS = {
  classroom: '#3b82f6', // blue
  lab: '#22c55e',       // green
  staffroom: '#facc15', // yellow
  hod: '#f97316',       // orange
  utility: '#9ca3af',   // gray
  hall: '#ef4444',      // red
  corridor: 'transparent'
}

// --- STATIC BOX (VIEW MODE) ---
const StaticRoom = ({ room, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isCorridor = room.type === 'corridor'
  const color = TYPE_COLORS[room.type] || '#ffffff'
  const c = 6
  const w = room.width ?? room.w ?? 0;
  const h = room.height ?? room.h ?? 0;
  const rx = room.x ?? 0;
  const ry = room.y ?? 0;

  // Clickability Logic: Filter out stairs, lifts, and washrooms
  const isUtilityExcluded = 
    room.name?.toLowerCase().includes('stairs') || 
    room.name?.toLowerCase().includes('lift') || 
    room.name?.toLowerCase().includes('washroom') ||
    room.id?.toLowerCase().includes('stairs') ||
    room.id?.toLowerCase().includes('lift') ||
    room.id?.toLowerCase().includes('washroom');

  const isClickable = !isCorridor && !isUtilityExcluded && room.clickable !== false;
  
  const roomPath = `
    M ${rx + c} ${ry}
    H ${rx + w - c} 
    L ${rx + w} ${ry + c}
    V ${ry + h - c}
    L ${rx + w - c} ${ry + h}
    H ${rx + c}
    L ${rx} ${ry + h - c}
    V ${ry + c}
    Z
  `

  return (
    <g 
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
    >
      {!isCorridor && <path d={roomPath} fill={color} opacity="0.1" />}
      <path
        d={roomPath}
        fill={isCorridor ? 'var(--room-corridor)' : 'var(--room-bg)'}
        stroke={isCorridor ? 'var(--blueprint-line)' : color}
        strokeOpacity={isCorridor ? 0.5 : 0.8}
        strokeWidth={isCorridor ? '1' : '2'}
        strokeDasharray={isCorridor ? '4 4' : '0'}
      />
      {!isCorridor && (
        <RoomLabel room={room} w={w} h={h} color={color} showCoords={isHovered} />
      )}
    </g>
  )
}

// --- DRAGGABLE BOX (EDIT MODE ONLY) ---
const DraggableRoom = ({ room, onMove, onResize }) => {
  const isCorridor = room.type === 'corridor'
  const color = TYPE_COLORS[room.type] || '#ffffff'
  const c = 6
  const w = room.width ?? room.w ?? 0;
  const h = room.height ?? room.h ?? 0;
  const rx = room.x ?? 0;
  const ry = room.y ?? 0;
  
  // Custom Pointer Events for 1:1 Pixel Accuracy (NO CSS TRANSFORMS)
  const handlePointerDown = (e) => {
    if (isCorridor) return;
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);

    const svg = e.target.ownerSVGElement;
    const startPt = svg.createSVGPoint();
    startPt.x = e.clientX;
    startPt.y = e.clientY;
    const startSVG = startPt.matrixTransform(svg.getScreenCTM().inverse());
    
    const startRoomX = room.x;
    const startRoomY = room.y;

    const onPointerMove = (moveEvent) => {
      const movePt = svg.createSVGPoint();
      movePt.x = moveEvent.clientX;
      movePt.y = moveEvent.clientY;
      const moveSVG = movePt.matrixTransform(svg.getScreenCTM().inverse());
      
      const dx = moveSVG.x - startSVG.x;
      const dy = moveSVG.y - startSVG.y;
      
      // Update state live (exact coordinates)
      onMove(room.id, Math.round(startRoomX + dx), Math.round(startRoomY + dy));
    };

    const onPointerUp = (upEvent) => {
      e.target.releasePointerCapture(upEvent.pointerId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleResizePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);

    const svg = e.target.ownerSVGElement;
    const startPt = svg.createSVGPoint();
    startPt.x = e.clientX;
    startPt.y = e.clientY;
    const startSVG = startPt.matrixTransform(svg.getScreenCTM().inverse());
    
    const startRoomW = w;
    const startRoomH = h;

    const onPointerMove = (moveEvent) => {
      const movePt = svg.createSVGPoint();
      movePt.x = moveEvent.clientX;
      movePt.y = moveEvent.clientY;
      const moveSVG = movePt.matrixTransform(svg.getScreenCTM().inverse());
      
      const dx = moveSVG.x - startSVG.x;
      const dy = moveSVG.y - startSVG.y;
      
      onResize(room.id, Math.max(20, Math.round(startRoomW + dx)), Math.max(20, Math.round(startRoomH + dy)));
    };

    const onPointerUp = (upEvent) => {
      e.target.releasePointerCapture(upEvent.pointerId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const roomPath = `
    M ${rx + c} ${ry}
    H ${rx + w - c} 
    L ${rx + w} ${ry + c}
    V ${ry + h - c}
    L ${rx + w - c} ${ry + h}
    H ${rx + c}
    L ${rx} ${ry + h - c}
    V ${ry + c}
    Z
  `

  return (
    <g>
      {/* Edit Mode Glow & Draggable Area */}
      <rect
        x={room.x - 4}
        y={room.y - 4}
        width={w + 8}
        height={h + 8}
        fill="transparent"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="4 4"
        className="animate-pulse"
        onPointerDown={handlePointerDown}
        style={{ cursor: !isCorridor ? 'move' : 'default', touchAction: 'none' }}
      />

      <path 
        d={roomPath} 
        fill="var(--room-bg)" 
        stroke={color} 
        strokeWidth="2"
        onPointerDown={handlePointerDown}
        style={{ pointerEvents: 'none' }} 
      />
      <RoomLabel room={room} w={w} h={h} color={color} showCoords={true} />

      {/* Resize Handle */}
      <rect
        x={room.x + w - 12}
        y={room.y + h - 12}
        width="12"
        height="12"
        fill={color}
        className="cursor-nwse-resize"
        onPointerDown={handleResizePointerDown}
        style={{ touchAction: 'none' }}
      />
    </g>
  )
}

const RoomLabel = ({ room, w, h, color, showCoords }) => {
  return (
    <foreignObject x={room.x ?? 0} y={room.y ?? 0} width={w} height={h} style={{ pointerEvents: 'none', overflow: 'visible' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {showCoords && (
          <div className="coord-label">
            ({Math.round(room.x ?? 0)}, {Math.round(room.y ?? 0)})
          </div>
        )}
        <div className="box-label" style={{ color: color }}>
          {room.name || room.label}
        </div>
      </div>
    </foreignObject>
  );
}

const RoomBox = ({ room, isEditMode, onMove, onResize, onClick }) => {
  return isEditMode ? (
    <DraggableRoom room={room} onMove={onMove} onResize={onResize} />
  ) : (
    <StaticRoom room={room} onClick={onClick} />
  );
};

export default memo(RoomBox);
