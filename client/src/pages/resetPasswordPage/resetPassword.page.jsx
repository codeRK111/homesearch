import * as Yup from 'yup';

import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	resetMyPassword,
	sendResetPasswordOTP,
} from '../../redux/auth/auth.actions';
import {
	selectResetMyPasswordLoading,
	selectSendResetPasswordOtpLoading,
} from '../../redux/auth/auth.selectors';

import Appbar from '../../components/appBar/appBar.component';
import Footer from '../../components/footer/footer.component';
import React from 'react';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

const ResetPassword = ({
	sendOtpLoading,
	sendResetPasswordOTP,
	resetMyPasswordLoading,
	resetMyPassword,
}) => {
	const history = useHistory();
	const [showotp, setShowOtp] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const [schema, setSchema] = React.useState({
		email: Yup.string('Invalid email')
			.email('Invalid email')
			.required('Email required'),
	});
	const validationSchema = Yup.object(schema);
	React.useEffect(() => {
		if (showotp) {
			setSchema((prevState) => ({
				...prevState,
				otp: Yup.string().required('OTP required'),
				password: Yup.string()
					.trim()
					.min(6, 'Minimum 6 character required')
					.required('password required'),
			}));
		}
	}, [showotp]);

	const handleSendOtp = (status, data) => {
		if (status === 'success') {
			setShowOtp(true);
			setAsyncError(null);
		} else {
			setShowOtp(false);
			setAsyncError(data);
		}
	};

	const handleResetMyPassword = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push('/login');
		} else {
			setAsyncError(data);
		}
	};

	const submitForm = (values) => {
		if (showotp) {
			resetMyPassword(handleResetMyPassword, {
				email: values.email,
				otp: values.otp,
				password: values.password,
			});
		} else {
			sendResetPasswordOTP(handleSendOtp, { email: values.email });
		}
	};

	const buttonProps = {};
	if (sendOtpLoading || resetMyPasswordLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
		buttonProps.disabled = true;
	}
	return (
		<Box>
			<Appbar />
			<Box mt="5rem" mb="5rem">
				<Box display="flex" justifyContent="center">
					<Box width="20rem">
						{asyncError && <p className="cRed">{asyncError}</p>}
						<Formik
							initialValues={{ email: '', otp: '', password: '' }}
							enableReinitialize={true}
							validationSchema={validationSchema}
							onSubmit={submitForm}
							validateOnChange={true}
							validateOnMount={true}
						>
							{() => (
								<Form>
									<TextField
										name="email"
										formLabel="Email"
										type="email"
										disabled={showotp}
									/>
									{showotp && (
										<Box>
											<TextField
												name="otp"
												formLabel="OTP"
												type="string"
											/>
											<TextField
												name="password"
												formLabel="New password"
												type="string"
											/>
										</Box>
									)}

									<Box
										mt="1rem"
										display="flex"
										justifyContent="center"
									>
										<Button
											color="primary"
											variant="contained"
											type="submit"
											fullWidth
											{...buttonProps}
										>
											submit
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	sendOtpLoading: selectSendResetPasswordOtpLoading,
	resetMyPasswordLoading: selectResetMyPasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({
	sendResetPasswordOTP: (callback, body) =>
		dispatch(sendResetPasswordOTP({ body, callback })),
	resetMyPassword: (callback, body) =>
		dispatch(resetMyPassword({ body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
