const mongoose = require('mongoose');

const CATEGORIES = ['Electronics', 'ID Card', 'Books', 'Clothing', 'Keys', 'Bags', 'Accessories', 'Other'];

const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true, immutable: true },
  title: { type: String, required: [true, 'Title is required'], trim: true, minlength: 3, maxlength: 80 },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  category: { type: String, enum: CATEGORIES, required: [true, 'Category is required'] },
  place: { type: String, required: [true, 'Place is required'], trim: true, maxlength: 80 },
  date: { type: Date, required: [true, 'Date is required'],
    validate: { validator: (d) => d <= new Date(Date.now() + 86400000), message: 'Date cannot be in the future' } },
  photoUrl: { type: String, trim: true, default: '', match: [/^(https?:\/\/\S+|data:image\/jpeg;base64,[A-Za-z0-9+/=]+)?$/, 'Photo must be an uploaded image or an http URL'] },
  status: { type: String, enum: ['open', 'claimed'], default: 'open' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // relationship
}, { timestamps: true });

// Index used by search and match suggestions
itemSchema.index({ type: 1, category: 1, date: -1 });

itemSchema.statics.CATEGORIES = CATEGORIES;
module.exports = mongoose.model('Item', itemSchema);
