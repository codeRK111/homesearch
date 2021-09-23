import * as Yup from 'yup';

import {
	Backdrop,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { getAuthOption, loginDialogStatus } from '../../redux/ui/ui.selectors';
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';
import { setAuthOption, toggleLoginPopup } from '../../redux/ui/ui.actions';

import ChipSelect from '../../components/v2/chipSelect/chipSelectedFullWidth.component';
import CloseIcon from '@material-ui/icons/Close';
import Countdown from './timer.component';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormInput from '../formik/textFieldDefault.component';
import OtpInput from 'react-otp-input';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useGlobalClasses from '../../common.style';
import useStyles from './logIn.style';
import { withStyles } from '@material-ui/styles';
import { yupValidation } from '../../utils/validation.utils';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		boxShadow: '0px 0px 2px 1px #c1c1c1',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const CDialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="body1">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
});

// Custom components

export const CBackdrop = withStyles({
	root: {
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
})(Backdrop);

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

function AlertDialogSlide({
	sendOtpLoading,
	validateOtpLoading,
	sendOtp,
	validateOtp,
	toggleLoginPopup,
	open,
	setAuthOption,
	authOption,
}) {
	const cancelToken = React.useRef(undefined);
	const gClasses = useGlobalClasses();

	const [otp, setOTP] = React.useState(false);
	const [signUpOtp, setSignUpOtp] = React.useState(false);
	// const [counterKey, setCounterKey] = React.useState(0);
	const [phoneNumber, setPhoneNumber] = React.useState(null);
	const [otpSent, setOtpSent] = React.useState(false);
	const [signUpOtpSent, setSignUpOtpSent] = React.useState(false);

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	const phoneValidation = Yup.object({
		number: yupValidation.mobileNumber,
	});
	const signUpValidation = Yup.object({
		number: yupValidation.mobileNumber,
		email: yupValidation.email,
		name: Yup.string().required('Enter your name'),
		role: Yup.string().required('Select your role'),
	});

	const classes = useStyles();

	React.useEffect(() => {
		if (!open) {
			setOTP(false);
			setOtpSent(false);
			setPhoneNumber(null);
		}
	}, [open]);

	const handleClose = () => {
		toggleLoginPopup(false);
	};

	// const handleSendOtp =
	// 	(number, setErrors) =>
	// 	(status, data = null) => {
	// 		if (status === 'success') {
	// 			setOtpSent(true);
	// 			setPhoneNumber(number);
	// 		} else {
	// 			setPhoneNumber('');
	// 			setOtpSent(false);
	// 			setErrors({ number: data });
	// 		}
	// 	};

	const handleValidateOtp =
		(setErrors) =>
		(status, data = null) => {
			if (status === 'success') {
				handleClose();
			} else {
				setErrors({ otp: data });
			}
		};

	const onSendOtp = async (values, setErrors) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();
			await axios.post(
				apiUrl('/users/signIn'),
				{
					number: values.number,
					registerVia: 'web',
				},
				{
					cancelToken: cancelToken.current.token,
				}
			);
			setOtpSent(true);
			setPhoneNumber(values.number);
			setAsyncState({
				error: null,
				loading: false,
			});
		} catch (error) {
			setOtpSent(false);
			setPhoneNumber(null);
			// setOtpSent(true);
			// setPhoneNumber(values.number);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
				setErrors({ number: error.response.data.message });
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};
	const onSendOtpBySignUp = async (values, setErrors) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();
			await axios.post(
				apiUrl('/users/user-signup'),
				{
					...values,
					registerVia: 'web',
				},
				{
					cancelToken: cancelToken.current.token,
				}
			);
			setSignUpOtpSent(true);
			setPhoneNumber(values.number);
			setAsyncState({
				error: null,
				loading: false,
			});
		} catch (error) {
			setSignUpOtpSent(false);
			setPhoneNumber(null);
			// setOtpSent(true);
			// setPhoneNumber(values.number);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
				setErrors({ number: error.response.data.message });
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};
	const onValidateOtp = (values, setErrors) => {
		if (String(otp).length !== 4) {
			setErrors({ otp: 'OTP required' });
			return;
		}
		validateOtp(handleValidateOtp(setErrors), phoneNumber, otp);
	};
	const onValidateSignUpOtp = (_, setErrors) => {
		if (String(signUpOtp).length !== 4) {
			setErrors({ otp: 'OTP required' });
			return;
		}
		validateOtp(handleValidateOtp(setErrors), phoneNumber, signUpOtp);
	};

	const onSubmitForm = (values, { setErrors }) => {
		if (otpSent) {
			onValidateOtp(values, setErrors);
		} else {
			onSendOtp(values, setErrors);
		}
	};
	const onSignUpSubmitForm = (values, { setErrors }) => {
		if (signUpOtpSent) {
			onValidateSignUpOtp(values, setErrors);
		} else {
			onSendOtpBySignUp(values, setErrors);
		}
	};

	const buttonProps = {};
	if (asyncState.loading || validateOtpLoading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
		buttonProps.disabled = true;
	}

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				maxWidth="lg"
				BackdropComponent={CBackdrop}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				classes={{
					paper: classes.radius,
					root: classes.root,
				}}
			>
				<Box className={classes.wrapper}>
					<Grid container spacing={0} className={classes.fullHeight}>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.fullWidth}
						>
							<Box width="100%">
								<CDialogTitle
									id="customized-dialog-title"
									onClose={handleClose}
								>
									Homesearch18
								</CDialogTitle>

								<Box className={classes.contentWrapper}>
									<Box mt="1rem" width="100%">
										<Grid
											container
											spacing={1}
											justify="center"
										>
											<Grid item xs={6} md={4}>
												<ChipSelect
													selected={
														authOption === 'login'
													}
													onClick={() => {
														setAuthOption('login');
													}}
												>
													Login
												</ChipSelect>
											</Grid>
											<Grid item xs={6} md={4}>
												<ChipSelect
													selected={
														authOption === 'signup'
													}
													onClick={() => {
														setAuthOption('signup');
													}}
												>
													Sign Up
												</ChipSelect>
											</Grid>
										</Grid>
									</Box>
									{authOption === 'login' ? (
										<Box className={classes.content}>
											<Formik
												initialValues={{
													number: '',
													otp: '',
												}}
												enableReinitialize
												validationSchema={
													phoneValidation
												}
												onSubmit={onSubmitForm}
											>
												{({ errors }) => (
													<Form
														className={classes.form}
													>
														<FormInput
															name="number"
															formLabel="Phone Number"
															placeholder="Phone Number"
														/>
														{otpSent && (
															<Box
																display="flex"
																flexDirection="column"
																width="100%"
																alignItems="center"
																mt="1rem"
															>
																<Typography variant="caption">
																	Enter OTP
																	sent to
																	&nbsp;
																	<b>
																		{
																			phoneNumber
																		}
																	</b>
																</Typography>

																<OtpInput
																	value={otp}
																	onChange={
																		setOTP
																	}
																	numInputs={
																		4
																	}
																	inputStyle={
																		classes.otp
																	}
																	separator={
																		<span>
																			-
																		</span>
																	}
																	isInputNum={
																		true
																	}
																/>

																<Countdown
																	initialMinute={
																		2
																	}
																	initialSeconds={
																		0
																	}
																	start={
																		otpSent
																	}
																	phoneNumber={
																		phoneNumber
																	}
																/>

																{errors.otp && (
																	<Typography
																		variant="caption"
																		color="error"
																	>
																		{
																			errors.otp
																		}
																	</Typography>
																)}
																{asyncState.error && (
																	<Typography
																		variant="caption"
																		color="error"
																	>
																		{
																			asyncState.error
																		}
																	</Typography>
																)}
															</Box>
														)}

														<Box
															mt="1rem"
															mb="1rem"
															display="flex"
															justifyContent="center"
														>
															<button
																type="submit"
																fullWidth
																variant="contained"
																color="primary"
																className={
																	classes.button
																}
																{...buttonProps}
																size="large"
															>
																{otpSent
																	? 'Sign In'
																	: 'Send OTP'}
															</button>
														</Box>
													</Form>
												)}
											</Formik>
										</Box>
									) : (
										<Box className={classes.content}>
											<Formik
												initialValues={{
													name: '',
													email: '',
													number: '',
													role: '',
													otp: '',
												}}
												enableReinitialize
												validationSchema={
													signUpValidation
												}
												onSubmit={onSignUpSubmitForm}
											>
												{({
													errors,
													setFieldValue,
													values,
												}) => (
													<Form
														className={classes.form}
													>
														<FormInput
															name="name"
															placeholder="Full Name"
														/>
														<FormInput
															name="email"
															placeholder="Email"
														/>
														<FormInput
															name="number"
															placeholder="PhoneNumber"
														/>
														<Box mt="1rem">
															<Typography
																align="center"
																variant="h5"
															>
																You are
															</Typography>
														</Box>
														<Box mt="1rem">
															<Grid
																container
																spacing={1}
																justify="center"
															>
																<Grid
																	item
																	xs={6}
																	md={3}
																>
																	<ChipSelect
																		selected={
																			values.role ===
																			'builder'
																		}
																		onClick={() => {
																			setFieldValue(
																				'role',
																				'builder'
																			);
																		}}
																	>
																		Builder
																	</ChipSelect>
																</Grid>
																<Grid
																	item
																	xs={6}
																	md={3}
																>
																	<ChipSelect
																		selected={
																			values.role ===
																			'agent'
																		}
																		onClick={() => {
																			setFieldValue(
																				'role',
																				'agent'
																			);
																		}}
																	>
																		Realtor
																	</ChipSelect>
																</Grid>
																<Grid
																	item
																	xs={6}
																	md={3}
																>
																	<ChipSelect
																		selected={
																			values.role ===
																			'owner'
																		}
																		onClick={() => {
																			setFieldValue(
																				'role',
																				'owner'
																			);
																		}}
																	>
																		Owner
																	</ChipSelect>
																</Grid>
																<Grid
																	item
																	xs={6}
																	md={3}
																>
																	<ChipSelect
																		selected={
																			values.role ===
																			'tenant'
																		}
																		onClick={() => {
																			setFieldValue(
																				'role',
																				'tenant'
																			);
																		}}
																	>
																		Tenant
																	</ChipSelect>
																</Grid>
															</Grid>
														</Box>

														{errors.role && (
															<Box
																mt="1rem"
																className={
																	gClasses.justifyCenter
																}
															>
																<Typography
																	variant="caption"
																	color="error"
																	align="center"
																>
																	{
																		errors.role
																	}
																</Typography>
															</Box>
														)}
														{signUpOtpSent && (
															<Box
																display="flex"
																flexDirection="column"
																width="100%"
																alignItems="center"
																mt="1rem"
															>
																<Typography variant="caption">
																	Enter OTP
																	sent to
																	&nbsp;
																	<b>
																		{
																			phoneNumber
																		}
																	</b>
																</Typography>

																<OtpInput
																	value={
																		signUpOtp
																	}
																	onChange={
																		setSignUpOtp
																	}
																	numInputs={
																		4
																	}
																	inputStyle={
																		classes.otp
																	}
																	separator={
																		<span>
																			-
																		</span>
																	}
																	isInputNum={
																		true
																	}
																/>

																<Countdown
																	initialMinute={
																		2
																	}
																	initialSeconds={
																		0
																	}
																	start={
																		signUpOtpSent
																	}
																	phoneNumber={
																		phoneNumber
																	}
																/>

																{errors.otp && (
																	<Typography
																		variant="caption"
																		color="error"
																	>
																		{
																			errors.otp
																		}
																	</Typography>
																)}
																{asyncState.error && (
																	<Typography
																		variant="caption"
																		color="error"
																	>
																		{
																			asyncState.error
																		}
																	</Typography>
																)}
															</Box>
														)}

														<Box
															mt="2rem"
															className={
																gClasses.flexCenter
															}
															mb="1rem"
														>
															<button
																type="submit"
																fullWidth
																variant="contained"
																color="primary"
																className={
																	classes.button
																}
																{...buttonProps}
																size="large"
															>
																{signUpOtpSent
																	? 'Sign Up'
																	: 'Send OTP'}
															</button>
														</Box>
													</Form>
												)}
											</Formik>
										</Box>
									)}
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Dialog>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	sendOtpLoading: selectSendOtpLoading,
	validateOtpLoading: selectValidateOtpLoading,
	open: loginDialogStatus,
	authOption: getAuthOption,
});

const mapDispatchToProps = (dispatch) => ({
	sendOtp: (callback, number) => dispatch(sendOtp({ number, callback })),
	setAuthOption: (option) => dispatch(setAuthOption(option)),
	validateOtp: (callback, number, otp) =>
		dispatch(validateOtp({ number, callback, otp })),
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlide);
