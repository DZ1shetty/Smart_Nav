/**
 * INTENT-AWARE NAVIGATION SEARCH ENGINE (Core Engine v1.0)
 * 
 * Follows the "Elite Navigation Search" specification for intent classification,
 * entity extraction, and multi-signal ranking.
 */

import { floorsData } from './floorsData';

/// --- SEARCH CONFIG & CONSTANTS ---
const SCHEMA_VERSION = "1.0";
const CONFIDENCE_THRESHOLD = 45;

const INTENT_PATTERNS = {
  NAVIGATIONAL: /(room|lab|office|hall|lh|cr|floor|block|staff)/i,
  INFORMATIONAL: /(how to|where is|what is|info|details|about)/i,
  LOCAL: /(near|next to|opposite|beside|nearby)/i,
};

// --- CORE UTILITIES ---

const superNormalize = (str) => str?.toString().toLowerCase().replace(/[^a-z0-9]/g, '') || "";
const normalize = (str) => str?.toString().toLowerCase().trim() || "";

/**
 * Stage 1: Intent Classification
 */
const classifyIntent = (query) => {
  const q = normalize(query);
  if (INTENT_PATTERNS.NAVIGATIONAL.test(q)) return "navigational";
  if (INTENT_PATTERNS.LOCAL.test(q)) return "local";
  if (INTENT_PATTERNS.INFORMATIONAL.test(q)) return "informational";
  return q.split(/\s+/).length <= 2 ? "navigational" : "ambiguous";
};

/**
 * Stage 2: Entity Extraction
 */
const extractEntities = (query) => {
  const q = normalize(query);
  const entities = [];
  
  const roomPattern = /([a-z]{1,4})?\s?\d{1,4}/i;
  const roomMatch = q.match(roomPattern);
  if (roomMatch) entities.push({ value: roomMatch[0], type: "place" });

  const personMatch = q.match(/(?:dr|mr|ms|prof)\.?\s+([a-z\s]+)/i);
  if (personMatch) entities.push({ value: personMatch[1].trim(), type: "person" });
  
  // If no prefix but looks like a name (capitalized or multi-word)
  if (!personMatch && q.split(' ').length >= 2) {
    entities.push({ value: q, type: "person" });
  }

  return entities;
};

/**
 * Stage 3: Ranking & Scoring System (100-pt Scale)
 */
const calculateScore = (query, item, context = {}, entities = []) => {
  const q = superNormalize(query);
  const name = superNormalize(item.name);
  const searchable = superNormalize(item.searchable || '');
  
  let scores = {
    relevance: 0,      // 0-50
    recency: 20,        
    authority: 15,      
    proximity: 0,       
    personalization: 5
  };

  // 1. Direct Name Match
  if (name === q) scores.relevance = 50;
  else if (name.includes(q) || q.includes(name)) scores.relevance = 40;
  
  // 2. Entity Matching (High Signal)
  entities.forEach(ent => {
    const entVal = superNormalize(ent.value);
    if (name === entVal || name.includes(entVal)) {
      scores.relevance = Math.max(scores.relevance, 45);
    }
  });

  // 3. Searchable Content Match
  if (scores.relevance < 35 && searchable.includes(q)) {
    scores.relevance = 35;
  }

  // PROXIMITY
  if (context.currentFloor === item.floorKey) scores.proximity = 10;

  // AUTHORITY
  if (item.type === 'lab' || item.type === 'lecture_hall') scores.authority = 20;
  if (item.type === 'faculty') scores.authority = 18;

  const total = Math.min(100, Object.values(scores).reduce((a, b) => a + b, 0));
  return { total, breakdown: scores };
};

/**
 * THE RESOLVER: Main entry point for search queries
 */
export const resolveNavigationQuery = (query, context = {}) => {
  if (!query || query.trim().length < 1) return null;

  const intent = classifyIntent(query);
  const entities = extractEntities(query);
  
  // 1. Create a Faculty-to-Room mapping for cross-referencing
  const facultyMap = {};
  Object.entries(floorsData).forEach(([floorKey, floorInfo]) => {
    floorInfo.faculty?.forEach(fac => {
      if (!facultyMap[fac.roomId]) facultyMap[fac.roomId] = [];
      facultyMap[fac.roomId].push(fac.name);
    });
  });

  // 2. Flatten all searchable items
  const pool = [];
  Object.entries(floorsData).forEach(([floorKey, floorInfo]) => {
    // Index Rooms
    floorInfo.rooms?.forEach(room => {
      // Get linked faculty for this room
      const linkedFaculty = facultyMap[room.id] || [];
      const facultyString = linkedFaculty.join(' ');
      
      pool.push({
        ...room,
        floorKey,
        floorLabel: floorInfo.label,
        linkedFaculty: linkedFaculty,
        searchable: `${room.name} ${room.faculty || ''} ${facultyString} ${room.type} ${room.department || ''} ${room.tags?.join(' ') || ''}`
      });
    });

    // Index Faculty (Explicitly)
    floorInfo.faculty?.forEach(fac => {
      const room = floorInfo.rooms?.find(r => r.id === fac.roomId);
      pool.push({
        id: fac.roomId,
        name: fac.name,
        type: 'faculty',
        floorKey,
        floorLabel: floorInfo.label,
        roomName: room?.name || 'Staff Area',
        searchable: `${fac.name} ${fac.department || ''} ${fac.designation || ''} ${room?.name || ''}`
      });
    });
  });

  // 3. Score and Sort
  const rankedResults = pool
    .map(item => {
      const scoreData = calculateScore(query, item, context, entities);
      
      // Dynamic Description
      let description = "";
      if (item.type === 'faculty') {
        description = `Faculty member located in ${item.roomName} (${item.floorLabel}).`;
      } else {
        const facultyInfo = item.linkedFaculty?.length > 0 
          ? `Assigned to: ${item.linkedFaculty.join(', ')}.` 
          : (item.faculty ? `Assigned to: ${item.faculty}.` : '');
        description = `${item.type.toUpperCase()} on the ${item.floorLabel}. ${facultyInfo}`;
      }

      return {
        id: item.id,
        title: item.name,
        url: `/floor/${item.floorKey}?room=${item.id}${item.type === 'faculty' ? `&faculty=${encodeURIComponent(item.name)}` : ''}`,
        description: description,
        intent_type: intent === 'ambiguous' ? 'navigational' : intent,
        confidence_score: scoreData.total,
        ranking_breakdown: scoreData.breakdown,
        source_freshness: "recent",
        category_tags: [item.type, item.floorKey],
        schema_version: SCHEMA_VERSION
      };
    })
    .filter(r => r.confidence_score > 15)
    .sort((a, b) => b.confidence_score - a.confidence_score);

  // 4. ZERO-RESULT & FALLBACK PROTOCOL
  if (rankedResults.length === 0 || rankedResults[0].confidence_score < CONFIDENCE_THRESHOLD) {
    return {
      title: "No direct match found",
      url: null,
      description: "We couldn't find an exact match. Try checking the faculty directory or searching for a room number.",
      intent_type: "informational",
      confidence_score: 0,
      ranking_breakdown: { relevance: 0, recency: 0, authority: 0, proximity: 0, personalization: 0 },
      source_freshness: "stale",
      category_tags: ["fallback"],
      alternatives: rankedResults.slice(0, 4),
      schema_version: SCHEMA_VERSION
    };
  }

  const finalResult = { ...rankedResults[0] };
  finalResult.alternatives = rankedResults.slice(1, 5);
  
  return finalResult;
};
