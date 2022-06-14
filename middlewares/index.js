const moment = require('moment');
const AppError = require('../utils/appError');

exports.checkDiskSpace = (req, res, next) => {
	const indexExpiryDate = moment(process.env.INDEX_DATE_TARGET);
	const now = moment();

	if (now > indexExpiryDate) {
		return next(
			new AppError(
				'Index target exceed kindly reset or allow more space',
				500
			)
		);
	} else {
		next();
	}
};
