const express = require('express');
// const userController = require('./../controllers/userController');
const featureController = require('../controllers/featureController');

const router = express.Router();


router.get('/get-properties-count/:city', featureController.getPropertiesCount);



	



module.exports = router;
