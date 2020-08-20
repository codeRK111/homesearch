const express = require('express');
// const userController = require('./../controllers/userController');
const cityController = require('../controllers/cityController');

const router = express.Router();

router.route('/').get(cityController.getAllCities).post(cityController.addCity);
router.route('/states').get(cityController.getAllStates);
router.route('/states/:name').get(cityController.getCitiesOfAState);
router.route('/locations').post(cityController.addLocation);
router.route('/locations/:cityId').get(cityController.getLocations);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
