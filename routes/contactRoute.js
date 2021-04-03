const express = require('express');
// const userController = require('./../controllers/userController');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/check-exist/:number', contactController.checkExists);
router.get(
	'/validate/number/:number/otp/:otp',
	contactController.validateNumber
);
router.post('/', contactController.addContact);

module.exports = router;
