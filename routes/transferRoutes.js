const express = require ("express");
const {
  addTransfer
} = require("../controllers/transferController.js");

const router = express.Router();

router.route("/addTransfer").post(addTransfer);

module.exports=router;