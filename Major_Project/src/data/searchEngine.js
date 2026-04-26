/**
 * INTENT-AWARE NAVIGATION SEARCH ENGINE (Core Engine v1.0)
 * 
 * Follows the "Elite Navigation Search" specification for intent classification,
 * entity extraction, and multi-signal ranking.
 */

import { floorsData } from './floorsData';

// --- SEARCH CONFIG & CONSTANTS ---
const SCHEMA_VERSION = "1.0";
const CONFIDENCE_THRESHOLD = 60;

const INTENT_PATTERNS = {
  NAVIGATIONAL: /(room|lab|office|hall|lh|cr|floor|block|staff)/i,
  INFORMATIONAL: /(how to|where is|what is|info|details|about)/i,
  LOCAL: /(near|next to|opposite|beside|nearby)/i,
};

// --- CORE UTILITIES ---

const normalize = (str) => str?.toString().toLowerCase().trim() || "";

/**
 * Stage 1: Intent Classification
 */
const classifyIntent = (query) => {
  const q = normalize(query);
  if (INTENT_PATTERNS.NAVIGATIONAL.test(q)) return "navigational";
  if (INTENT_PATTERNS.LOCAL.test(q)) return "local";
  if (INTENT_PATTERNS.INFORMATIONAL.test(q)) return "informational";
  
  // Logic: Most searches in this app are navigational by default
  return q.split(/\s+/).length <= 2 ? "navigational" : "ambiguous";
};

/**
 * Stage 2: Entity Extraction
 */
const extractEntities = (query) => {
  const q = normalize(query);
  const entities = [];
  
  // Simple Room Number extraction (e.g. 504, LH1)
  const roomPattern = /([a-z]{2,3})?\d{1,3}/i;
  const roomMatch = q.match(roomPattern);
  if (roomMatch) {
    entities.push({ value: roomMatch[0], type: "place", confidence: 0.9 });
  }

  // Common titles for Faculty
  if (/(dr|mr|ms|prof)/i.test(q)) {
    entities.push({ value: q.replace(/(dr|mr|ms|prof)\.?\s+/i, ''), type: "person", confidence: 0.85 });
  }

  return entities;
};

/**
 * Stage 3: Ranking & Scoring System (100-pt Scale)
 */
const calculateScore = (query, item, context = {}) => {
  const q = normalize(query);
  const name = normalize(item.name);
  const tags = normalize(item.tags?.join(' ') || '');
  
  let scores = {
    relevance: 0,      // 0-40
    recency: 20,        // 0-20 (Defaulting high for static floor data)
    authority: 15,      // 0-20 (Rooms > generic tags)
    proximity: 0,       // 0-10 (Floor match)
    personalization: 5  // 0-10 (Session match)
  };

  // RELEVANCE (40 pts)
  if (name === q) scores.relevance = 40;
  else if (name.startsWith(q)) scores.relevance = 35;
  else if (name.includes(q)) scores.relevance = 25;
  else if (tags.includes(q)) scores.relevance = 20;

  // PROXIMITY (10 pts)
  if (context.currentFloor === item.floorKey) scores.proximity = 10;

  // AUTHORITY (20 pts)
  if (item.type === 'lab' || item.type === 'lecture_hall') scores.authority = 20;
  if (item.type === 'faculty') scores.authority = 18;

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  return { total, breakdown: scores };
};

/**
 * THE RESOLVER: Main entry point for search queries
 */
export const resolveNavigationQuery = (query, context = {}) => {
  if (!query || query.length < 1) return null;

  // PIPELINE START
  const intent = classifyIntent(query);
  const entities = extractEntities(query);
  
  // 1. Flatten all searchable items
  const pool = [];
  Object.entries(floorsData).forEach(([floorKey, floorInfo]) => {
    // Index Rooms
    floorInfo.rooms?.forEach(room => {
      pool.push({
        ...room,
        floorKey,
        floorLabel: floorInfo.label,
        searchable: `${room.name} ${room.faculty || ''} ${room.type} ${room.tags?.join(' ') || ''}`
      });
    });
    // Index Faculty
    floorInfo.faculty?.forEach(fac => {
      pool.push({
        id: fac.roomId,
        name: fac.name,
        type: 'faculty',
        floorKey,
        floorLabel: floorInfo.label,
        searchable: `${fac.name} ${fac.department || ''}`
      });
    });
  });

  // 2. Score and Sort
  const rankedResults = pool
    .map(item => {
      const scoreData = calculateScore(query, item, context);
      return {
        id: item.id,
        title: item.name,
        url: `/floor/${item.floorKey}?room=${item.id}${item.type === 'faculty' ? `&faculty=${encodeURIComponent(item.name)}` : ''}`,
        description: `${item.type.toUpperCase()} located on the ${item.floorLabel}. ${item.faculty ? `Assigned to ${item.faculty}.` : ''}`,
        intent_type: intent === 'ambiguous' ? 'navigational' : intent,
        confidence_score: scoreData.total,
        ranking_breakdown: scoreData.breakdown,
        source_freshness: "recent",
        category_tags: [item.type, item.floorKey],
        schema_version: SCHEMA_VERSION
      };
    })
    .filter(r => r.confidence_score > 20) // Initial noise filter
    .sort((a, b) => b.confidence_score - a.confidence_score);

  // 3. ZERO-RESULT & FALLBACK PROTOCOL
  if (rankedResults.length === 0 || rankedResults[0].confidence_score < CONFIDENCE_THRESHOLD) {
    // Fallback: Suggest refined query or show nearest matches
    return {
      title: "No high-confidence match found",
      url: null,
      description: "We couldn't find an exact match. Try searching for a specific room number or lecturer name.",
      intent_type: "informational",
      confidence_score: 0,
      ranking_breakdown: { relevance: 0, recency: 0, authority: 0, proximity: 0, personalization: 0 },
      source_freshness: "stale",
      category_tags: ["fallback"],
      alternatives: rankedResults.slice(0, 3), // Return up to 3 nearest matches
      schema_version: SCHEMA_VERSION
    };
  }

  // 4. Return Top Result with Alternatives
  const finalResult = { ...rankedResults[0] };
  finalResult.alternatives = rankedResults.slice(1, 4);
  
  return finalResult;
};
