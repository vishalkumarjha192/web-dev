const jwt = require('jsonwebtoken');
const httpError = require('../utils/httpError');

// Checks the access token sent as "Authorization: Bearer <token>"
exports.protect = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return next(httpError(401, 'Not logged in'));
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // { id, role }
    next();
  } catch {
    next(httpError(401, 'Invalid or expired token'));
  }
};

// Role-based access control
exports.authorize = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : next(httpError(403, 'Access denied'));
