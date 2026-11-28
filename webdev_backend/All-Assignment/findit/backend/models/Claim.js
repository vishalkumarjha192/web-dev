const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  claimant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: [true, 'Proof message is required'], trim: true, minlength: 5, maxlength: 300 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

// One user can claim an item only once
claimSchema.index({ item: 1, claimant: 1 }, { unique: true });

module.exports = mongoose.model('Claim', claimSchema);
