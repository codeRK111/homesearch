import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// Custom components
import FormInput from '../forminput/forminput.component';
import makeStyles from './otp.styles';
import ErrorMessage from '../errorMessage/errorMessage.component';
import BackDrop from '../backdrop/backdrop.component';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';

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
		validateOtp(handleValidateOtp, values.number, values.otp);
	};

	const focusOut = (number) => (_) => {
		sendOtp(handleSendOtp, number);
	};
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
			{({ values }) => (
				<Form className={classes.form}>
					<BackDrop open={sendOtpLoading || validateOtpLoading} />
					{asyncError && (
						<ErrorMessage
							message={asyncError}
							onClear={() => setAsyncError(null)}
						/>
					)}
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="number"
						label="Number"
						name="number"
						autoComplete="number"
						value={values.number}
						type="number"
						onBlur={focusOut(values.number)}
					/>
					{otpSent && (
						<FormInput
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="otp"
							label="OTP"
							type="number"
							id="otp"
							autoComplete="current-otp"
							value={values.otp}
						/>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{otpSent ? 'Sign In' : 'Send OTP'}
					</Button>
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
