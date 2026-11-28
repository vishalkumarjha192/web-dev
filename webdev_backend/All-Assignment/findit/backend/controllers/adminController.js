const Item = require('../models/Item');
const Claim = require('../models/Claim');
const httpError = require('../utils/httpError');

// Report using an aggregation pipeline: counts per category
exports.report = async (req, res) => {
  const count = (field, value) => ({ $sum: { $cond: [{ $eq: [field, value] }, 1, 0] } });
  const report = await Item.aggregate([
    { $group: {
      _id: '$category',
      total: { $sum: 1 },
      lost: count('$type', 'lost'),
      found: count('$type', 'found'),
      claimed: count('$status', 'claimed')
    } },
    { $sort: { total: -1, _id: 1 } },
    { $project: { _id: 0, category: '$_id', total: 1, lost: 1, found: 1, claimed: 1 } }
  ]);
  res.json(report);
};

// Admin removes a fake post
exports.removeItem = async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) throw httpError(404, 'Item not found');
  await Claim.deleteMany({ item: item._id });
  res.json({ message: 'Fake post removed' });
};
