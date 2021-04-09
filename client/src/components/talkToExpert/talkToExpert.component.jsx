import * as Yup from 'yup';

import { Box, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	addContact,
	validateContactNumber,
} from '../../redux/contact/contact.actions';
import {
	selectAddContactLoading,
	selectContactValidateNumberoading,
} from '../../redux/contact/contact.selectors';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '../snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';
import useGlobalStyle from '../../common.style';
import useStyles from './talkToExport.styles';

const Loader = () => {
	return (
		<Box>
			<Box p="1rem">
				<Skeleton variant="rect" width={'100%'} height={50} />
			</Box>
			<Box p="1rem">
				<Skeleton variant="rect" width={'100%'} height={50} />
			</Box>
			<Box p="1rem">
				<Skeleton variant="rect" width={'100%'} height={50} />
			</Box>
		</Box>
	);
};

const TalkToExport = ({
	addLoading,
	validateLoading,
	addContact,
	validateContactNumber,
	user,
}) => {
	// Axios Cancel Token
	let cancelToken;
	const classes = useStyles();
	const globalClass = useGlobalStyle();
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
			.matches(/^[0-9]+$/, 'Invalid OTP')
			.required('OTP Required'),
	});

	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
	};

	const userNumber = React.useMemo(() => user.number, [user.number]);

	// Check Exists
	const [checkExistsState, setCheckExistsState] = React.useState({
		loading: false,
		error: null,
	});
	const [successMessage, setSuccessMessage] = React.useState(null);

	React.useEffect(() => {
		if (userNumber) {
			(async () => {
				try {
					setCheckExistsState({
						error: null,
						loading: true,
					});
					cancelToken = axios.CancelToken.source();
					await axios.get(
						apiUrl(`/contacts/check-exist/${userNumber}`),
						{ cancelToken: cancelToken.token }
					);

					setCheckExistsState({
						error: null,
						loading: false,
					});
				} catch (error) {
					// setQueryID(null);

					if (error.response) {
						setSuccessMessage(error.response.data.message);
						setCheckExistsState({
							error: null,
							loading: false,
						});
					} else {
						setCheckExistsState({
							error:
								'We are having some issues, please try again later',
							loading: false,
						});
					}
				}
			})();
		}
	}, [userNumber]);

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

	const handleAddContact = (sendOTP) => (status, data) => {
		if (status === 'success') {
			if (sendOTP) {
				setNumber(data.phoneNumber);
				setValidation(true);
			} else {
				setSuccessMessage(
					'Thanks for contacting with us,we will get back to you soon'
				);
			}
		} else {
			setNumber('');
			setValidation(false);
			showSnackbar(data, 'error');
		}
	};

	const handleAddValidation = (status, data) => {
		if (status === 'success') {
			setValidation(false);
			setSuccessMessage(
				'Thanks for contacting with us,we will get back to you soon'
			);
		} else {
			showSnackbar(data, 'error');
		}
	};

	const submitForm = (values) => {
		const sendOTP = !(values.phoneNumber === user.number);
		addContact(handleAddContact(sendOTP), {
			...values,
			sendOTP,
		});
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
			{checkExistsState.loading && <Loader />}
			<h3 className={classes.center}>Request a call back</h3>
			<p className={globalClass.successMessage}>{successMessage}</p>
			<p className={globalClass.errorMessage}>{checkExistsState.error}</p>
			{!successMessage &&
			!checkExistsState.error &&
			!checkExistsState.loading ? (
				showValidation ? (
					<Formik
						initialValues={{ otp: '' }}
						enableReinitialize
						validationSchema={validationSchemaOTP}
						onSubmit={submitFormOTP}
					>
						{() => (
							<Form>
								<TextField
									formLabel="OTP"
									name="otp"
									type="text"
									inputProps={{
										autocomplete: 'new-password',
										form: {
											autocomplete: 'off',
										},
									}}
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
				) : (
					<Formik
						initialValues={initialValues}
						enableReinitialize
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
										<Box
											display="flex"
											width="100%"
											justifyContent="center"
											alignItems="center"
										>
											Submit
											{(addLoading ||
												validateLoading) && (
												<Box ml="1rem">
													<CircularProgress
														color="inherit"
														size={20}
													/>
												</Box>
											)}
										</Box>
									</button>
								</Box>
							</Form>
						)}
					</Formik>
				)
			) : (
				<></>
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	addLoading: selectAddContactLoading,
	validateLoading: selectContactValidateNumberoading,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	addContact: (callback, body) => dispatch(addContact({ callback, body })),
	validateContactNumber: (callback, number, otp) =>
		dispatch(validateContactNumber({ callback, number, otp })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TalkToExport);
