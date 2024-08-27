const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  descriptions: [{ type: String }],
  link: { type: String, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
