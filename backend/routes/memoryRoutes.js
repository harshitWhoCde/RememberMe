const express = require('express');
const router = express.Router();

// Import the placeholder functions from our controller
const { addMemory, askQuestion, getMemories } = require('../controllers/memoryController');

// Define the routes and link them to the controllers
router.post('/memory', addMemory);
router.post('/ask', askQuestion);
router.get('/memories', getMemories);

module.exports = router;