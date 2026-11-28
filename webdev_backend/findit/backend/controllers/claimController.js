const Item = require('../models/Item');
const Claim = require('../models/Claim');
const httpError = require('../utils/httpError');

// Claim a found item
exports.createClaim = async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) throw httpError(404, 'Item not found');
  if (item.type !== 'found') throw httpError(400, 'Only found items can be claimed');
  if (item.status !== 'open') throw httpError(400, 'Item is already claimed');
  if (item.postedBy.equals(req.user.id)) throw httpError(400, 'You cannot claim your own post');
  const claim = await Claim.create({ item: item._id, claimant: req.user.id, message: req.body.message });
  res.status(201).json(claim);
};

exports.myClaims = async (req, res) => {
  res.json(await Claim.find({ claimant: req.user.id }).populate('item', 'title status').sort({ createdAt: -1 }));
};

// Only the finder can see claims on their item
exports.itemClaims = async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) throw httpError(404, 'Item not found');
  if (!item.postedBy.equals(req.user.id)) throw httpError(403, 'Only the finder can view claims');
  res.json(await Claim.find({ item: item._id }).populate('claimant', 'name email'));
};

// Finder approves or rejects: { "status": "approved" | "rejected" }
exports.decideClaim = async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) throw httpError(400, 'Status must be approved or rejected');
  const claim = await Claim.findById(req.params.id).populate('item');
  if (!claim || !claim.item) throw httpError(404, 'Claim not found');
  if (!claim.item.postedBy.equals(req.user.id)) throw httpError(403, 'Only the finder can decide');
  if (claim.status !== 'pending') throw httpError(400, 'Claim already decided');

  if (status === 'approved') {
    // Atomic check so that only one claim can ever be approved
    const updated = await Item.findOneAndUpdate({ _id: claim.item._id, status: 'open' }, { status: 'claimed' });
    if (!updated) throw httpError(400, 'Item is already claimed');
    await Claim.updateMany({ item: claim.item._id, _id: { $ne: claim._id }, status: 'pending' }, { status: 'rejected' });
  }
  claim.status = status;
  await claim.save();
  res.json({ message: `Claim ${status}` });
};
