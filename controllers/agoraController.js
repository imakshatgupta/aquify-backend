const User = require("../models/userModel.js");
const agoraModel = require('../models/agoraModel.js');
const notificationModel = require("../models/notificationModel.js");
require("dotenv").config();


const createMeeting = async (req, res) => {
    const { channelName, otherId } = req.body;
    const uid = req.user.id;
    const meeting = await agoraModel.findOne({ channelName: channelName })
    if (meeting) {
        if (meeting.channelCreator == uid || meeting.channelCreator == otherId)
            return res.status(200).json({ meeting: meeting })
        else
            return res.status(400).json({ message: "Meeting doesn't exist!" });
    }
    else {
        return res.status(400).json({ message: "Meeting doesn't exist!" });
    }
}

const getMeetingDetails = async (req, res) => {
    const { channelName } = req.params;
    const meeting = await agoraModel.findOne({ channelName: channelName });
    if (meeting) {
        res.json({ status: 200, meeting: meeting });
    } else {
        res.status(404).json({ message: "Meeting not found" });
    }
}

const getAllMeetingsForUser = async (req, res) => {
    const { id } = req.user;
    const meetings = await agoraModel.find({ $or: { channelMember: id, channelCreator: id } });
    if (meetings) {
        res.json({ status: 200, meetings: meetings });
    } else {
        res.status(404).json({ message: "No meetings found" });
    }
}

const scheduleRequest = async (req, res) => {
    const user = req.body.user;
    const time = req.body.time;
    const listing = req.body.listing;

    const userData = await User.findById(req.user.id);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    const newNotification = await new notificationModel({
        user: user,
        message: "You have a meeting request from " + userData.fName + " " + userData.lName + " for your listing" + listing + " at " + time + ".",
    });

    await newNotification.save();
    res.status(200).json({ message: "Notification sent" });
}

const acceptRequest = async (req, res) => {
    const { channelName, otherId, time } = req.body;
    const uid = req.user.id;
    const meeting = await agoraModel.findOne({ channelName: channelName })
    if (meeting) {
        return res.json({ meeting });
    }
    else {
        const newMeeting = await new agoraModel({
            channelName: channelName,
            channelCreator: uid,
            channelMember: otherId,
            channelCreatedAt: Date.now(),
            channelActiveTime: time
        });

        await newMeeting.save();

        const user1 = await User.findById(uid);
        const user2 = await User.findById(otherId);

        const notification1 = await new notificationModel({
            user: uid,
            message: "Your meeting with " + user2.fName + " " + user2.lName + " has been scheduled for " + time + ".",
            link: "https://acqify.co/#/call/" + channelName,
        })

        const notification2 = await new notificationModel({
            user: otherId,
            message: "Your meeting with " + user1.fName + " " + user1.lName + " has been scheduled for " + time + ".",
            link: "https://acqify.co/#/call/" + channelName,
        })

        await notification1.save();
        await notification2.save();

        res.json({ status: 200 });
    }
}

const rejectRequest = async (req, res) => {
    const { userId, time } = req.body;

    const userData = await User.findById(req.user.id);

    const notification = await new notificationModel({
        user: userId,
        message: userData.fName + " " + userData.lName + " is unavailable for the meeting you requested. The alternate propose time is: " + time + ".",
    });

    await notification.save();
    res.status(200).json({ message: "Notification sent" });
}

module.exports = { getMeetingDetails, getAllMeetingsForUser, createMeeting, scheduleRequest, acceptRequest, rejectRequest };
