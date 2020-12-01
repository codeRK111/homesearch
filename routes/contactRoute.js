const express = require('express');
// const userController = require('./../controllers/userController');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactController.addContact);
router.get(
	'/validate/number/:number/otp/:otp',
	contactController.validateNumber
);



module.exports = router;
