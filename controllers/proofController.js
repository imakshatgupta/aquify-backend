const Proof = require("../models/proofofFundModel.js");
const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addProofOfFund = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    // Check if proof of fund already exists for the user
    const existingProof = await Proof.findOne({ ownerId: user._id });

    if (existingProof) {
      return res.send({ message: 'Proof of fund already added' });
    }

    const newProof = new Proof({
      ownerName: user.userName,
      ownerId: user._id,
      ownerEmail: user.email,
      businessName: req.body.formData.businessName,
      projectName: req.body.formData.projectName,
      location: req.body.formData.location,
      document: req.body.formData.document,
    });

    await newProof.save();
    res.send({ message: 'Proof of fund data saved successfully!' });

  } catch (err) {
    console.error('Error uploading file and updating database: ', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = { addProofOfFund };
