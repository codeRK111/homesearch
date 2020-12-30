const validateBody = (fields, body, next) => {
	fields.forEach((c) => {
		if (!body[c.name]) {
			return next(new AppError(`${c.label} required`, 400));
		}
	});
};

module.exports = validateBody