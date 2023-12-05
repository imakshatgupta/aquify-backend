const express = require ("express");
const {
  sendMessage,
} = require("../controllers/contactController.js");

const router = express.Router();

router.route("/send").post(sendMessage);

module.exports=router;