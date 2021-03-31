import React from 'react';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles as usePageStyle } from '../../pages/projectPage/project.style';
import { Formik, Form } from 'formik';
import TextField from '../../components/formik/textField.component';
import { selectUser } from '../../redux/auth/auth.selectors';
import useGlobalStyle from '../../common.style';
import {
	Button,
	Box,
	Typography,
	DialogTitle as MuiDialogTitle,
	Slide,
	Dialog,
	CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { apiUrl } from '../../utils/render.utils';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bool } from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

function AlertDialogSlide({ open, handleClose, id, user, type }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = usePageStyle();
	const globalClasses = useGlobalStyle();
	let cancelToken;

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Query ID
	const [queryId, setQueryID] = React.useState(null);
	const [successMessage, setSuccessMessage] = React.useState(null);

	const validationSchema = Yup.object({
		name: Yup.string('Invalid name')
			.matches(/^[a-zA-Z ]+$/, 'Invalid Name')
			.required('Name required'),
		email: Yup.string('Invalid email')
			.email('Invalid email')
			.required('Email required'),
		phoneNumber: Yup.string('Invalid number')
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});

	const validationSchemaOTP = Yup.object({
		otp: Yup.string('Invalid OTP')
			.length(4, '4 digits required')
			.matches(/^[0-9]+$/, 'Invalid OTP')
			.required('OTP Required'),
	});

	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
		message: '',
		open,
	};

	React.useEffect(() => {
		if (!open) {
			setSuccessMessage(null);
			setQueryID(null);
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		}
	}, [open]);

	const submitForm = async (values) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const res = await axios.post(
				apiUrl('/queries/project'),
				{
					userName: values.name,
					email: values.email,
					phoneNumber: values.phoneNumber,
					sendOTP: values.phoneNumber !== user.number,
					type,
					project: id,
				},
				{
					cancelToken: cancelToken.token,
				}
			);
			if (values.phoneNumber !== user.number) {
				setQueryID(res.data.data.query.id);
			} else {
				setSuccessMessage(
					'Thank you for showing interest, we will get back to you soon'
				);
			}
			setAsyncState({
				error: null,
				loading: false,
			});
		} catch (error) {
			setQueryID(null);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};
	const submitFormOTP = async (values) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			await axios.post(
				apiUrl('/queries/project/validate-otp'),
				{
					id: queryId,
					otp: values.otp,
				},
				{
					cancelToken: cancelToken.token,
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			setSuccessMessage(
				'Thank you for showing interest, we will get back to you soon'
			);
		} catch (error) {
			// setQueryID(null);
			setSuccessMessage(null);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};

	const buttonProps = {};

	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				fullScreen={fullScreen}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Please tell us something about yourself
				</DialogTitle>
				<div className={classes.formWrapper}>
					{asyncState.error && (
						<p className={globalClasses.errorMessage}>
							{asyncState.error}
						</p>
					)}
					{successMessage ? (
						<p className={globalClasses.successMessage}>
							{successMessage}
						</p>
					) : queryId ? (
						<Formik
							initialValues={{ otp: '' }}
							validationSchema={validationSchemaOTP}
							onSubmit={submitFormOTP}
							enableReinitialize
						>
							{() => (
								<Form>
									<TextField
										name="otp"
										formLabel="OTP *"
										type="text"
										disabled={asyncState.loading}
									/>

									<Box
										mt="1rem"
										display="flex"
										justifyContent="center"
									>
										<Button
											color="primary"
											variant="contained"
											type="submit"
											{...buttonProps}
										>
											Submit
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					) : (
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={submitForm}
							enableReinitialize
						>
							{() => (
								<Form>
									<TextField
										name="name"
										formLabel="Name *"
										type="text"
										disabled={asyncState.loading}
									/>
									<TextField
										name="email"
										formLabel="Email *"
										disabled={asyncState.loading}
									/>
									<TextField
										formLabel="Phone Number *"
										name="phoneNumber"
										disabled={asyncState.loading}
									/>
									<TextField
										formLabel="Message (Optional)"
										name="message"
										rows={4}
										multiline
										disabled={asyncState.loading}
									/>
									<Box
										mt="1rem"
										display="flex"
										justifyContent="center"
									>
										<Button
											color="primary"
											variant="contained"
											type="submit"
											{...buttonProps}
											disabled={asyncState.loading}
										>
											Submit
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					)}
				</div>
			</Dialog>
		</div>
	);
}

AlertDialogSlide.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	user: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
	}),
	type: PropTypes.oneOf(['project', 'projectproperty']),
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(AlertDialogSlide);
