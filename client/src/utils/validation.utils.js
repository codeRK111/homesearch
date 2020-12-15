import * as Yup from 'yup';

export const yupValidation = {
	name: Yup.string('Invalid name')
		.matches(/^[a-zA-Z ]+$/, 'Invalid Name')
		.required('Name required'),
	email: Yup.string('Invalid email')
		.email('Invalid email')
		.required('Email required'),
	phoneNumber: Yup.string('Invalid number')
		.length(10, '10 digits required')
		.matches(/^\d{10}$/, 'Invalid Number')
		.required('Phone number required'),
	password: Yup.string()
		.trim()
		.min(6, 'Minimum 6 character required')
		.required('password required'),
};

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

export const validateEmail = (value) => {
	if (
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			value
		)
	) {
		return true;
	} else {
		return false;
	}
};

export const validateLength = (value, length) => {
	const str = String(value);
	if (str.length > length) {
		return false;
	} else {
		return true;
	}
};

export const validateNumber = (value) => {
	if (Number(value)) {
		return true;
	} else {
		if (value === 0 || value === '0') {
			return true;
		} else {
			return false;
		}
	}
};
