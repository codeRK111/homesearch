import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

// Custom components
import FormInput from '../../components/forminput/forminput.component';
import FormCheckbox from '../../components/formcheckbox/formcheckbox.component';
import { loginSchema } from './login.utils';
import makeStyles from './loginform.styles';
import ErrorMessage from '../errorMessage/errorMessage.component';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signIn } from '../../redux/auth/auth.actions';
import { selectSignInLoading } from '../../redux/auth/auth.selectors';

const LoginForm = ({ signInLoading, signIn }) => {
	const classes = makeStyles();
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);

	const handlesignIn = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data);
			history.push('/profile');
		} else {
			setAsyncError(data);
		}
	};
	const onSubmit = (values) => {
		const data = { ...values };
		signIn(handlesignIn, data);
	};
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: '',
			}}
			validationSchema={loginSchema}
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
					<FormCheckbox label="Remember me" name="rememberMe" />
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
							signInLoading
						}
					>
						{signInLoading ? 'Authenticating ...' : 'Sign In'}
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = createStructuredSelector({
	signInLoading: selectSignInLoading,
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (callback, user) => dispatch(signIn({ user, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
