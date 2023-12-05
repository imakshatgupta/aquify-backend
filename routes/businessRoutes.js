const express = require('express');

const {addBusiness} = require ('../controllers/businessController.js');

const router = express.Router();

router.post('/addBusiness',addBusiness);

module.exports=router;