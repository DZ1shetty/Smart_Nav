import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import fs from 'fs';

// Load Service Account
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// 1. Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const layoutsRef = db.collection('layouts');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// 2. READ Route
app.get('/api/layout/:floorId', async (req, res) => {
  try {
    const { floorId } = req.params;
    // Map floorId (e.g., 'fifth') to document name (e.g., 'Fifth-Floor')
    const docName = floorId.charAt(0).toUpperCase() + floorId.slice(1) + "-Floor";

    const doc = await layoutsRef.doc(docName).get();

    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.json({ rooms: [], locked: false });
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. WRITE Route (Save)
app.post('/api/layout/:floorId', async (req, res) => {
  try {
    const { floorId } = req.params;
    const { rooms, lastEditedBy } = req.body;
    const docName = floorId.charAt(0).toUpperCase() + floorId.slice(1) + "-Floor";

    if (!Array.isArray(rooms)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const layoutData = {
      floorId,
      lastEdited: new Date().toISOString(),
      lastEditedBy: lastEditedBy || 'admin',
      locked: true,
      rooms // This already contains whatever is sent from the frontend (including the new image field)
    };

    await layoutsRef.doc(docName).set(layoutData);
    res.json({ success: true });
  } catch (error) {
    console.error('Save failed:', error);
    res.status(500).json({ error: 'Failed to save to Firestore' });
  }
});

// 4. UNLOCK Route
app.patch('/api/layout/:floorId/unlock', async (req, res) => {
  try {
    const { floorId } = req.params;
    const docName = floorId.charAt(0).toUpperCase() + floorId.slice(1) + "-Floor";
    
    await layoutsRef.doc(docName).update({ locked: false });
    res.json({ success: true });
  } catch (error) {
    console.error('Unlock failed:', error);
    res.status(500).json({ error: 'Failed to unlock' });
  }
});

app.listen(PORT, () => {
  console.log(`Firestore-backed server running at http://localhost:${PORT}`);
});
