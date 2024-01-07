const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { getChat, usersWithChat, getAllChats } = require('../controllers/chatController.js');


router.get('/get-chat/:userId', authMiddleware, getChat);
router.get('/all', authMiddleware, usersWithChat);
router.get('/allChats', getAllChats);

module.exports = router;