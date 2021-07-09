const { check } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'createBuilderPackages':
			return [
				check('name', 'Package name required').exists(),
				check('price', 'Price required')
					.isInt()
					.withMessage('Invalid price value'),
				check('packageDetails', 'Package details required'),
			];
		case 'createPropertyPackages':
			return [
				check('name', 'Property name required').exists(),
				check('expiresAt', 'Expiry date required')
					.isDate()
					.withMessage('Please provide a date'),
				check('price', 'Price required')
					.isInt()
					.withMessage('Invalid price value'),
				check('packageDetails', 'Package details required'),
			];
	}
};
