import * as Yup from 'yup';

import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { addUserQuery, verifyUserQuery } from '../../utils/asyncQuery';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';
import { useTheme, withStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormikField from '../formik/textFieldHOC.component';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import OtpInput from 'react-otp-input';
import Slide from '@material-ui/core/Slide';
import WithIcon from '../inputs/withIcon';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getHostName } from '../../utils/render.utils';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './query.style';
import { withAsync } from '../../hoc/withAsync';
import { yupValidation } from '../../utils/validation.utils';

// import { CBackdrop } from '../logInDialog/logInDialog.component';
const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		backgroundColor: '#e0e0e0',
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
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="h6">{children}</Typography>
				{onClose ? (
					<IconButton aria-label="close" onClick={onClose}>
						<CloseIcon />
					</IconButton>
				) : null}
			</Box>
		</MuiDialogTitle>
	);
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function QueryForm({
	open,
	handleClose,
	user,
	isAuthenticated,
	loading,
	setLoading,
	error,
	setError,
}) {
	const token = useRef(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const style = useStyles();
	const yupValidationSchema = Yup.object({
		number: yupValidation.mobileNumber,
		name: Yup.string().required('Enter your name'),
		message: Yup.string().required('Please enter your requirement'),
	});

	const [state, setState] = useState({
		name: '',
		email: '',
		number: '',
		message: '',
	});
	const [id, setId] = useState(null);
	const [success, setSuccess] = useState(false);
	const [otp, setOTP] = useState(false);

	const addQuery = async (values) => {
		try {
			const data = {
				...values,
			};
			if (user.id) {
				data.user = user.id;
			}
			token.current = axios.CancelToken.source();
			const resp = await addUserQuery(data, token.current, setLoading);
			if (resp.validate) {
				setId(resp.query.id);
			} else {
				setSuccess(true);
			}
			setError(null);
		} catch (error) {
			setId(null);
			setSuccess(false);
			setError(error);
		}
	};

	const validateQuery = async (values) => {
		try {
			token.current = axios.CancelToken.source();
			await verifyUserQuery(id, otp, token.current, setLoading);
			setId(null);
			setError(null);
			setSuccess(true);
		} catch (error) {
			setError(error);
			setSuccess(false);
		}
	};

	const onSubmitForm = (values) => {
		if (id) {
			if (!otp) {
				return;
			}
			validateQuery(values);
		} else {
			addQuery(values);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			setState({
				name: user.name,
				email: user.email,
				number: user.number,
				message: '',
			});
		} else {
			setState({
				name: '',
				email: '',
				number: '',
				message: '',
			});
		}
	}, [isAuthenticated, user]);

	useEffect(() => {
		setId(null);
		setOTP(null);
		setSuccess(null);
		setError(null);
	}, [open, setError]);

	return (
		<div>
			<Dialog
				TransitionComponent={Transition}
				// BackdropComponent={CBackdrop}
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				fullWidth={true}
				maxWidth={'sm'}
				classes={{
					paper: style.paper,
				}}
			>
				{!success && (
					<DialogTitle
						id="responsive-dialog-title"
						onClose={handleClose}
					>
						{'Please share your requirement'}
					</DialogTitle>
				)}
				{success ? (
					<Box p="1rem">
						<Typography
							align="center"
							style={{
								color: 'green',
								fintWeight: 700,
								fontSize: '1.1rem',
							}}
						>
							Thank you, for showing interest in {getHostName()}.
							We will reach out to you soon
						</Typography>
						<Box mt="1rem" display="flex" justifyContent="center">
							<button
								onClick={handleClose}
								fullWidth
								variant="contained"
								color="primary"
								size="large"
								style={{
									cursor: 'pointer',
									background: '#e0e0e0',
									display: 'flex',
									minWidth: '75px',
									justifyContent: 'center',
									borderRadius: '20px',
									boxShadow:
										'10px 10px 20px #acacac,-10px -10px 20px #ffffff',
									padding: '1rem 3rem',
									border: 'none',
								}}
							>
								Okay
							</button>
						</Box>
					</Box>
				) : (
					<Formik
						initialValues={state}
						enableReinitialize
						validationSchema={yupValidationSchema}
						onSubmit={onSubmitForm}
					>
						{({ errors }) => (
							<Form>
								<div className={style.wrapper}>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<FormikField
												placeholder="Full Name"
												type="name"
												name="name"
												Component={WithIcon}
												disabled={isAuthenticated}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<FormikField
												placeholder="Email"
												type="email"
												name="email"
												Component={WithIcon}
												disabled={isAuthenticated}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormikField
												placeholder="Phone Number"
												type="phone"
												name="number"
												Component={WithIcon}
												disabled={isAuthenticated}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormikField
												placeholder="Requirement"
												Component={WithIcon}
												name={'message'}
												multiline={true}
												rows={5}
											/>
										</Grid>
										{id && (
											<Grid item xs={12}>
												<OtpInput
													value={otp}
													onChange={setOTP}
													inputStyle={style.otp}
													numInputs={4}
													separator={<span>-</span>}
													isInputNum={true}
												/>
											</Grid>
										)}
										{error && (
											<Typography
												style={{ color: 'red' }}
												variant="caption"
											>
												{error}
											</Typography>
										)}
										<Grid item xs={12}>
											<button
												className={style.postButton}
												type="submit"
											>
												{loading ? (
													<CircularProgress
														size={15}
														color="inherit"
													/>
												) : (
													'Submit'
												)}
											</button>
										</Grid>
									</Grid>
								</div>
							</Form>
						)}
					</Formik>
				)}
			</Dialog>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	isAuthenticated: selectAuthenticated,
});

const mapActionToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapActionToProps)(withAsync(QueryForm));
