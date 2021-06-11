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
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Countdown from './timer.component';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormInput from '../formik/textField.component';
import OtpInput from 'react-otp-input';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginDialogStatus } from '../../redux/ui/ui.selectors';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import { useHistory } from 'react-router-dom';
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

const CBackdrop = withStyles({
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
}) {
	const cancelToken = React.useRef(undefined);

	const [otp, setOTP] = React.useState(false);
	const [counterKey, setCounterKey] = React.useState(0);
	const [phoneNumber, setPhoneNumber] = React.useState(null);
	const [otpSent, setOtpSent] = React.useState(false);

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	const phoneValidation = Yup.object({
		number: yupValidation.mobileNumber,
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

	const handleSendOtp =
		(number, setErrors) =>
		(status, data = null) => {
			if (status === 'success') {
				setOtpSent(true);
				setPhoneNumber(number);
			} else {
				setPhoneNumber('');
				setOtpSent(false);
				setErrors({ number: data });
			}
		};

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
				setErrors({
					number: 'We are having some issues, please try again later',
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

	const onSubmitForm = (values, { setErrors }) => {
		if (otpSent) {
			onValidateOtp(values, setErrors);
		} else {
			onSendOtp(values, setErrors);
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
			>
				<Box className={classes.wrapper}>
					<Grid container spacing={0} className={classes.fullHeight}>
						<Grid
							item
							xs={false}
							md={6}
							className={classes.bg}
						></Grid>
						<Grid item xs={12} md={6} className={classes.fullWidth}>
							<Box width="100%">
								<CDialogTitle
									id="customized-dialog-title"
									onClose={handleClose}
								>
									Login with your phone number
								</CDialogTitle>

								<Box className={classes.contentWrapper}>
									<Box className={classes.content}>
										<Formik
											initialValues={{
												number: '',
												otp: '',
											}}
											enableReinitialize
											validationSchema={phoneValidation}
											onSubmit={onSubmitForm}
										>
											{({ errors }) => (
												<Form className={classes.form}>
													<FormInput
														name="number"
														formLabel="Phone Number"
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
																Enter OTP sent
																to &nbsp;
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
																numInputs={4}
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
																start={otpSent}
																phoneNumber={
																	phoneNumber
																}
															/>

															{errors.otp && (
																<Typography
																	variant="caption"
																	color="error"
																>
																	{errors.otp}
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

													<Box mt="1rem">
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
});

const mapDispatchToProps = (dispatch) => ({
	sendOtp: (callback, number) => dispatch(sendOtp({ number, callback })),
	validateOtp: (callback, number, otp) =>
		dispatch(validateOtp({ number, callback, otp })),
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialogSlide);
