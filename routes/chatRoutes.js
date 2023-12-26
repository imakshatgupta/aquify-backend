const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { getChat, usersWithChat } = require('../controllers/chatController.js');

router.get('/get-chat/:userId', authMiddleware, getChat);
router.get('/all', authMiddleware, usersWithChat);

module.exports = router;