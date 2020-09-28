import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	number: Yup.number().required('Number required'),
	otp: Yup.number().required('OTP required'),
});
