const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const makeToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, adminSecret } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    if (await User.findOne({ email: email.toLowerCase() }))
      return res.status(400).json({ message: 'Email already registered' });

    if (await User.findOne({ username }))
      return res.status(400).json({ message: 'Username already taken' });

    let assignedRole = 'visitor';
    if (role === 'admin') {
      const secret = process.env.ADMIN_SECRET || 'xenova_admin_secret_2024';
      if (!adminSecret || adminSecret !== secret)
        return res.status(403).json({ message: 'Invalid admin secret key' });
      assignedRole = 'admin';
    }

    const user = await User.create({ username, email, password, role: assignedRole });

    res.status(201).json({
      _id: user._id, username: user.username,
      email: user.email, role: user.role,
      token: makeToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: 'No account with this email' });

    if (!(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Incorrect password' });

    res.json({
      _id: user._id, username: user.username,
      email: user.email, role: user.role,
      token: makeToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

exports.saveQuizScore = async (req, res) => {
  try {
    const { score, total, percentage, rank } = req.body;
    const user = await User.findById(req.user._id);
    user.quizScores.push({ score, total, percentage, rank, takenAt: new Date() });
    await user.save();
    res.json({ message: 'Score saved', quizScores: user.quizScores });
  } catch (err) {
    res.status(500).json({ message: 'Could not save score' });
  }
};

exports.getScores = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('username quizScores');
    res.json({ username: user.username, quizScores: user.quizScores });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch scores' });
  }
};
