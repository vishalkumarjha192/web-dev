const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'] },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshTokenHash: { type: String, select: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
