const User = require("../models/userModel.js");
const agoraModel = require('../models/agoraModel.js');
require("dotenv").config();


const createMeeting = async (req, res) => {
    const { channelName, otherId } = req.body;
    const uid = req.user.id;
    const meeting = await agoraModel.findOne({ channelName: channelName })
    if (meeting) {
        return res.json({ meeting });
    }
    else {
        const newMeeting = new agoraModel({
            channelName: channelName,
            channelCreator: uid,
            channelMember: otherId,
            channelCreatedAt: Date.now(),
        });

        newMeeting.save();
        res.json({ meeting: newMeeting });
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

module.exports = { getMeetingDetails, getAllMeetingsForUser, createMeeting };
