import { useState, useEffect } from 'react';

/**
 * Custom hook to manage floor data history (Undo/Redo) and persistence.
 */
export function useFloorHistory(floorId, getInitialData) {
  const [localFloorData, setLocalFloorData] = useState(() => getInitialData());
  const [history, setHistory] = useState(() => [getInitialData()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Reset when floor changes
  useEffect(() => {
    const data = getInitialData();
    setLocalFloorData(data);
    setHistory([data]);
    setHistoryIndex(0);
  }, [floorId, getInitialData]);

  const pushToHistory = (newData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setLocalFloorData(newData);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setLocalFloorData(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setLocalFloorData(history[nextIndex]);
    }
  };

  const handleSaveLayout = (version = '1.0') => {
    localStorage.setItem(`floor_data_${floorId}`, JSON.stringify({
      version,
      timestamp: Date.now(),
      data: localFloorData
    }));
  };

  const handleRoomMove = (roomId, newX, newY) => {
    const newData = {
      ...localFloorData,
      rooms: localFloorData.rooms.map(r => r.id === roomId ? { ...r, x: newX, y: newY } : r)
    };
    pushToHistory(newData);
  };

  const handleBoundaryChange = (key, delta) => {
    const newData = {
      ...localFloorData,
      [key]: Math.max(100, Math.round(((localFloorData[key] || 0) + delta) / 10) * 10)
    };
    pushToHistory(newData);
  };

  return {
    localFloorData,
    historyIndex,
    historyLength: history.length,
    handleUndo,
    handleRedo,
    handleSaveLayout,
    handleRoomMove,
    handleBoundaryChange,
    setLocalFloorData
  };
}
