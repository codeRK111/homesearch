import { Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import {
	selectSendOtpLoading,
	selectUser,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';
import { useHistory, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import BackDrop from '../backdrop/backdrop.component';
import { Button } from '@material-ui/core';
import FormInput from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeStyles from '../loginform/loginform.styles';
import { yupValidation } from '../../utils/validation.utils';

// Custom components

// Redux

const ValidateNumber = ({
	match: {
		params: { number },
	},
	sendOtpLoading,
	validateOtpLoading,
	sendOtp,
	validateOtp,
	currentUser,
}) => {
	const classes = makeStyles();
	const history = useHistory();
	const validationSchema = Yup.object({
		otp: yupValidation.OTP,
	});
	const [asyncError, setAsyncError] = React.useState(null);

	const handleSendOtp = useCallback((status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
		} else {
			setAsyncError(data);
		}
	}, []);

	const handleValidateOtp = (setErrors) => (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push('/profile');
		} else {
			setAsyncError(data);
			setErrors({ otp: data });
		}
	};

	React.useEffect(() => {
		if (currentUser.numberVerified) {
			history.push('/profile');
		}
	}, [currentUser.numberVerified, history]);
	React.useEffect(() => {
		if (number) {
			sendOtp(handleSendOtp, number);
		}
	}, [number, sendOtp, handleSendOtp]);

	const onSubmit = (values, { setErrors }) => {
		const otp = values.otp;
		validateOtp(handleValidateOtp(setErrors), number, otp);
	};
	return (
		<div>
			<BackDrop open={sendOtpLoading} />
			<Formik
				initialValues={{
					otp: '',
				}}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ values, isValid }) => (
					<Form className={classes.form}>
						<p>Plese enter OTP sent to {number}</p>
						<FormInput
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="OTP"
							name="otp"
							autoComplete="otp"
							value={values.otp}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={!values.otp || validateOtpLoading}
						>
							{validateOtpLoading ? 'Validating ...' : 'Validate'}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sendOtpLoading: selectSendOtpLoading,
	validateOtpLoading: selectValidateOtpLoading,
	currentUser: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	sendOtp: (callback, number) => dispatch(sendOtp({ number, callback })),
	validateOtp: (callback, number, otp) =>
		dispatch(validateOtp({ number, callback, otp })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ValidateNumber));
