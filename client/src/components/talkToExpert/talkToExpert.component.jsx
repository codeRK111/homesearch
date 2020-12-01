import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import {
	addContact,
	validateContactNumber,
} from '../../redux/contact/contact.actions';
import {
	selectAddContactLoading,
	selectContactValidateNumberoading,
} from '../../redux/contact/contact.selectors';

import { Box } from '@material-ui/core';
import React from 'react';
import Snackbar from '../snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useStyles from './talkToExport.styles';

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
};

const TalkToExport = ({
	addLoading,
	validateLoading,
	addContact,
	validateContactNumber,
}) => {
	const classes = useStyles();
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [severity, setSeverity] = React.useState('success');
	const [number, setNumber] = React.useState('');
	const [showValidation, setValidation] = React.useState(false);
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
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('OTP Required'),
	});
	const showSnackbar = (message, severity = 'success') => {
		setSnackbarMessage(message);
		setOpenSnackBar(true);
		setSeverity(severity);
	};

	const closeSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};

	const handleAddContact = (status, data) => {
		if (status === 'success') {
			setNumber(data.phoneNumber);
			setValidation(true);
		} else {
			setNumber('');
			setValidation(false);
			showSnackbar(data, 'error');
		}
	};

	const handleAddValidation = (status, data) => {
		if (status === 'success') {
			showSnackbar(
				'Thanks for contacting us, we will get back to you soon'
			);
		} else {
			showSnackbar(data, 'error');
		}
	};

	const submitForm = (values) => {
		addContact(handleAddContact, values);
	};
	const submitFormOTP = (values) => {
		validateContactNumber(handleAddValidation, number, values.otp);
	};
	return (
		<Box p="1rem">
			<Snackbar
				status={openSnackBar}
				handleClose={closeSnackbar}
				severity={severity}
				message={snackbarMessage}
			/>
			<h3 className={classes.center}>Request a call back</h3>
			{showValidation ? (
				<Formik
					initialValues={{ otp: '' }}
					validationSchema={validationSchemaOTP}
					onSubmit={submitFormOTP}
				>
					{() => (
						<Form>
							<TextField formLabel="OTP" name="otp" />

							<Box
								mt="2rem"
								mb="2rem"
								position="relative"
								height="40px"
							>
								<button
									className={classes.button}
									type="submit"
								>
									Submit
								</button>
							</Box>
						</Form>
					)}
				</Formik>
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={submitForm}
				>
					{() => (
						<Form>
							<TextField formLabel="Full Name" name="name" />

							<TextField
								formLabel="Email"
								type="email"
								name="email"
							/>

							<TextField
								formLabel="Phone Number"
								type="number"
								name="phoneNumber"
							/>
							<Box
								mt="2rem"
								mb="2rem"
								position="relative"
								height="40px"
							>
								<button
									className={classes.button}
									type="submit"
								>
									Submit
								</button>
							</Box>
						</Form>
					)}
				</Formik>
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	addLoading: selectAddContactLoading,
	validateLoading: selectContactValidateNumberoading,
});

const mapDispatchToProps = (dispatch) => ({
	addContact: (callback, body) => dispatch(addContact({ callback, body })),
	validateContactNumber: (callback, number, otp) =>
		dispatch(validateContactNumber({ callback, number, otp })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TalkToExport);
