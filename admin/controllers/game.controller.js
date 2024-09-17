const Game = require('../models/game.model');

// Get all games
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const { title, slug, descriptions, link } = req.body;
    // Check if the file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const image = req.file.path;
    const newGame = new Game({ title, image, descriptions, link, slug });
    console.log("newGame",newGame)
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a game
exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, descriptions, link, slug } = req.body;
  // Check if an image file is provided
  let updateFields = { title, descriptions, link, slug };

  if (req.file) {
    const image = req.file.path;
    updateFields.image = image;  // Only add the image field if a new file is provided
  }
  console.log("updateFields",updateFields)
  try {
    const updatedGame = await Game.findByIdAndUpdate(id, updateFields, { new: true });
    console.log("updatedGame",updatedGame)
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a game
exports.deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    await Game.findByIdAndDelete(id);
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get game by ID
exports.getGameById = async (req, res) => {
  const { slug } = req.params;
console.log("slug",slug)
  try {
    const game = await Game.findOne({slug : slug});
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};