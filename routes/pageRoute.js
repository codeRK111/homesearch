const express = require('express');
// const userController = require('./../controllers/userController');
const pageController = require('../controllers/pageController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.route('/homePage').get(pageController.getHomePage);

module.exports = router;
