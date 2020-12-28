import * as Yup from 'yup';

import { Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import City from '../../pages/postPropertyDetailsPage/city.component';
import ErrorMessage from '../errorMessage/errorMessage.component';
import { Link } from 'react-router-dom';
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
import { useHistory } from 'react-router-dom';
import { yupValidation } from '../../utils/validation.utils';

// import FormInput from '../forminput/forminput.component';
// import FormSelect from '../formik/selectDefault.component';

// Custom components

// Redux

const LoginForm = ({ signUp, signUpLoading }) => {
	const classes = makeStyles();
	const history = useHistory();
	const validationSchema = Yup.object({
		name: yupValidation.name,
		email: yupValidation.email,
		password: yupValidation.password,
		number: yupValidation.phoneNumber,
	});
	const [selectedCity, setSelectedCity] = React.useState({
		id: '',
		name: '',
	});
	const [asyncError, setAsyncError] = React.useState(null);

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
			{({ values, isValid }) => (
				<Form className={classes.form}>
					<TextField
						name="name"
						formLabel="Full name *"
						type="text"
					/>
					<TextField
						name="email"
						formLabel="Email Address *"
						type="email"
					/>
					<TextField
						name="password"
						formLabel="Password *"
						type="text"
					/>
					<TextField
						name="number"
						formLabel="Phone number *"
						type="text"
					/>
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
								!values.email || !values.password || !isValid
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
