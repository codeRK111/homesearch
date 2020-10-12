import * as Yup from 'yup';

export const validate = (values) => {
	const error = {};
	if (!values.email) {
		error.email = 'Email required';
	}
	if (!values.password) {
		error.password = 'Password required';
	}
	return error;
};

export const signupSchema = Yup.object().shape({
	name: Yup.string().required('Full name required'),
	email: Yup.string().email('Invalid email').required('Email required'),
	password: Yup.string().required('Password required'),
	number: Yup.string()
		.min(10, '10 digits required')
		.max(10, '10 digits required')
		.required('Phone number required'),
});
