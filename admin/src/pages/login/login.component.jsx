import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInStart } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './login.styles.scss';
import {
	selectIsAuthenticated,
	selectLoading,
} from '../../redux/user/user.selector';
// import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import OTPAlert from '../../components/otpAlert/otpAlert.component';

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
	const [otpLoading, setOtpLoading] = React.useState(false);
	const [otpOpen, setOtpOpen] = React.useState(false);
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

	const focusOut = (e) => {
		axios
			.get('/api/v1/admin/features/send-otp')
			.then()
			.catch((error) => {
				handleClick('somethink goes wrong');
			});
		setOtpOpen(true);
	};

	const closeOtpModal = () => {
		setOtpOpen(false);
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
	};

	return (
		<Container component="main" maxWidth="xs">
			{isAuthenticated && <Redirect to="/dashboard" />}
			<OTPAlert open={otpOpen} handleClose={closeOtpModal} />
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
									variant="outlined"
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
								/>
								<TextField
									error={!!validationError.password}
									variant="outlined"
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
									onBlur={focusOut}
								/>
								<TextField
									error={!!validationError.otp}
									variant="outlined"
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
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								{/* <ReCAPTCHA
									sitekey="6LcK_b0ZAAAAAKH_Ze3nUOw5u200KWzoC22DKFso"
									onChange={onvalidate}
								/> */}
								,
								{loading ? (
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
										Sign In
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
