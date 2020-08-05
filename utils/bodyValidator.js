const AppError = require('./appError');

module.exports = (body, next, ...values) => {
	values.forEach((v) => {
		if (!body[v]) {
			next(new AppError(`Missing parameter: ${v}`, 400));
			return;
		}
	});
};
