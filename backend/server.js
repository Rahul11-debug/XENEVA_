require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/artifacts', require('./routes/artifactRoutes'));
app.use('/api/planets',   require('./routes/planetRoutes'));
app.use('/api/quiz',      require('./routes/quizRoutes'));

try { app.use('/api/leaderboard', require('./routes/leaderboardRoutes')); } catch(e) { console.warn('leaderboardRoutes not found'); }
try { app.use('/api/admin',       require('./routes/adminRoutes'));       } catch(e) { console.warn('adminRoutes not found'); }

app.get('/api/health', (req, res) =>
  res.json({ status: 'Xenova Archive API running 🚀', timestamp: new Date().toISOString() })
);

app.use('*', (req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found` }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Xenova Archive Server running on port ${PORT}`));
