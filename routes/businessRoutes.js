const express = require('express');

const {addBusiness} = require ('../controllers/businessController.js');
const {getBusiness} = require ('../controllers/businessController.js');
const {getBusinessById} = require ('../controllers/businessController.js');
const {getApprovedBusiness} = require ('../controllers/businessController.js');
const {deny} = require ('../controllers/businessController.js');
const {approve} = require ('../controllers/businessController.js');
const { route } = require('./userRoutes.js');

const router = express.Router();

router.post('/addBusiness',addBusiness);
router.get('/getBusiness',getBusiness);
router.get('/getApprovedBusiness',getApprovedBusiness);
router.post('/deny',deny);
router.post('/approve',approve);
router.get('/getBusinessById',getBusinessById);

module.exports=router;