const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const httpError = require('../utils/httpError');

const hash = (token) => crypto.createHash('sha256').update(token).digest('hex');

// Creates both tokens and saves a hash of the refresh token
async function sendTokens(res, user, status = 200) {
  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, jti: crypto.randomUUID() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  await User.updateOne({ _id: user._id }, { refreshTokenHash: hash(refreshToken) });
  res.status(status).json({
    accessToken, refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof password !== 'string' || password.length < 6) throw httpError(400, 'Password must be at least 6 characters');
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) }); // role is always "user"
  await sendTokens(res, user, 201);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') throw httpError(400, 'Email and password are required');
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) throw httpError(401, 'Wrong email or password');
  await sendTokens(res, user);
};

exports.refresh = async (req, res) => {
  let payload;
  try {
    payload = jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw httpError(401, 'Invalid refresh token');
  }
  const user = await User.findById(payload.id).select('+refreshTokenHash');
  if (!user || user.refreshTokenHash !== hash(req.body.refreshToken)) throw httpError(401, 'Invalid refresh token');
  await sendTokens(res, user);
};

exports.logout = async (req, res) => {
  await User.updateOne({ _id: req.user.id }, { $unset: { refreshTokenHash: 1 } });
  res.json({ message: 'Logged out' });
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw httpError(404, 'User not found');
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};
