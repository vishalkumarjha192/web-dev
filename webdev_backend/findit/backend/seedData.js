// Adds demo users and lost/found items. Safe to run more than once.
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');

const USERS = [
  { name: 'Aman Sharma', email: 'aman@findit.com' },
  { name: 'Priya Verma', email: 'priya@findit.com' }
];
const PASSWORD = 'Student@123';

// Pictures are in frontend/public/images and served by the frontend
const IMAGE_BASE = process.env.IMAGE_BASE || 'http://localhost:5173/images';

// [type, user index, title, category, place, date, description, image]
const ITEMS = [
  ['lost', 0, 'Black Dell laptop charger', 'Electronics', 'Library', '2026-11-20', '65W charger with a white tag on the cable', 'dell-charger-1'],
  ['found', 1, 'Dell charger', 'Electronics', 'Computer Lab 2', '2026-11-21', 'Black charger left near the last desk', 'dell-charger-2'],
  ['lost', 1, 'Blue water bottle', 'Other', 'Canteen', '2026-11-18', 'Steel bottle with a sticker', 'bottle-1'],
  ['found', 0, 'Steel water bottle', 'Other', 'Canteen', '2026-11-19', 'Blue bottle found on a table', 'bottle-2'],
  ['lost', 0, 'College ID card', 'ID Card', 'Main Gate', '2026-11-23', 'ID card in a transparent holder', 'id-1'],
  ['found', 1, 'Student ID card', 'ID Card', 'Parking Area', '2026-11-24', 'Show your roll number to claim', 'id-2'],
  ['lost', 1, 'Bike keys with red keychain', 'Keys', 'Parking Area', '2026-11-25', 'Two keys on one ring', 'keys-1'],
  ['found', 0, 'Keys with keychain', 'Keys', 'Block B', '2026-11-26', 'Small bunch of keys', 'keys-2'],
  ['lost', 0, 'Data Structures notebook', 'Books', 'Room 204', '2026-11-16', 'Spiral notebook with handwritten notes', 'notebook'],
  ['found', 1, 'Mathematics textbook', 'Books', 'Library', '2026-11-17', 'Engineering maths book', 'textbook'],
  ['lost', 1, 'Grey hoodie', 'Clothing', 'Sports Ground', '2026-11-12', 'Medium size', 'hoodie'],
  ['found', 0, 'Black backpack', 'Bags', 'Auditorium', '2026-11-22', 'Has a pencil pouch inside', 'backpack'],
  ['found', 1, 'Wrist watch', 'Accessories', 'Washroom, Block A', '2026-11-27', 'Silver strap', 'watch'],
  ['lost', 0, 'Wireless earbuds case', 'Electronics', 'Seminar Hall', '2026-11-26', 'White charging case', 'earbuds']
];

(async () => {
  await connectDB();
  const password = await bcrypt.hash(PASSWORD, 10);
  const users = [];
  for (const u of USERS) {
    users.push(await User.findOneAndUpdate(
      { email: u.email },
      { $setOnInsert: { ...u, password } },
      { upsert: true, new: true }
    ));
  }
  let added = 0;
  for (const [type, who, title, category, place, date, description, image] of ITEMS) {
    const postedBy = users[who]._id;
    const photoUrl = `${IMAGE_BASE}/${image}.svg`;
    const existing = await Item.findOne({ type, title, postedBy });
    if (existing) {
      if (!existing.photoUrl) await Item.updateOne({ _id: existing._id }, { photoUrl });
      continue;
    }
    await Item.create({ type, title, category, place, date, description, photoUrl, postedBy });
    added++;
  }
  console.log(`Sample data ready: ${added} new items`);
  console.log(`Login: ${USERS.map((u) => u.email).join(' or ')} / ${PASSWORD}`);
  await mongoose.disconnect();
})().catch((err) => { console.error(err.message); process.exit(1); });
