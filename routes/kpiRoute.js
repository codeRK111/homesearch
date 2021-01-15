const express = require('express');
// const userController = require('./../controllers/userController');
const adminController = require('../controllers/adminController');
const kpiController = require('../controllers/kpiController');
const router = express.Router();

router.route('/leads').get(adminController.protect, kpiController.getAllLeads);

module.exports = router;
