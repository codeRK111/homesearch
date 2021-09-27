import * as Yup from 'yup';

import { Box, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { sendOtp, validateOtp } from '../../../utils/asyncUser';

import OtpInput from 'react-otp-input';
import TextField from '../../../components/formik/textFieldDefault.component';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/auth/auth.actions';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useGlobalClasses from '../../../common.style';
import useStyles from '../userProfile/userProfile.style';
import { yupValidation } from '../../../utils/validation.utils';

const numberValidation = Yup.object({
	number: yupValidation.mobileNumber,
});

const UpdateMyNumber = ({ fetchMyInfo, user, setSnackbar }) => {
	const classes = useStyles();
	const gClasses = useGlobalClasses();
	const cancelToken = useRef(null);
	const [otp, setOTP] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [sendOTPLoading, setSendOTPLoading] = useState(false);
	const [updateNumberLoading, setUpdateLoading] = useState(false);

	const onSendOtp = async (values, setErrors) => {
		try {
			cancelToken.current = axios.CancelToken.source();

			setSendOTPLoading(true);
			await sendOtp(
				{
					number: values.number,
				},
				cancelToken.current,
				setSendOTPLoading
			);

			setSnackbar({
				open: true,
				message: 'OTP Sent Successfully',
				severity: 'success',
			});
			setOtpSent(true);
			setPhoneNumber(values.number);
		} catch (error) {
			setSnackbar({
				open: true,
				message: error,
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
			await validateOtp(
				{
					number: phoneNumber,
					otp,
				},
				cancelToken.current,
				setUpdateLoading
			);

			setSnackbar({
				open: true,
				message: 'Number updated successfully',
				severity: 'success',
			});
			setOtpSent(true);
			setPhoneNumber(values.number);
			fetchMyInfo();
		} catch (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	};

	const onNumberUpdate = (values, { setErrors }) => {
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
		<Formik
			initialValues={{
				number: user.number,
				otp: '',
			}}
			enableReinitialize
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
								<Typography variant="caption" color="error">
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
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(UpdateMyNumber);
