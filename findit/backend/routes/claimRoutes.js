const router = require('express').Router();
const c = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/mine', c.myClaims);
router.route('/item/:itemId').get(c.itemClaims).post(c.createClaim);
router.patch('/:id', c.decideClaim);
module.exports = router;
