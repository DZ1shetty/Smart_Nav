/**
 * SMART NAV - GLOBAL CONFIGURATION
 * 
 * This file manages asset paths and cloud settings.
 * To point to a different repository, just update the GITHUB_USER and GITHUB_REPO variables.
 */

// --- CONFIGURATION SETTINGS ---
const GITHUB_USER = "DZ1shetty";
const GITHUB_REPO = "Smart_Nav";
const GITHUB_BRANCH = "main";

// SET THIS TO 'true' to use GitHub as a Cloud CDN.
// SET THIS TO 'false' to use your local public/ folder.
export const IS_CLOUD = true;

// --- DYNAMIC BASE URL ---
export const IMG_BASE_URL = IS_CLOUD 
  ? `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/MJ/Major_Project/OLD_LOCAL_DATA/public-backup`
  : ""; // Empty string resolves to local root in Vite (e.g. /apj-block-images)

// --- FIREBASE CLIENT CONFIG (REQUIRED FOR STAGE 4) ---
// Please provide these values to enable real-time sync via onSnapshot.
export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "smart-nav-44e26.firebaseapp.com",
  projectId: "smart-nav-44e26",
  storageBucket: "smart-nav-44e26.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

console.log(`[SmartNav Config] Using ${IS_CLOUD ? 'CLOUD' : 'LOCAL'} image source: ${IMG_BASE_URL || 'Local public/'}`);
