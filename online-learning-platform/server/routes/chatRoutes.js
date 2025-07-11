const express = require('express');
const { getRecommendations } = require('../controllers/chatController');
const { protect, student } = require('../middleware/auth');

const router = express.Router();

router.post('/recommend', protect, student, getRecommendations);

module.exports = router;