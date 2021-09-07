import * as Yup from 'yup';

import { Box, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { createJoinRequest, verifyJoinRequest } from '../../../utils/asyncJoin';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormInput from '../../formik/textField.component';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import OtpInput from 'react-otp-input';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selectors';
import useStyles from './contactBuilder.style';
import { withAsync } from '../../../hoc/withAsync';
import { withStyles } from '@material-ui/core/styles';
import { yupValidation } from '../../../utils/validation.utils';

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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
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

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const JoinHomesearch = ({
	user,
	open,
	handleClose,
	loading,
	setLoading,
	error,
	setError,
	type = 'builder',
}) => {
	const style = useStyles();
	const token = useRef(null);

	const createValidation = Yup.object({
		phoneNumber: yupValidation.mobileNumber,
		email: yupValidation.email,
		name: Yup.string().required('Enter your name'),
	});

	// state
	const [id, setId] = useState(null);
	const [success, setSuccess] = useState(false);
	const [otp, setOTP] = useState(false);

	const createRequest = async (values) => {
		try {
			const data = {
				...values,
				type,
			};
			token.current = axios.CancelToken.source();
			const requestId = await createJoinRequest(
				data,
				token.current,
				setLoading
			);
			setId(requestId);
			setError(null);
		} catch (error) {
			setId(null);
			setError(error);
		}
	};
	const validateRequest = async (values) => {
		try {
			token.current = axios.CancelToken.source();
			await verifyJoinRequest(id, otp, token.current, setLoading);
			setId(null);
			setError(null);
			setSuccess(true);
		} catch (error) {
			setError(error);
			setSuccess(false);
		}
	};

	// Callback
	const onSubmitForm = (values) => {
		if (id) {
			if (!otp) {
				return;
			}
			validateRequest(values);
		} else {
			createRequest(values);
		}
	};

	useEffect(() => {
		setId(null);
		setOTP(null);
		setSuccess(null);
		setError(null);
	}, [open, setError]);

	return (
		<div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				TransitionComponent={Transition}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Please share your details
				</DialogTitle>
				<DialogContent
					style={{
						backgroundColor: '#e0e0e0',
					}}
				>
					{success ? (
						<Box>
							<Typography
								align="center"
								style={{
									color: 'green',
									fintWeight: 700,
									fontSize: '1.1rem',
								}}
							>
								Thank you, for showing interest in homesearch18.
								We will reach out to you soon
							</Typography>
							<Box
								mt="1rem"
								display="flex"
								justifyContent="center"
							>
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
							initialValues={{
								phoneNumber: user.number,
								name: user.name,
								email: user.email,
							}}
							validationSchema={createValidation}
							enableReinitialize
							onSubmit={onSubmitForm}
						>
							{({ errors }) => (
								<Form>
									{!id ? (
										<>
											<FormInput
												name="name"
												formLabel="Name"
												error={errors.name}
											/>
											<FormInput
												name="email"
												formLabel="Email"
												error={errors.email}
											/>
											<FormInput
												name="phoneNumber"
												formLabel="Phone Number"
												error={errors.phoneNumber}
											/>{' '}
										</>
									) : (
										<>
											<OtpInput
												value={otp}
												onChange={setOTP}
												inputStyle={style.otp}
												numInputs={4}
												separator={<span>-</span>}
												isInputNum={true}
											/>
											{/* <Typography>
												OTP will expity in <b>2</b>{' '}
												minutes
											</Typography> */}
										</>
									)}
									{error && (
										<Typography
											style={{ color: 'red' }}
											variant="caption"
										>
											{error}
										</Typography>
									)}

									<Box mt="1rem">
										<button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											disabled={loading}
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
											{!loading ? (
												id ? (
													'Validate OTP'
												) : (
													'Send OTP'
												)
											) : (
												<CircularProgress
													size={15}
													color="inherit"
												/>
											)}
										</button>
									</Box>
								</Form>
							)}
						</Formik>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(withAsync(JoinHomesearch));
