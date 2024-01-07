const express = require ("express");
const {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
  getUser,
  getAllUsers,
  checkUser,
  payment,
  feedback,
  getFeedback
} = require("../controllers/userController.js");

const {authMiddleware} = require("../middleware/authMiddleware.js")
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/checkUser").get(checkUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/updatePassword").post(authMiddleware, updatePassword);
router.route("/updateProfile").post(authMiddleware, updateProfile);
router.route("/payment").post(payment);
router.route("/feedback").post(feedback);
router.route("/getFeedback").get(getFeedback);


module.exports=router;