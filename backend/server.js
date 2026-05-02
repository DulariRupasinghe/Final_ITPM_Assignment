const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Serve static files (uploads)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Manual CORS implementation since package might be missing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/admissions', require('./routes/admissionRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));
const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api/attendance', attendanceRoutes);
const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedback', feedbackRoutes);
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'University Management System API connected to MongoDB' });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 ========================================`);
  console.log(`✅ EXPLICIT MONGODB EXPRESS SERVER RUNNING`);
  console.log(`✅ PORT: ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});
