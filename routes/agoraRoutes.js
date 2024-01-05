const express = require("express");
const router = express.Router();
const { getMeetingDetails, getAllMeetingsForUser, createMeeting, scheduleRequest, acceptRequest,rescheduleRequest , rejectRequest, getNotifications } = require("../controllers/agoraController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/meeting/:channelName", authMiddleware, getMeetingDetails);
router.get("/meetings", authMiddleware, getAllMeetingsForUser);
router.post("/create", authMiddleware, createMeeting);
router.post("/schedule", authMiddleware, scheduleRequest);
router.post("/accept", authMiddleware, acceptRequest);
router.post("/reschedule", authMiddleware, rescheduleRequest);
router.post("/reject", authMiddleware, rejectRequest);
router.get("/notifications", getNotifications);

module.exports = router;