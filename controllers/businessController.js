const Business = require('../models/businessModel.js');

const addBusiness = async (req, res) => {
    try {
      const existingBusiness = await Business.findOne(req.body);
      if (existingBusiness) {
        return res.status(400).json({ message: 'Business already exists.' });
      }
  
      const newBusiness = new Business(req.body);
  
      const savedBusiness = await newBusiness.save();
  
      res.status(201).json({ message: 'Business added successfully', data: savedBusiness });
    } catch (error) {
      console.error('Error adding business:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getBusiness = async (req, res) => {
    try {
      // Remove the ownerId condition to fetch all businesses
      const business = await Business.find();
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  
module.exports={addBusiness , getBusiness};