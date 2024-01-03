const mongoose = require("mongoose");

const agoraSchema = new mongoose.Schema({
    channelName: {
        type: String,
        unique: true,
    },
    channelToken: {
        type: String,
    },
    channelCreator: {
        type: mongoose.Schema.Types.ObjectId,
    },
    channelMember: {
        type: mongoose.Schema.Types.ObjectId,
    },
    channelCreatedAt: {
        type: Date,
        default: Date.now(),
    },
    channelActiveTime: {
        type: Date,
    },
});

module.exports = new mongoose.model("agoraChannels", agoraSchema);