const express = require('express');

const {addBusiness} = require ('../controllers/businessController.js');
const {getBusiness} = require ('../controllers/businessController.js');
const { route } = require('./userRoutes.js');

const router = express.Router();

router.post('/addBusiness',addBusiness);
router.get('/getBusiness',getBusiness);

module.exports=router;