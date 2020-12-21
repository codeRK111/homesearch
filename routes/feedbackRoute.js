const express = require('express');
const feedBackController = require('../controllers/searchFeedbackController');

const router = express.Router();

router.route('/').post(feedBackController.addSearchFeedback);

module.exports = router;
