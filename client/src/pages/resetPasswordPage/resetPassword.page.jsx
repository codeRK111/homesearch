import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { apiUrl } from '../../utils/render.utils';
import { Form, Formik } from 'formik';
import { Box, Button, CircularProgress } from '@material-ui/core';
import TextField from '../../components/formik/textField.component';
import { yupValidation } from '../../utils/validation.utils';
import { connect } from 'react-redux';
import { setUser } from '../../redux/auth/auth.actions';
import AppBar from '../../components/appBar/appBar.component';
import Footer from '../../components/footer/footer.component';
import useGlobalStyles from '../../common.style';
import { Link } from 'react-router-dom';

const UpdateMobileNumber = ({ existingNumber, setUser }) => {
	// Cancel Axios Token
	let cancelToken;

	// Global class
	const globalClass = useGlobalStyles();

	// Phone Number Validation
	const numberValidationSchema = Yup.object({
		number: yupValidation.mobileNumber.test({
			name: 'existingNumber',
			exclusive: true,
			params: { existingNumber },
			message: 'You have already registered with this number',
			test: (value) => value != existingNumber,
		}),
	});

	// OTP Validation
	const otpValidationSchema = Yup.object({
		otp: yupValidation.OTP,
		password: yupValidation.passwordNew,
	});

	// Async Error
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Mobile Number
	const [mobileNumber, setMobileNumber] = React.useState(null);

	// Mobile Number
	const [userID, setUserID] = React.useState(null);

	// Success Message
	const [successMessage, setSuccessMessage] = React.useState(null);

	// On Resend
	const reset = () => {
		setMobileNumber(null);
		setUserID(null);
	};

	// Formik submit
	const onNumberSubmit = async (values, { setErrors }) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const resp = await axios.post(
				apiUrl('/users/forgot-my-password-otp'),
				{
					number: values.number,
				},
				{
					cancelToken: cancelToken.token,
				}
			);

			const respData = resp.data.data;
			setAsyncState({
				error: null,
				loading: false,
			});
			setUserID(respData.userId);
			setMobileNumber(values.number);
		} catch (error) {
			setUserID(null);
			setMobileNumber(null);
			if (error.response) {
				setErrors({ number: error.response.data.message });
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setErrors({
					number: 'We are having some issues, please try again later',
				});
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};
	const onOTPSubmit = async (values, { setErrors }) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			await axios.post(
				apiUrl('/users/change-password'),
				{
					id: userID,
					otp: values.otp,
					password: values.password,
				},
				{
					cancelToken: cancelToken.token,
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});

			setSuccessMessage('Password updated successfully');
		} catch (error) {
			if (error.response) {
				setErrors({ otp: error.response.data.message });
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setSuccessMessage(null);
				setErrors({
					otp: 'We are having some issues, please try again later',
				});
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};

	// Cancel Request
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, []);

	// Button Props
	const buttonProps = {};
	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box width="100%">
			<AppBar />
			<Box p="1rem" display="flex" justifyContent="center">
				{successMessage ? (
					<Box
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<p className={globalClass.successMessage}>
							{successMessage}
						</p>
						<p>
							Go to <Link to="/login">login page</Link>{' '}
						</p>
					</Box>
				) : !userID ? (
					<Formik
						initialValues={{
							number: existingNumber,
						}}
						enableReinitialize
						validationSchema={numberValidationSchema}
						onSubmit={onNumberSubmit}
					>
						{() => (
							<Form>
								<TextField
									formLabel="Please Enter Your Phone Number"
									name="number"
									type="text"
									inputProps={{
										autocomplete: 'new-password',
										form: {
											autocomplete: 'off',
										},
									}}
								/>
								<Box mt="1rem">
									<Button
										color="primary"
										variant="contained"
										type="submit"
										fullWidth
										{...buttonProps}
									>
										Next
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				) : (
					<Formik
						initialValues={{
							otp: '',
							password: '',
						}}
						enableReinitialize
						validationSchema={otpValidationSchema}
						onSubmit={onOTPSubmit}
					>
						{({ errors }) => (
							<Form>
								<TextField
									formLabel={`Enter OTP sent to ${mobileNumber}`}
									name="otp"
									type="text"
									inputProps={{
										autocomplete: 'new-password',
										form: {
											autocomplete: 'off',
										},
									}}
								/>
								<TextField
									formLabel="New Password"
									name="password"
								/>
								{errors.otp && (
									<Button type="button" onClick={reset}>
										resend OTP
									</Button>
								)}
								<Box mt="1rem">
									<Button
										color="primary"
										variant="contained"
										type="submit"
										{...buttonProps}
										fullWidth
									>
										Submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				)}
			</Box>
			<Footer />
		</Box>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setUser: (data) => dispatch(setUser(data)),
});

export default connect(null, mapDispatchToProps)(UpdateMobileNumber);
