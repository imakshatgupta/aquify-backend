const express = require("express");
const router = express.Router();
const { getMeetingDetails, getAllMeetingsForUser, createMeeting } = require("../controllers/agoraController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/meeting/:channelName", authMiddleware, getMeetingDetails);
router.get("/meetings", authMiddleware, getAllMeetingsForUser);
router.post("/create", authMiddleware, createMeeting);

module.exports = router;