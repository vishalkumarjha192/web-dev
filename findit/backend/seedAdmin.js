// Creates (or promotes) the admin account using values from .env
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');

(async () => {
  await connectDB();
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  await User.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase() },
    { name: 'Security Admin', password: await bcrypt.hash(ADMIN_PASSWORD, 10), role: 'admin' },
    { upsert: true, runValidators: true }
  );
  console.log('Admin ready:', ADMIN_EMAIL);
  await mongoose.disconnect();
})().catch((err) => { console.error(err.message); process.exit(1); });
