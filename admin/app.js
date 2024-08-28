const express = require('express');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/game.routes');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, 'dist')));
// Routes
app.use('/api', gameRoutes);


// Fallback for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
