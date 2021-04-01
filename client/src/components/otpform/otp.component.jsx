import { Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';

import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormInput from '../formik/textField.component';
import { JustifyCenter } from '../flexContainer/flexContainer.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeStyles from './otp.styles';
import * as Yup from 'yup';
import { yupValidation } from '../../utils/validation.utils';

// Custom components

// Redux

const LoginForm = ({
	sendOtpLoading,
	validateOtpLoading,
	sendOtp,
	validateOtp,
}) => {
	const phoneValidation = Yup.object({
		number: yupValidation.mobileNumber,
	});
	const otpValidation = Yup.object({
		otp: yupValidation.OTP,
	});
	const classes = makeStyles();
	const history = useHistory();
	const [phoneNumber, setPhoneNumber] = React.useState(null);
	const [otpSent, setOtpSent] = React.useState(false);

	const handleSendOtp = (number, setErrors) => (status, data = null) => {
		if (status === 'success') {
			setOtpSent(true);
			setPhoneNumber(number);
		} else {
			setPhoneNumber('');
			setOtpSent(false);
			setErrors({ number: data });
		}
	};

	const handleValidateOtp = (setErrors) => (status, data = null) => {
		if (status === 'success') {
			history.push('/profile');
		} else {
			setErrors({ otp: data });
		}
	};

	const onSendOtp = (values, { setErrors }) => {
		sendOtp(handleSendOtp(values.number, setErrors), values.number);
	};
	const onValidateOtp = (values, { setErrors }) => {
		validateOtp(handleValidateOtp(setErrors), phoneNumber, values.otp);
	};

	const buttonProps = {};
	if (sendOtpLoading || validateOtpLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
		buttonProps.disabled = true;
	}

	return (
		<div>
			{otpSent ? (
				<Formik
					initialValues={{
						number: phoneNumber,
						otp: '',
					}}
					validationSchema={otpValidation}
					enableReinitialize
					onSubmit={onValidateOtp}
				>
					{() => (
						<Form className={classes.form}>
							<FormInput
								name="number"
								formLabel="Phone Number"
								disabled
							/>
							<FormInput name="otp" formLabel="OTP" />
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								{...buttonProps}
							>
								{otpSent ? 'Sign In' : 'Send OTP'}
							</Button>
							<JustifyCenter mt="1rem">
								<Link to="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</JustifyCenter>
						</Form>
					)}
				</Formik>
			) : (
				<Formik
					initialValues={{
						number: '',
						otp: '',
					}}
					validationSchema={phoneValidation}
					onSubmit={onSendOtp}
				>
					{() => (
						<Form className={classes.form}>
							<FormInput name="number" formLabel="Phone Number" />

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								{...buttonProps}
							>
								{otpSent ? 'Sign In' : 'Send OTP'}
							</Button>
							<JustifyCenter mt="1rem">
								<Link to="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</JustifyCenter>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sendOtpLoading: selectSendOtpLoading,
	validateOtpLoading: selectValidateOtpLoading,
});

const mapDispatchToProps = (dispatch) => ({
	sendOtp: (callback, number) => dispatch(sendOtp({ number, callback })),
	validateOtp: (callback, number, otp) =>
		dispatch(validateOtp({ number, callback, otp })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
