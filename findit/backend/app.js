const express = require('express');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => { req.body = req.body || {}; next(); });

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(notFound);
app.use(errorHandler);
module.exports = app;
