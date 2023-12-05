const  Contact = require ("../models/contactModel.js");

const sendMessage = async (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body.formData;
  
    try {
      const contact = new Contact({
        name,
        email,
        message
      });
  
      await contact.save();
  
      res.status(200).json({ message: 'Message send successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  };


module.exports= { sendMessage};
