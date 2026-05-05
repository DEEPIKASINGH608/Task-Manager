require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ Connection Error:', err));

<<<<<<< HEAD
app.use('/api/tasks', taskRoutes);
=======

app.use('/api/tasks', taskRoutes);
>>>>>>> 30e7c9c42947a841cc97f84a6c9232ed6e71ff00


app.get('/', (req, res) => {
  res.send('Backend is running and healthy!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});









