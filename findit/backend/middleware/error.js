// Centralised error handling
exports.notFound = (req, res) => res.status(404).json({ message: `Route not found: ${req.originalUrl}` });

exports.errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;
  if (err.name === 'ValidationError') status = 400;
  if (err.name === 'CastError') { status = 400; message = `Invalid ${err.path}`; }
  if (err.code === 11000) { status = 409; message = `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`; }
  if (status === 500) { console.error(err); message = 'Server error'; }
  res.status(status).json({ message });
};
