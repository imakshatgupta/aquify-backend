const mongoose = require("mongoose");

const advisorySchema = new mongoose.Schema({
    ownerName: {
        type: String,
    },
    ownerImage: {
        type: String,
    },
    category: String,
    techStack1: String,
    techStack2: String,
    techStack3: String,
    techStack4: String,
    shortBio: String,
    dealSize: String,
    location: String,
    acquisitionType: String,
    valuation: String,
});

module.exports = new mongoose.model("advisoryDatas", advisorySchema);
