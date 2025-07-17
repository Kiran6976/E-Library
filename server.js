const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes); // ✅ This must match your frontend call


