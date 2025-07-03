const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const isAdmin = require('./routes/adminRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', isAdmin);


app.get('/', (req, res) => res.send("API is running....."));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB is connected.");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));