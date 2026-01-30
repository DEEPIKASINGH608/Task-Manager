require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // <--- ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ Connection Error:', err));

// 2. API Routes
// This line connects your frontend calls to your route logic
app.use('/api/tasks', taskRoutes); 

// 3. Health Check Route
app.get('/', (req, res) => {
  res.send('Backend is running and healthy!');
});

// 4. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});









