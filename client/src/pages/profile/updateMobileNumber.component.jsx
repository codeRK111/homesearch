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

const UpdateMobileNumber = ({ existingNumber, setUser, showMessage }) => {
	// Cancel Axios Token
	let cancelToken;

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
	});

	// Async Error
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Mobile Number
	const [mobileNumber, setMobileNumber] = React.useState(null);

	// Success Message
	const [successMessage, setSuccessMessage] = React.useState(null);

	// Formik submit
	const onNumberSubmit = async (values, { setErrors }) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			const token = localStorage.getItem('JWT_CLIENT');
			cancelToken = axios.CancelToken.source();
			await axios.post(
				apiUrl('/users/reset-my-number-otp'),
				{
					number: values.number,
				},
				{
					cancelToken: cancelToken.token,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			setMobileNumber(values.number);
		} catch (error) {
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
			const token = localStorage.getItem('JWT_CLIENT');
			cancelToken = axios.CancelToken.source();
			const response = await axios.post(
				apiUrl('/users/update-my-number'),
				{
					number: mobileNumber,
					otp: values.otp,
				},
				{
					cancelToken: cancelToken.token,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const responseData = response.data;
			localStorage.setItem('JWT_CLIENT', responseData.token);
			setUser({
				token: responseData.token,
				user: responseData.data.user,
			});

			setAsyncState({
				error: null,
				loading: false,
			});
			setMobileNumber(null);
			showMessage('Phone number updated successfully');
		} catch (error) {
			if (error.response) {
				setErrors({ otp: error.response.data.message });
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
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
			{!mobileNumber ? (
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
							<TextField formLabel="Phone Number" name="number" />
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
					}}
					enableReinitialize
					validationSchema={otpValidationSchema}
					onSubmit={onOTPSubmit}
				>
					{() => (
						<Form>
							<TextField
								formLabel="OTP"
								name="otp"
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
	);
};

const mapDispatchToProps = (dispatch) => ({
	setUser: (data) => dispatch(setUser(data)),
});

export default connect(null, mapDispatchToProps)(UpdateMobileNumber);
