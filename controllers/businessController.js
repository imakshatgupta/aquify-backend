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
      // Fetch businesses where 'approved' field is not true (i.e., false or undefined)
      const business = await Business.find({ approved: { $ne: true } });
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  

  const getApprovedBusiness = async (req, res) => {
    try {
      const business = await Business.find({ approved: true });
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const deny = async (req, res) => {
    try {
      const business = await Business.findByIdAndDelete(req.body.id)
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const approve = async (req, res) => {
    try {
      const business = await Business.findByIdAndUpdate(req.body.id, { approved: true })
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getBusinessById = async (req, res) => {
    try {
      const ownerId = req.query.id;
      const business = await Business.find({ownerId : ownerId});
      res.status(200).json({ business });
    } catch (error) {
      console.error('Error getting businesses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  
module.exports={addBusiness , getBusiness , getBusinessById , getApprovedBusiness , deny , approve};