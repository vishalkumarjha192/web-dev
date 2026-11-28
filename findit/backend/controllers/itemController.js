const Item = require('../models/Item');
const Claim = require('../models/Claim');
const httpError = require('../utils/httpError');
const { getKeywords, escapeRegex } = require('../utils/keywords');

const FIELDS = ['title', 'description', 'category', 'place', 'date', 'photoUrl'];
const pick = (body, keys) => Object.fromEntries(keys.filter((k) => body[k] !== undefined).map((k) => [k, body[k]]));

async function findItem(id) {
  const item = await Item.findById(id);
  if (!item) throw httpError(404, 'Item not found');
  return item;
}

exports.createItem = async (req, res) => {
  const item = await Item.create({ ...pick(req.body, ['type', ...FIELDS]), postedBy: req.user.id });
  res.status(201).json(item);
};

// Search and filter: ?type=&category=&place=&from=&to=&mine=true
exports.getItems = async (req, res) => {
  const { type, category, place, from, to, mine } = req.query;
  const filter = {};
  if (type) filter.type = String(type);
  if (category) filter.category = String(category);
  if (place) filter.place = new RegExp(escapeRegex(String(place)), 'i');
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(`${to}T23:59:59.999Z`);
  }
  if (mine === 'true') filter.postedBy = req.user.id;
  const items = await Item.find(filter).populate('postedBy', 'name').sort({ date: -1, createdAt: -1 }).limit(100);
  res.json(items);
};

exports.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id).populate('postedBy', 'name email');
  if (!item) throw httpError(404, 'Item not found');
  res.json(item);
};

exports.updateItem = async (req, res) => {
  const item = await findItem(req.params.id);
  if (!item.postedBy.equals(req.user.id)) throw httpError(403, 'You can edit only your own post');
  item.set(pick(req.body, FIELDS));
  await item.save();
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await findItem(req.params.id);
  if (!item.postedBy.equals(req.user.id)) throw httpError(403, 'You can delete only your own post');
  await Claim.deleteMany({ item: item._id });
  await item.deleteOne();
  res.json({ message: 'Item deleted' });
};

// UNIQUE TWIST: same category + similar title keyword + date within 7 days
exports.getMatches = async (req, res) => {
  const lost = await findItem(req.params.id);
  if (lost.type !== 'lost') throw httpError(400, 'Matches are available only for lost items');
  const words = getKeywords(lost.title);
  if (!words.length) return res.json([]);
  const week = 7 * 24 * 60 * 60 * 1000;
  const matches = await Item.find({
    type: 'found',
    status: 'open',
    category: lost.category,
    date: { $gte: new Date(lost.date.getTime() - week), $lte: new Date(lost.date.getTime() + week) },
    title: { $regex: `\\b(${words.map(escapeRegex).join('|')})`, $options: 'i' }
  }).populate('postedBy', 'name').sort({ date: -1 });
  res.json(matches);
};
