const router = require('express').Router();
const c = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(c.getItems).post(c.createItem);
router.get('/:id/matches', c.getMatches);
router.route('/:id').get(c.getItem).put(c.updateItem).delete(c.deleteItem);
module.exports = router;
