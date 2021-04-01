import * as Yup from 'yup';

import {
	Button,
	Grid,
	Box,
	CircularProgress,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import axios from 'axios';
import City from '../../pages/postPropertyDetailsPage/city.component';
import ErrorMessage from '../errorMessage/errorMessage.component';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import SearchCity from '../searchCity/serachCity.component';
import Select from '../formik/select.component';
import TextField from '../formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeStyles from './signup.styles';
import { selectSignUpLoading } from '../../redux/auth/auth.selectors';
import { signUp } from '../../redux/auth/auth.actions';
import { signupSchema } from './signup.utils';
import { yupValidation } from '../../utils/validation.utils';
import { apiUrl } from '../../utils/render.utils';

// import FormInput from '../forminput/forminput.component';
// import FormSelect from '../formik/selectDefault.component';

// Custom components

// Redux

const LoginForm = ({ signUp, signUpLoading }) => {
	const classes = makeStyles();
	const history = useHistory();
	let cancelToken;
	const validationSchema = Yup.object({
		name: yupValidation.name,
		email: yupValidation.email,
		password: yupValidation.passwordNew,
		number: yupValidation.phoneNumber,
	});
	const [selectedCity, setSelectedCity] = React.useState({
		id: '',
		name: '',
	});
	const [asyncError, setAsyncError] = React.useState(null);
	const [emailStatus, setEmailStatus] = React.useState({
		validated: false,
		loading: false,
	});
	const [numberStatus, setNumberStatus] = React.useState({
		validated: false,
		loading: false,
	});
	const [terms, setTerms] = React.useState(false);

	const handleChange = (event) => {
		setTerms(event.target.checked);
	};

	const checkEmail = async (value, setError, errors) => {
		try {
			setEmailStatus({
				validated: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const res = await axios.post(
				apiUrl(`/users/exists/email`),
				{
					data: value,
				},
				{
					cancelToken: cancelToken.token,
				}
			);
			if (res.data.data) {
				setEmailStatus({
					validated: false,
					loading: false,
				});
				setError({
					...errors,
					email: (
						<div>
							You are already registered with us.Please{' '}
							<Link to="/login">sign in</Link>
						</div>
					),
				});
			} else {
				setEmailStatus({
					validated: true,
					loading: false,
				});
			}
		} catch (error) {
			setEmailStatus({
				validated: false,
				loading: false,
			});
			setError({
				...errors,
				email:
					'We are having some problems to verify your email.Please try again later',
			});
		}
	};
	const checkNumber = async (value, setError, errors) => {
		try {
			setNumberStatus({
				validated: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const res = await axios.post(
				apiUrl(`/users/exists/number`),
				{
					data: value,
				},
				{
					cancelToken: cancelToken.token,
				}
			);
			if (res.data.data) {
				setNumberStatus({
					validated: false,
					loading: false,
				});
				setError({
					...errors,
					number: (
						<div>
							You are already registered with us.Please{' '}
							<Link to="/login">sign in</Link>
						</div>
					),
				});
			} else {
				setNumberStatus({
					validated: true,
					loading: false,
				});
			}
		} catch (error) {
			setNumberStatus({
				validated: false,
				loading: false,
			});
			setError({
				...errors,
				number:
					'We are having some problems to verify your number.Please try again later',
			});
		}
	};

	const handlesignUp = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			history.push(`/otp/${data['data']['user']['number']}`);
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (values) => {
		const data = { ...values, city: selectedCity.id };
		signUp(handlesignUp, data);
	};

	React.useEffect(() => {
		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, []);
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				number: '',
				role: 'tenant',
			}}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ values, isValid, setErrors, errors, status }) => (
				<Form className={classes.form}>
					{/* <h3>{JSON.stringify(status)}</h3>   */}
					<TextField
						name="name"
						formLabel="Full name *"
						type="text"
					/>
					<Box width="100%" display="flex" alignItems="center">
						<Box flex={1}>
							<TextField
								name="email"
								formLabel="Email Address *"
								type="email"
								disabled={emailStatus.loading}
								onBlur={() => {
									if (!errors.email && values.email) {
										checkEmail(
											values.email,
											setErrors,
											errors
										);
									}
								}}
							/>
						</Box>
						{emailStatus.loading && (
							<CircularProgress size={20} color="primary" />
						)}
					</Box>
					<TextField
						name="password"
						formLabel="Password *"
						type="text"
					/>
					<Box width="100%" display="flex" alignItems="center">
						<Box flex={1}>
							<TextField
								name="number"
								formLabel="Phone number *"
								type="text"
								onBlur={() => {
									if (!errors.number && values.number) {
										checkNumber(
											values.number,
											setErrors,
											errors
										);
									}
								}}
							/>
						</Box>
						{numberStatus.loading && (
							<CircularProgress size={20} color="primary" />
						)}
					</Box>

					<Select
						name="role"
						formLabel="Type"
						label="Type"
						options={[
							{ value: 'builder', label: 'Builder' },
							{ value: 'agent', label: 'Agent' },
							{ value: 'owner', label: 'Owner' },
							{ value: 'tenant', label: 'Tenant' },
						]}
					/>

					{/* <SearchCity setCity={selectedCity} /> */}
					<City setSelectedCity={setSelectedCity} />
					{asyncError && (
						<ErrorMessage
							message={asyncError}
							onClear={() => setAsyncError(null)}
						/>
					)}
					<FormControlLabel
						control={
							<Checkbox
								checked={terms}
								onChange={handleChange}
								name="checkedB"
								color="primary"
							/>
						}
						label={
							<div>
								Please accept{' '}
								<Link to="/">Terms and Conditions</Link>
							</div>
						}
					/>
					{signUpLoading ? (
						<p>Please wait ...</p>
					) : (
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={
								!values.email ||
								!values.password ||
								!isValid ||
								!terms
							}
						>
							Next
						</Button>
					)}
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<Link to="/login" variant="body2">
								{'Already have an account? Log in'}
							</Link>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = createStructuredSelector({
	signUpLoading: selectSignUpLoading,
});

const mapDispatchToProps = (dispatch) => ({
	signUp: (callback, user) => dispatch(signUp({ user, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
