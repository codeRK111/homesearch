import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// Custom components
import FormInput from '../../components/forminput/forminput.component';
import makeStyles from '../loginform/loginform.styles';
import ErrorMessage from '../errorMessage/errorMessage.component';
import BackDrop from '../backdrop/backdrop.component';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sendOtp, validateOtp } from '../../redux/auth/auth.actions';
import {
	selectSendOtpLoading,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';

const ValidateNumber = ({
	match: {
		params: { number },
	},
	sendOtpLoading,
	validateOtpLoading,
	sendOtp,
	validateOtp,
}) => {
	const classes = makeStyles();
	const [asyncError, setAsyncError] = React.useState(null);

	const handleSendOtp = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data);
		} else {
			setAsyncError(data);
		}
	};

	const handleValidateOtp = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data);
		} else {
			setAsyncError(data);
		}
	};
	React.useEffect(() => {
		if (number) {
			sendOtp(handleSendOtp, number);
		}
	}, [number, sendOtp]);

	const onSubmit = (values) => {
		const otp = values.otp;
		validateOtp(handleValidateOtp, number, otp);
	};
	return (
		<div>
			<BackDrop open={sendOtpLoading} />
			<Formik
				initialValues={{
					otp: '',
				}}
				validate={(values) => {
					const error = {};
					if (!values.otp) {
						error.otp = 'OTP Required';
					}
					return error;
				}}
				onSubmit={onSubmit}
			>
				{({ values, isValid }) => (
					<Form className={classes.form}>
						{asyncError && (
							<ErrorMessage
								message={asyncError}
								onClear={() => setAsyncError(null)}
							/>
						)}
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
