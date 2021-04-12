import './login.styles.scss';

import {
	selectIsAuthenticated,
	selectLoading,
} from '../../redux/user/user.selector';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import OTPAlert from '../../components/otpAlert/otpAlert.component';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { signInStart } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';

// import { withRouter } from 'react-router-dom';

// import ReCAPTCHA from 'react-google-recaptcha';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function SignIn({ signInStart, isAuthenticated, loading }) {
	const classes = useStyles();
	const [errorMessage, setErrorMessage] = React.useState('');
	const [otpSent, setOTPSent] = React.useState(false);
	const [otpLoading, setOTPLoading] = React.useState(false);
	const [buttonDisable, setButtonDisable] = React.useState(true);
	const [validationError, setValidationError] = React.useState({
		email: '',
		password: '',
		otp: '',
	});
	const [open, setOpen] = React.useState(false);
	const [values, setValues] = React.useState({
		password: '',
		email: '',
		otp: '',
	});

	const onvalidate = (value) => {
		setButtonDisable(false);
	};

	const handleClick = (msg) => {
		setErrorMessage(msg);
		setOpen(true);
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const sendOTP = (e) => {
		setOTPLoading(true);
		axios
			.get('/api/v1/admin/features/send-otp')
			.then((_) => {
				setOTPSent(true);
				setOTPLoading(false);
			})
			.catch((error) => {
				setOTPLoading(false);
				setOTPSent(true);
				handleClick('somethink goes wrong');
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// handleClick('Error');
		if (!values.email) {
			setValidationError((prevState) => ({
				...prevState,
				email: 'Please enter email',
			}));
		} else {
			setValidationError((prevState) => ({
				...prevState,
				email: '',
			}));
		}
		if (!values.password) {
			setValidationError((prevState) => ({
				...prevState,
				password: 'Please enter password',
			}));
		} else {
			setValidationError((prevState) => ({
				...prevState,
				password: '',
			}));
		}

		if (otpSent) {
			if (!values.otp) {
				setValidationError((prevState) => ({
					...prevState,
					otp: 'Please enter otp',
				}));
			} else {
				setValidationError((prevState) => ({
					...prevState,
					otp: '',
				}));
			}
			if (!values.email || !values.password) return;
			signInStart(values.email, values.password, values.otp, handleClick);
		} else {
			sendOTP();
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			{isAuthenticated && <Redirect to="/dashboard" />}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
			<Box mt="8rem">
				<Paper>
					<Box p="1rem">
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<form
								className={classes.form}
								noValidate
								onSubmit={onSubmit}
							>
								<TextField
									error={!!validationError.email}
									margin="normal"
									required
									fullWidth
									id="email"
									onChange={handleChange('email')}
									label={
										validationError.email
											? 'Error'
											: 'Username'
									}
									helperText={validationError.email}
									name="email"
									autoComplete="email"
									autoFocus
									size="small"
									disabled={otpSent}
								/>
								<TextField
									error={!!validationError.password}
									margin="normal"
									required
									fullWidth
									name="password"
									onChange={handleChange('password')}
									label={
										validationError.password
											? 'Error'
											: 'Password'
									}
									helperText={validationError.password}
									type="password"
									id="password"
									autoComplete="current-password"
									disabled={otpSent}
									size="small"
								/>
								{otpSent && (
									<TextField
										error={!!validationError.otp}
										margin="normal"
										required
										fullWidth
										name="otp"
										onChange={handleChange('otp')}
										label={
											validationError.password
												? 'Error'
												: 'OTP'
										}
										helperText={validationError.password}
										size="small"
									/>
								)}
								{/* <ReCAPTCHA
									sitekey="6LcK_b0ZAAAAAKH_Ze3nUOw5u200KWzoC22DKFso"
									onChange={onvalidate}
								/> */}

								{loading || otpLoading ? (
									<div className="loading-wrapper">
										<CircularProgress />
									</div>
								) : (
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										classes={{
											label: 'transform-none',
										}}
										// disabled={buttonDisable}
										className={classes.submit}
									>
										{otpSent ? 'Sign In' : 'Send OTP'}
									</Button>
								)}
							</form>
						</div>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
}

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	loading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
	signInStart: (username, password, otp, handleClick) =>
		dispatch(
			signInStart({ username, password, otp, showSnackbar: handleClick })
		),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
