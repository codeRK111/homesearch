import { Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import ErrorMessage from '../errorMessage/errorMessage.component';
import React from 'react';
import TextField from '../formik/textField.component';
import TextFieldPassword from '../formik/textFieldPassword.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginSchema } from './login.utils';
import makeStyles from './loginform.styles';
import { selectSignInLoading } from '../../redux/auth/auth.selectors';
import { signIn } from '../../redux/auth/auth.actions';

// Custom components

// Redux

const LoginForm = ({ signInLoading, signIn }) => {
	const classes = makeStyles();
	const history = useHistory();
	const [asyncError, setAsyncError] = React.useState(null);

	const handlesignIn = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data);
			history.push('/');
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
			enableReinitialize={true}
			validationSchema={loginSchema}
			onSubmit={onSubmit}
		>
			{() => (
				<Form className={classes.form}>
					{asyncError && (
						<ErrorMessage
							message={asyncError}
							onClear={() => setAsyncError(null)}
						/>
					)}
					<TextField
						name="email"
						formLabel="Email Address *"
						type="email"
					/>
					<TextFieldPassword name="password" formLabel="Password *" />
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{signInLoading ? 'Authenticating ...' : 'Sign In'}
					</Button>
					<Grid container>
						<Grid item xs={12} md={6}>
							<Link to="/reset-password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item xs={12} md={6}>
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
