const Advisory = require('../models/advisoryModel.js');

const addAdvisory = async (req, res) => {
    try {
      const existingAdvisory = await Advisory.findOne(req.body);
      if (existingAdvisory) {
        return res.status(400).json({ message: 'Advisory already exists.' });
      }
  
      const newAdvisory = new Advisory(req.body);
  
      const savedAdvisory = await newAdvisory.save();
  
      res.status(201).json({ message: 'Advisory added successfully', data: savedAdvisory });
    } catch (error) {
      console.error('Error adding Advisory:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getAdvisory = async (req, res) => {
    try {
      // Remove the ownerId condition to fetch all Advisory
      const advisory = await Advisory.find();
      res.status(200).json({ advisory });
    } catch (error) {
      console.error('Error getting Advisory:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getAdvisoryById = async (req, res) => {
    try {
      const ownerId = req.query.id;
      const Advisory = await Advisory.find({ownerId : ownerId});
      res.status(200).json({ Advisory });
    } catch (error) {
      console.error('Error getting Advisorys:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  
module.exports={addAdvisory , getAdvisory , getAdvisoryById};