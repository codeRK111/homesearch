export const validateProfile = (values) => {
	const error = {};
	if (!values.name) {
		error.name = 'Name required';
	}
	if (!values.email) {
		error.email = 'Email required';
	}

	return error;
};

export const validateMobileNumber = (value) => {
	if (/^\d{10}$/.test(value)) {
		return true;
	} else {
		return false;
	}
};
