const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);

mongoose.connect('mongodb://localhost:27017/skilllink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((err) => console.error('MongoDB connection error:', err));