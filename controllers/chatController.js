const User = require("../models/userModel.js");
const Message = require("../models/messageModel.js");
const contactModel = require("../models/contactModel.js");

const getChat = async (req, res) => {
    const { userId } = req.params;
    const ourUserId = req.user.id;

    const messages = await Message.find({
        $or: [
            { sender: ourUserId, reciever: userId },
            { sender: userId, reciever: ourUserId },
        ],
    }).sort({ createdAt: 1 });
    res.json(messages);
}

const getAdminChat = async (req, res) => {
    const { userId } = req.params;
    const ourUserId = req.query.id;
    console.log(userId, ourUserId);

    const messages = await Message.find({
        $or: [
            { sender: ourUserId, reciever: userId },
            { sender: userId, reciever: ourUserId },
        ],
    }).sort({ createdAt: 1 });
    res.json(messages);
}

const usersWithChat = async (req, res) => {
    const ourUserId = req.user.id;
    const messages = await Message.find(
        { $or: [{ sender: ourUserId }, { reciever: ourUserId }] },
        { sender: 1, reciever: 1 }
    );
    const userIds = await messages.map((message) => {
        if (message.sender == ourUserId) {
            return message.reciever;
        } else {
            return message.sender;
        }
    });
    const users = await User.find({ _id: { $in: userIds } }, { userName: 1, firstName: 1, lastName: 1, _id: 1, pic: 1 });
    res.json(users);
}

const getAllChats = async (req, res) => {
    const ourUserId = req.query.id;
    const messages = await Message.find(
        { $or: [{ sender: ourUserId }, { reciever: ourUserId }] },
        { sender: 1, reciever: 1 }
    );
    const userIds = await messages.map((message) => {
        if (message.sender == ourUserId) {
            return message.reciever;
        } else {
            return message.sender;
        }
    });
    const users = await User.find({ _id: { $in: userIds } }, { userName: 1, firstName: 1, lastName: 1, _id: 1, pic: 1 });
    res.json(users);
}


module.exports = { getChat, usersWithChat , getAllChats, getAdminChat };
