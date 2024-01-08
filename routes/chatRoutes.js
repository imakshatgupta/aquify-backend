const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { getChat, usersWithChat, getAllChats, getAdminChat } = require('../controllers/chatController.js');


router.get('/get-chat/:userId', authMiddleware, getChat);
router.get('/getchat/:userId', getAdminChat);
router.get('/all', authMiddleware, usersWithChat);
router.get('/allChats', getAllChats);


module.exports = router;