const mongoose = require("mongoose");

const notification = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    message: {
        type: String,
    },
    link: {
        type: String,
    },
    buyerId: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false,
    },
    time: {
        type: String,
    },
    button: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = new mongoose.model("notifications", notification);