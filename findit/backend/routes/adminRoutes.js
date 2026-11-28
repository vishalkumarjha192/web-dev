const router = require('express').Router();
const c = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin')); // RBAC
router.get('/report', c.report);
router.delete('/items/:id', c.removeItem);
module.exports = router;
