const express = require('express');
// const userController = require('./../controllers/userController');
const cityController = require('../controllers/cityController');

const router = express.Router();

router.route('/').get(cityController.getAllCities).post(cityController.addCity);
router
	.route('/:id')
	.get(cityController.getCity)
	.patch(cityController.updateCity)
	.delete(cityController.deleteCity);
router.route('/:id/check-dependencies').get(cityController.cityDependencies);
router
	.route('/locations/:id/check-dependencies')
	.get(cityController.locationDependencies);

router.route('/states/all').get(cityController.getAllStates);
router.route('/states/:name').get(cityController.getCitiesOfAState);
router.route('/locations').post(cityController.addLocation);
router.route('/locations/fetch/:id').get(cityController.getLocation);
router
	.route('/locations/manage/:id')
	.patch(cityController.updateLocation)
	.delete(cityController.deleteLocation);
router.route('/locations/:cityId').get(cityController.getLocations);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
