const express = require ("express");
const {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
  getUser,
  checkUser
} = require("../controllers/userController.js");

const {authMiddleware} = require("../middleware/authMiddleware.js")
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/checkUser").get(checkUser);
router.route("/updatePassword").post(authMiddleware, updatePassword);
router.route("/updateProfile").post(authMiddleware, updateProfile);

module.exports=router;