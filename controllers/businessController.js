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
      const id = req.headers['x-auth-token'];
      const business = await Business.find({ ownerId : id });
      res.status(200).json({ business })
    } catch (error) {
      console.error('Error getting business:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
module.exports={addBusiness , getBusiness};