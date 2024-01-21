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
    const buyerId = req.user.id;
    const userData = await User.findById(req.user.id);
    const user2 = await User.findById(user);

    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    const newNotification = await new notificationModel({
        user: user,
        buyerId: buyerId,
        button: true,
        time: time,
        message: "You have a meeting request from " + userData.firstName + " " + userData.lastName + " for your listing " + listing + " at " + time + ".",
    });

    await newNotification.save();
    res.status(200).json({
        message: "Notification sent",
        firstName: userData.firstName,
        lastName: userData.lastName,
        time: time,
        email: user2.email,
    });
}

const chatScheduleRequest = async (req, res) => {
    const user1 = await User.findById(req.body.user1);
    const user2 = await User.findById(req.body.user2);

    return res.json({ status: 200 ,
        firstName1: user1.firstName,
        lastName1: user1.lastName,
        email1: user1.email,
        firstName2: user2.firstName,
        lastName2: user2.lastName,
        email2: user2.email});
}

const acceptRequest = async (req, res) => {
    const { channelName, otherId, notificationId , time } = req.body;
    const uid = req.user.id;
    const meeting = await agoraModel.findOne({ channelName: channelName })
    const user1 = await User.findById(uid);
    const user2 = await User.findById(otherId);

    if (meeting) {
        const notification1 = await new notificationModel({
            user: uid,
            message: "Your meeting with " + user2.firstName + " " + user2.lastName + " has been scheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })

        const notification2 = await new notificationModel({
            user: otherId,
            message: "Your meeting with " + user1.firstName + " " + user1.lastName + " has been scheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })

        await notificationModel.findByIdAndDelete(notificationId);

        await notification1.save();
        await notification2.save();
        return res.json({ status: 200 ,
            firstName1: user1.firstName,
            lastName1: user1.lastName,
            email1: user1.email,
            firstName2: user2.firstName,
            lastName2: user2.lastName,
            email2: user2.email,
            time: time,
            channelName: channelName});
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


        const notification1 = await new notificationModel({
            user: uid,
            message: "Your meeting with " + user2.firstName + " " + user2.lastName + " has been scheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })

        const notification2 = await new notificationModel({
            user: otherId,
            message: "Your meeting with " + user1.firstName + " " + user1.lastName + " has been scheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })

        await notificationModel.findByIdAndDelete(notificationId);

        await notification1.save();
        await notification2.save();

        return res.json({ status: 200 ,
            firstName1: user1.firstName,
            lastName1: user1.lastName,
            email1: user1.email,
            firstName2: user2.firstName,
            lastName2: user2.lastName,
            email2: user2.email,
            time: time,
            channelName: channelName});
    }
}


const rescheduleRequest = async (req, res) => {
    const { user, otherId, notificationId , time , channelName } = req.body;
   
    const user1 = await User.findById(user);
    const user2 = await User.findById(otherId);
    const meeting = await agoraModel.findOne({ channelName: channelName })

    if (meeting) {
        const notification1 = await new notificationModel({
            user: user,
            message: "Your meeting with " + user2.firstName + " " + user2.lastName + " has been rescheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })
    
        const notification2 = await new notificationModel({
            user: otherId,
            message: "Your meeting with " + user1.firstName + " " + user1.lastName + " has been rescheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
        })
    
        await notificationModel.findByIdAndDelete(notificationId);
        await notification1.save();
        await notification2.save();
        return res.json({ status: 200 ,
            firstName1: user1.firstName,
            lastName1: user1.lastName,
            email1: user1.email,
            firstName2: user2.firstName,
            lastName2: user2.lastName,
            email2: user2.email,
            time: time,
            channelName: channelName});
    }

else{

    const notification1 = await new notificationModel({
        user: user,
        message: "Your meeting with " + user2.firstName + " " + user2.lastName + " has been rescheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
    })

    const notification2 = await new notificationModel({
        user: otherId,
        message: "Your meeting with " + user1.firstName + " " + user1.lastName + " has been rescheduled for " + time + ". link: https://acqify.co/#/call/" + channelName,
    })

    await notificationModel.findByIdAndDelete(notificationId);

    await notification1.save();
    await notification2.save();
    return res.json({ status: 200 });
}
}


const rejectRequest = async (req, res) => {
    const notificationId = req.body.notificationId;
    const buyerId = req.body.buyerId;

    const userData = await User.findById(req.user.id);
  
    await notificationModel.findByIdAndDelete(notificationId);

    const notification = await new notificationModel({
        user: buyerId,
        message: userData.firstName + " " + userData.lastName + " is unavailable for the meeting you requested.",
    });

    await notification.save();
    res.status(200).json({ message: "Notification sent" });
}

const getNotifications = async (req, res) => {
    console.log(req.query.user);
    const notifications = await notificationModel.find({ user: req.query.user });
    res.json({ status: 200, notifications: notifications });
}

const getNotificationsTrue = async (req, res) => {
    try {
      await notificationModel.updateMany({}, { $set: { read: true } });
      const updatedNotifications = await notificationModel.find({});
      res.json({ status: 200, notifications: updatedNotifications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
  }
  

module.exports = { getMeetingDetails, getAllMeetingsForUser, createMeeting, scheduleRequest,chatScheduleRequest, acceptRequest,rescheduleRequest, rejectRequest, getNotifications , getNotificationsTrue };
