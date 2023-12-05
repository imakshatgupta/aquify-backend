const Template = require("../models/templateModel.js");
const  User = require ("../models/userModel.js");
const  jwt = require('jsonwebtoken');
require('dotenv').config();

const addTemplate = async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id)
      const { websiteImage,websiteName,description,link,businessType,location,acquisitionType,amount } = req.body;
      
      const newTemplate = new Template({
        websiteImage:websiteImage,
        websiteName:websiteName,
        ownerName:user.username,
        ownerId:user.id,
        ownerEmail:user.userEmail,
        ownerImage:user.pic,
        description:description,
        link:link,
        businessType:businessType,
        location:location,
        acquisitionType:acquisitionType,
        amount:amount,

      });

      await newTemplate.save();
        res.send({ message: 'Template data saved successfully!' });
  } catch (err) {
    console.error('Error uploading file and updating database: ', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getTemplate = async (req, res) => {
  try {
    const templateData = await Template.find();
    res.send(templateData);
  } catch (error) {
    console.error('Error fetching template data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const searchTemplate = async (req, res) => {
  try {
    const key = req.params.key;
    let result = [];
    const isNumber = !isNaN(parseFloat(key)) && isFinite(key);

    if (isNumber) {
      result = await Template.find({ amount: parseFloat(key) });
    } else {
      result = await Template.find({
        websiteName: { $regex: key, $options: 'i' },
      });
    }

    res.send(result);
  } catch (error) {
    console.error('Error searching for templates:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};



module.exports = { addTemplate,getTemplate,searchTemplate};
