const { check } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'createBuilderPackages':
			return [
				check('name', 'Package name required').exists(),
				check('price', 'Price required')
					.isInt()
					.withMessage('Invalid price value'),
			];
	}
};
