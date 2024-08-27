const express = require('express');
const { getGames, createGame, updateGame, deleteGame, getGameById } = require('../controllers/game.controller');

const router = express.Router();

router.get('/games', getGames);
router.post('/games', createGame);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);
router.get('/games/:id', getGameById);
module.exports = router;
