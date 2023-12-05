const Proof = require("../models/proofofFundModel.js");
const  User = require ("../models/userModel.js");
const  jwt = require('jsonwebtoken');
require('dotenv').config();

const addProofOfFund = async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id)
      const {businessName,projectName,location,proofImage1,proofImage2 } = req.body;
      
      const existingProof = await Proof.findOne({
        ownerId: user.id,
        businessName: businessName,
        projectName: projectName,
        location: location
      });

      if (existingProof) {
        existingProof.businessName = businessName;
        existingProof.projectName = projectName;
        existingProof.location = location;
        existingProof.proofImage1 = proofImage1;
        existingProof.proofImage2 = proofImage2;

        await existingProof.save();
        res.send({ message: 'Proof of fund data updated successfully!' });
      } else {

        const newProof = new Proof({
          ownerName: user.username,
          ownerId: user.id,
          ownerEmail: user.userEmail,
          businessName: businessName,
          projectName: projectName,
          location: location,
          proofImage1: proofImage1,
          proofImage2: proofImage2
        });

        await newProof.save();
        res.send({ message: 'Proof of fund data saved successfully!' });
      }
  } catch (err) {
    console.error('Error uploading file and updating database: ', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports={addProofOfFund};