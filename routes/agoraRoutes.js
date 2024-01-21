const express = require("express");
const router = express.Router();
const { getMeetingDetails, getAllMeetingsForUser, createMeeting, scheduleRequest,chatScheduleRequest, acceptRequest,rescheduleRequest , rejectRequest, getNotifications, getNotificationsTrue } = require("../controllers/agoraController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/meeting/:channelName", authMiddleware, getMeetingDetails);
router.get("/meetings", authMiddleware, getAllMeetingsForUser);
router.post("/create", authMiddleware, createMeeting);
router.post("/schedule", authMiddleware, scheduleRequest);
router.post("/chatSchedule", chatScheduleRequest);
router.post("/accept", authMiddleware, acceptRequest);
router.post("/reschedule", authMiddleware, rescheduleRequest);
router.post("/reject", authMiddleware, rejectRequest);
router.get("/notifications", getNotifications);
router.get("/notificationsTrue", getNotificationsTrue);

module.exports = router;