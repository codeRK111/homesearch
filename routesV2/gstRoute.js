const express = require('express');
const gstController = require('../controllersV2/gstController');
const authController = require('../controllers/adminController');

const router = express.Router();

router.route('/:id').patch(authController.protect, gstController.updateGST);
router
	.route('/')
	.get(gstController.getGSTs)
	.post(authController.protect, gstController.createGST);

module.exports = router;
