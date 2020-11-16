import { Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import ErrorMessage from '../errorMessage/errorMessage.component';
import FormInput from '../forminput/forminput.component';
import FormSelect from '../formik/selectDefault.component';
import { Link } from 'react-router-dom';
import React from 'react';
import SearchCity from '../searchCity/serachCity.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeStyles from './signup.styles';
import { selectSignUpLoading } from '../../redux/auth/auth.selectors';
import { signUp } from '../../redux/auth/auth.actions';
import { signupSchema } from './signup.utils';
import { useHistory } from 'react-router-dom';

// Custom components

// Redux

const LoginForm = ({ signUp, signUpLoading }) => {
	const classes = makeStyles();
	const history = useHistory();
	const [city, selectedCity] = React.useState('');
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
		const data = { ...values, city };
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
			validationSchema={signupSchema}
			onSubmit={onSubmit}
		>
			{({ values, isValid }) => (
				<Form className={classes.form}>
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Full name"
						name="name"
						autoComplete="name"
						value={values.name}
					/>
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={values.email}
					/>
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={values.password}
					/>
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Phone number"
						name="number"
						autoComplete="number"
						value={values.number}
					/>
					<FormSelect
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

					<SearchCity setCity={selectedCity} />
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
