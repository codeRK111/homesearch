import * as Yup from 'yup';

import { Box, IconButton, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';

import ChipHeader from '../../../components/v2/chipHeader/chipHeader.component';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OtpInput from 'react-otp-input';
import React from 'react';
import TextField from '../../../components/formik/textFieldDefault.component';
import UpdateMyBasicInfo from './updateBasicInfo';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/auth/auth.actions';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useGlobalClasses from '../../../common.style';
import useStyles from './userProfile.style';
import { yupValidation } from '../../../utils/validation.utils';

function ScrollDialog({ open, handleClose, user, setSnackbar, fetchUser }) {
	const cancelToken = React.useRef(undefined);
	// Async State BasicDetails
	const [updateBasicDetailsLoading, setUpdateBasicDetailsLoading] =
		React.useState(false);
	const [otp, setOTP] = React.useState(false);
	const [photo, setPhoto] = React.useState(null);
	const [sendOTPLoading, setSendOTPLoading] = React.useState(false);
	const [updatePhotoLoading, setUpdatePhotoLoading] = React.useState(false);
	const [updateNumberLoading, setUpdateLoading] = React.useState(false);
	const [phoneNumber, setPhoneNumber] = React.useState(null);
	const [otpSent, setOtpSent] = React.useState(false);
	const basicValidation = Yup.object({
		email: yupValidation.email,
		name: Yup.string().required('Enter your name'),
		role: Yup.string().required('Select your role'),
	});
	const numberValidation = Yup.object({
		number: yupValidation.mobileNumber,
	});
	const descriptionElementRef = React.useRef(null);
	const classes = useStyles();
	const gClasses = useGlobalClasses();
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const handleImage = (e) => {
		const { files } = e.target;
		setPhoto(files[0]);
	};

	const onBasicSubmit = async (values) => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const token = localStorage.getItem('JWT_CLIENT');
			setUpdateBasicDetailsLoading(true);
			await axios.patch(apiUrl('/users'), values, {
				cancelToken: cancelToken.current.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			setUpdateBasicDetailsLoading(false);
			setSnackbar({
				open: true,
				message: 'Profile updated Successfully',
				severity: 'success',
			});
			fetchUser(token, (d) => {});
		} catch (error) {
			setUpdateBasicDetailsLoading(false);
			let message = '';
			if (!!error.response) {
				message = error.response.data.message;
			} else {
				message = error.message;
			}
			setSnackbar({
				open: true,
				message,
				severity: 'error',
			});
		}
	};

	const onValidateOtp = async (values, setErrors) => {
		try {
			if (String(otp).length !== 4) {
				setErrors({ otp: 'OTP required' });
				return;
			}
			cancelToken.current = axios.CancelToken.source();
			const token = localStorage.getItem('JWT_CLIENT');
			setUpdateLoading(true);
			await axios.post(
				apiUrl('/users/update-my-number'),
				{
					number: phoneNumber,
					otp,
				},
				{
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUpdateLoading(false);
			setSnackbar({
				open: true,
				message: 'Number updated successfully',
				severity: 'success',
			});
			setOtpSent(true);
			setPhoneNumber(values.number);
			fetchUser(token, (d) => {});
		} catch (error) {
			setUpdateLoading(false);
			setOtpSent(false);
			setPhoneNumber(null);
			let message = '';
			if (!!error.response) {
				message = error.response.data.message;
			} else {
				message = error.message;
			}
			setSnackbar({
				open: true,
				message,
				severity: 'error',
			});
		}
	};
	const updatePhoto = async () => {
		if (!photo) {
			setSnackbar({
				open: true,
				message: 'Please select a photo',
				severity: 'error',
			});

			return;
		}
		try {
			cancelToken.current = axios.CancelToken.source();
			const token = localStorage.getItem('JWT_CLIENT');
			const formData = new FormData();
			formData.append('photo', photo);
			setUpdatePhotoLoading(true);
			await axios.patch(apiUrl(`/users/handle-profile-image`), formData, {
				cancelToken: cancelToken.current.token,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			setUpdatePhotoLoading(false);
			setSnackbar({
				open: true,
				message: 'Photo Updated successfully',
				severity: 'success',
			});

			fetchUser(token, (d) => {});
		} catch (error) {
			setUpdatePhotoLoading(false);

			let message = '';
			if (!!error.response) {
				message = error.response.data.message;
			} else {
				message = error.message;
			}
			setSnackbar({
				open: true,
				message,
				severity: 'error',
			});
		}
	};
	const onSendOtp = async (values, setErrors) => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const token = localStorage.getItem('JWT_CLIENT');
			setSendOTPLoading(true);
			await axios.post(
				apiUrl('/users/reset-my-number-otp'),
				{
					number: values.number,
				},
				{
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSendOTPLoading(false);
			setSnackbar({
				open: true,
				message: 'OTP Sent Successfully',
				severity: 'success',
			});
			setOtpSent(true);
			setPhoneNumber(values.number);
		} catch (error) {
			setOtpSent(false);
			setPhoneNumber(null);
			setSendOTPLoading(false);
			let message = '';
			if (!!error.response) {
				message = error.response.data.message;
			} else {
				message = error.message;
			}
			setSnackbar({
				open: true,
				message,
				severity: 'error',
			});
		}
	};

	const onNumberUpdate = async (values, { setErrors }) => {
		if (user.number === values.number) {
			setSnackbar({
				open: true,
				message: 'Same number cannot be updated again',
				severity: 'error',
			});
			return;
		}
		if (otpSent) {
			onValidateOtp(values, setErrors);
		} else {
			onSendOtp(values, setErrors);
		}
	};

	return (
		<div>
			<Dialog
				open={open}
				fullWidth={true}
				maxWidth={'sm'}
				onClose={handleClose}
				scroll={'paper'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
				classes={{
					container: classes.container,
					paper: classes.paper,
				}}
			>
				<DialogTitle id="scroll-dialog-title">
					<Box
						className={clsx(
							gClasses.justifySpaceBetween,
							gClasses.alignCenter
						)}
					>
						Update Profile
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent>
					<ChipHeader title="Basic Details" />
					<UpdateMyBasicInfo
						user={user}
						updateBasicDetailsLoading={updateBasicDetailsLoading}
						onSubmit={onBasicSubmit}
					/>

					<Box mt="2rem" mb="1rem">
						<ChipHeader title="Number" />
					</Box>
					<Formik
						initialValues={{
							number: user.number,
							otp: '',
						}}
						validationSchema={numberValidation}
						onSubmit={onNumberUpdate}
					>
						{({ values, setFieldValue, errors }) => (
							<Form>
								<TextField name="number" />
								{otpSent && (
									<Box
										display="flex"
										flexDirection="column"
										width="100%"
										alignItems="center"
										mt="1rem"
									>
										<Typography variant="caption">
											Enter OTP sent to &nbsp;
											<b>{phoneNumber}</b>
										</Typography>

										<OtpInput
											value={otp}
											onChange={setOTP}
											numInputs={4}
											inputStyle={classes.otp}
											separator={<span>-</span>}
											isInputNum={true}
										/>

										{errors.otp && (
											<Typography
												variant="caption"
												color="error"
											>
												{errors.otp}
											</Typography>
										)}
									</Box>
								)}
								<Box mt="1rem" className={gClasses.flexCenter}>
									<button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.button}
										size="large"
									>
										{sendOTPLoading
											? 'Sending OTP...'
											: updateNumberLoading
											? 'Updating Number...'
											: 'Update'}
									</button>
								</Box>
							</Form>
						)}
					</Formik>
					<Box mt="2rem" mb="1rem">
						<ChipHeader title="Profile Picture" />
					</Box>
					<Box>
						{photo ? (
							<Box className={classes.imageWrapper}>
								<img
									src={URL.createObjectURL(photo)}
									alt="project"
									srcset=""
									className={classes.image}
								/>
								<Box className={classes.overlayProfilePhoto}>
									<label
										onClick={() => setPhoto(null)}
										className={gClasses.pointer}
									>
										<CloseIcon
											style={{ color: '#ffffff' }}
										/>
									</label>
								</Box>
							</Box>
						) : (
							<Box className={gClasses.flexCenter}>
								<input
									type="file"
									id={`add-photo`}
									className={classes.uploadButton}
									onChange={handleImage}
								/>
								<label
									htmlFor="add-photo"
									className={classes.uploadMore}
								>
									<CloudUploadIcon />
								</label>
							</Box>
						)}
					</Box>
					<Box mt="1rem" className={gClasses.flexCenter}>
						<button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.button}
							size="large"
							onClick={() => updatePhoto()}
						>
							{updatePhotoLoading
								? 'Updating Photo ...'
								: 'Update'}
						</button>
					</Box>
				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions> */}
			</Dialog>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
});

export default connect(null, mapDispatchToProps)(ScrollDialog);
