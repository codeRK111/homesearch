import { Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';

import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from '../errorMessage/errorMessage.component';
import FormInput from '../formik/textField.component';
import { JustifyCenter } from '../flexContainer/flexContainer.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeStyles from './otp.styles';

// Custom components

// Redux

const LoginForm = ({
	sendOtpLoading,
	validateOtpLoading,
	sendOtp,
	validateOtp,
}) => {
	const classes = makeStyles();
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);
	const [otpSent, setOtpSent] = React.useState(false);

	const handleSendOtp = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setOtpSent(true);
		} else {
			setAsyncError(data);
			setOtpSent(false);
		}
	};

	const handleValidateOtp = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push('/profile');
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (values) => {
		if (!otpSent) {
			if(values.number){

			sendOtp(handleSendOtp, values.number);
			}
		} else {
			if(values.otp){

			validateOtp(handleValidateOtp, values.number, values.otp);
			}
			
		}
	};

	const buttonProps = {};
	if (sendOtpLoading || validateOtpLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
		buttonProps.disabled = true;
	}

	return (
		<Formik
			initialValues={{
				number: '',
				otp: '',
			}}
			validate={(values) => {
				const errors = {};
				if (otpSent) {
					if (!values.number) {
						errors.number = 'Number required';
					}
				} else {
					if (!values.number) {
						errors.number = 'Number required';
					}
					if (!values.otp) {
						errors.otp = 'OTP required';
					}
				}
			}}
			onSubmit={onSubmit}
		>
			{() => (
				<Form className={classes.form}>
					{asyncError && (
						<ErrorMessage
							message={asyncError}
							onClear={() => setAsyncError(null)}
						/>
					)}

					<FormInput
						name="number"
						type="number"
						formLabel="Phone Number"
					/>
					{otpSent && (
						<FormInput name="otp" type="number" formLabel="OTP" />
					)}
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
