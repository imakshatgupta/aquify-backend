const express = require ("express");
const {
  addTemplate,getTemplate,searchTemplate
} = require("../controllers/templateController.js");

const router = express.Router();

router.post('/addTemplate',addTemplate);
router.get('/getTemplate',getTemplate);
router.get('/searchTemplate/:key',searchTemplate);

module.exports=router;