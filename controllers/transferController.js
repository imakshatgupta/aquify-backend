const Transfer = require('../models/transferModel.js');
require('dotenv').config();

const addTransfer = async (req, res) => {
    try {
        const { startupName, ownerName, ownerEmail, acquirerName, acquirerEmail, payerType } = req.body.formData;
        const newTransfer = new Transfer({
            startupName,
            ownerName,
            ownerEmail,
            acquirerName,
            acquirerEmail,
            payerType
        });
    
        await newTransfer.save();
        res.send({ message: 'Transfer data saved successfully!' });
    } catch (err) {
        console.error('Error uploading file and updating database: ', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
    }

module.exports = { addTransfer };
