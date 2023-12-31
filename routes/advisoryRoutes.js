const express = require('express');

const {addAdvisory} = require ('../controllers/advisoryController.js');
const {getAdvisory} = require ('../controllers/advisoryController.js');
const {getAdvisoryById} = require ('../controllers/advisoryController.js');
const { route } = require('./userRoutes.js');

const router = express.Router();

router.post('/addAdvisory',addAdvisory);
router.get('/getAdvisory',getAdvisory);
router.get('/getAdvisoryById',getAdvisoryById);

module.exports=router;