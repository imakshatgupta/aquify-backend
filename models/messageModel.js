const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDatas",
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDatas",
    },
    message: String,
}, {
    timestamps: true,
});

module.exports = new mongoose.model("userMessages", messageSchema);