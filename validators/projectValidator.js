const { check } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'createProject':
			return [
				check('projectType', 'projectType required')
					.exists()
					.isIn(['flat', 'independenthouse', 'land'])
					.withMessage('Invalid value'),
				check('title', 'title required').exists(),
				check('builder', 'builder required').exists(),
				check('complitionStatus', 'complitionStatus required')
					.exists()
					.isIn(['upcoming', 'ongoing', 'completed'])
					.withMessage('Invalid complitionStatus value'),
				check('description', 'description required').exists(),
				check('usp', 'usp required').exists(),
				check('bookingAmount', 'bookingAmount required')
					.exists()
					.isInt()
					.withMessage('bookingAmount is not a number'),
				check('emi', 'emi required')
					.exists()
					.isInt()
					.withMessage('emi is not a number'),
				check('totalLandArea', 'totalLandArea required')
					.exists()
					.isInt()
					.withMessage('totalLandArea is not a number'),
				check('city', 'city required').exists(),
				check('location', 'location required').exists(),
			];
	}
};
