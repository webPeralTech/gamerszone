const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  descriptions: { type: String, required: true },
  link: { type: String, required: true },
  slug: { type: String, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
