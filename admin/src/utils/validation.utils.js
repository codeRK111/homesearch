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

export const validateNumber = (v) => {
	const value = String(v);
	if (value.match(/^[0-9]+$/)) {
		return true;
	} else {
		if (value === 0 || value === '0') {
			return true;
		} else {
			return false;
		}
	}
};
