const express = require('express');
const router  = express.Router();
const { register, login, getMe, saveQuizScore, getScores } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register',   register);
router.post('/login',      login);
router.get ('/me',         protect, getMe);
router.post('/quiz-score', protect, saveQuizScore);
router.get ('/scores',     protect, getScores);

module.exports = router;
