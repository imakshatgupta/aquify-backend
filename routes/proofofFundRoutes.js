const express = require ("express");
const {
  addProofOfFund
} = require("../controllers/proofController.js");

const router = express.Router();

router.route("/addProof").post(addProofOfFund);

module.exports=router;