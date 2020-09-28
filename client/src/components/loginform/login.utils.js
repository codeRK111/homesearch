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

export const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email required'),
	password: Yup.string().required('Password required'),
});
