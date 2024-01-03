const express = require("express");
const router = express.Router();
const { getMeetingDetails, getAllMeetingsForUser, createMeeting, scheduleRequest, acceptRequest, rejectRequest } = require("../controllers/agoraController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/meeting/:channelName", authMiddleware, getMeetingDetails);
router.get("/meetings", authMiddleware, getAllMeetingsForUser);
router.post("/create", authMiddleware, createMeeting);
router.post("/schedule", authMiddleware, scheduleRequest);
router.post("/accept", authMiddleware, acceptRequest);
router.post("/reject", authMiddleware, rejectRequest);

module.exports = router;