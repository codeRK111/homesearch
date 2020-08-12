// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Card from '@material-ui/core/Card';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import Visibility from '@material-ui/icons/Visibility';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import { signInStart } from '../../redux/user/user.actions';
// import { Redirect } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
// import {
// 	selectIsAuthenticated,
// 	selectLoading,
// } from '../../redux/user/user.selector';

// import './login.styles.scss';

// function Alert(props) {
// 	return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		marginTop: '200px',
// 		marginLeft: 'auto',
// 		marginRight: 'auto',
// 		width: '100%',
// 	},
// 	flex: {
// 		// display: 'flex',
// 		// flexDirection: 'column',
// 	},
// 	card: {
// 		padding: '20px',
// 		width: '500px',
// 	},
// 	fullwidth: {
// 		width: '100%',
// 		marginTop: '20px',
// 	},
// }));

// function LogIn({ signInStart, isAuthenticated, loading }) {
// 	const classes = useStyles();
// const [values, setValues] = React.useState({
// 	password: '',
// 	showPassword: false,
// 	email: '',
// });

// const [errorMessage, setErrorMessage] = React.useState('');
// const [open, setOpen] = React.useState(false);

// const handleClick = (msg) => {
// 	setErrorMessage(msg);
// 	setOpen(true);
// };

// const handleClose = (event, reason) => {
// 	if (reason === 'clickaway') {
// 		return;
// 	}

// 	setOpen(false);
// };
// const handleChange = (prop) => (event) => {
// 	setValues({ ...values, [prop]: event.target.value });
// };
// 	const handleClickShowPassword = () => {
// 		setValues({ ...values, showPassword: !values.showPassword });
// 	};

// 	const login = () => {
// 		if (!values.email || !values.password) {
// 			return handleClick('email and password cannot be empty');
// 		}
// 		signInStart(values.email, values.password, handleClick);
// 	};

// 	return (
// 		<Card className={[classes.card, classes.flex, classes.root].join(' ')}>
// 			{isAuthenticated && <Redirect to="/dashboard" />}
// <Snackbar
// 	open={open}
// 	autoHideDuration={6000}
// 	onClose={handleClose}
// 	anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// >
// 	<Alert onClose={handleClose} severity="error">
// 		{errorMessage}
// 	</Alert>
// </Snackbar>
// 			<TextField
// 				id="standard-basic"
// 				label="Email"
// 				fullWidth
// 				value={values.email}
// 				onChange={handleChange('email')}
// 			/>
// 			<FormControl className={classes.fullwidth}>
// 				<InputLabel htmlFor="standard-adornment-password">
// 					Password
// 				</InputLabel>
// 				<Input
// 					id="standard-adornment-password"
// 					type={values.showPassword ? 'text' : 'password'}
// 					value={values.password}
// 					onChange={handleChange('password')}
// 					fullWidth
// 					endAdornment={
// 						<InputAdornment position="end">
// 							<IconButton
// 								aria-label="toggle password visibility"
// 								onClick={handleClickShowPassword}
// 							>
// 								{values.showPassword ? (
// 									<Visibility />
// 								) : (
// 									<VisibilityOff />
// 								)}
// 							</IconButton>
// 						</InputAdornment>
// 					}
// 				/>
// 			</FormControl>
// 			{loading ? (
// 				<div className="loading-wrapper">
// 					<CircularProgress />
// 				</div>
// 			) : (
// 				<Button
// 					variant="contained"
// 					color="primary"
// 					className={classes.fullwidth}
// 					onClick={login}
// 				>
// 					Log in
// 				</Button>
// 			)}
// 		</Card>
// 	);
// }

// const mapStateToProps = createStructuredSelector({
// 	isAuthenticated: selectIsAuthenticated,
// 	loading: selectLoading,
// });

// const mapDispatchToProps = (dispatch) => ({
// 	signInStart: (email, password, handleClick) =>
// 		dispatch(signInStart({ email, password, showSnackbar: handleClick })),
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));

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
import ReCAPTCHA from 'react-google-recaptcha';

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
	const [buttonDisable, setButtonDisable] = React.useState(true);
	const [validationError, setValidationError] = React.useState({
		email: '',
		password: '',
	});
	const [open, setOpen] = React.useState(false);
	const [values, setValues] = React.useState({
		password: '',
		email: '',
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

		if (!values.email || !values.password) return;
		signInStart(values.email, values.password, handleClick);
	};

	return (
		<Container component="main" maxWidth="xs">
			{isAuthenticated && <Redirect to="/users" />}
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
											: 'Email Address'
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
								/>
								<ReCAPTCHA
									sitekey="6LcK_b0ZAAAAAKH_Ze3nUOw5u200KWzoC22DKFso"
									onChange={onvalidate}
								/>
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
											label: 'tranform-none',
										}}
										disabled={buttonDisable}
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
	signInStart: (email, password, handleClick) =>
		dispatch(signInStart({ email, password, showSnackbar: handleClick })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
