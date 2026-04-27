import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data', 'layouts');
const LOG_FILE = path.join(__dirname, 'data', 'logs', 'layout_changes.log');

// Helper for atomic writes
function saveLayout(floorId, data) {
  const filePath = path.join(DATA_DIR, `${floorId}.json`);
  const tempPath = filePath + '.tmp';
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // write to temp file first
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
  // rename is atomic on all OS
  fs.renameSync(tempPath, filePath);
}

function logChange(floorId, action, data) {
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString();
  let logEntry = '';
  
  if (action === 'saved') {
    logEntry = `[${timestamp}] ${floorId} saved | rooms: ${data.rooms.length} | by: ${data.lastEditedBy}\n`;
  } else if (action === 'unlocked') {
    logEntry = `[${timestamp}] ${floorId} edited | unlocked by: ${data.user || 'admin'}\n`;
  }
  
  fs.appendFileSync(LOG_FILE, logEntry);
}

// Route 1: READ layout
app.get('/api/layout/:floorId', (req, res) => {
  const { floorId } = req.params;
  const filePath = path.join(DATA_DIR, `${floorId}.json`);

  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } else {
    res.json({ rooms: [], locked: false });
  }
});

// Route 2: WRITE layout (Save)
app.post('/api/layout/:floorId', (req, res) => {
  const { floorId } = req.params;
  const { rooms, lastEditedBy } = req.body;

  if (!Array.isArray(rooms)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const layoutData = {
    floorId,
    lastEdited: new Date().toISOString(),
    lastEditedBy: lastEditedBy || 'admin',
    locked: true,
    rooms
  };

  try {
    saveLayout(floorId, layoutData);
    logChange(floorId, 'saved', layoutData);
    res.json({ success: true });
  } catch (error) {
    console.error('Save failed:', error);
    res.status(500).json({ error: 'Failed to save layout' });
  }
});

// Route 3: UNLOCK layout
app.patch('/api/layout/:floorId/unlock', (req, res) => {
  const { floorId } = req.params;
  const filePath = path.join(DATA_DIR, `${floorId}.json`);

  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.locked = false;
      saveLayout(floorId, data);
      logChange(floorId, 'unlocked', { user: 'admin' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to unlock' });
    }
  } else {
    res.json({ success: true }); // No file to unlock, UI can just proceed
  }
});

app.listen(PORT, () => {
  console.log(`Layout server running at http://localhost:${PORT}`);
});
