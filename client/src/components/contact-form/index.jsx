import * as Yup from 'yup';

import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
	asyncAddContact,
	asyncValidateContact,
} from '../../utils/asyncUserContact';

import { Alert } from '@material-ui/lab';
import FormInput from '../formik/textField.component';
import OtpInput from 'react-otp-input';
import RowTextArea from '../formik/textArea.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from './contact-form.style';
import { withAsync } from '../../hoc/withAsync';
import { yupValidation } from '../../utils/validation.utils';

const ContactForm = ({ user, loading, setLoading, error, setError }) => {
	const style = useStyles();
	const createValidation = Yup.object({
		phoneNumber: yupValidation.mobileNumber,
		email: yupValidation.email,
		name: Yup.string().required('Enter your name'),
	});

	// state
	const [id, setId] = useState(null);
	const [success, setSuccess] = useState(false);
	const [otp, setOTP] = useState(false);

	const onReset = () => {
		setId(null);
		setOTP(null);
		setSuccess(false);
	};

	const createContact = async (values) => {
		try {
			setLoading(true);
			setError('');
			const resp = await asyncAddContact(values);
			setId(resp.contact.id);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setId(null);
			setError(error.message);
		}
	};

	const validateOTP = async () => {
		try {
			setLoading(true);
			setError('');
			await asyncValidateContact(id, otp);
			setLoading(false);
			setSuccess(true);
		} catch (error) {
			setSuccess(false);
			setError(error.message);
			setLoading(false);
		}
	};

	const onSubmitForm = async (values) => {
		if (id && otp) {
			validateOTP();
		} else {
			createContact(values);
		}
	};
	return (
		<div>
			{success ? (
				<Alert severity="success">We will get back to you soon</Alert>
			) : (
				<Formik
					initialValues={{
						phoneNumber: user.number,
						name: user.name,
						email: user.email,
						message: '',
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
									<RowTextArea
										name="message"
										formLabel="Message"
										placeholder="Message"
										error={errors.message}
										multiline={true}
										rows={5}
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
								<>
									<Typography
										style={{ color: 'red' }}
										variant="caption"
									>
										{error}
									</Typography>{' '}
									<br />
									{id && (
										<Button onClick={onReset}>
											Enter another number
										</Button>
									)}
								</>
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
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(withAsync(ContactForm));
