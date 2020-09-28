import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Custom components
import FormInput from '../../components/forminput/forminput.component';
import FormCheckbox from '../../components/formcheckbox/formcheckbox.component';
import { loginSchema } from './login.utils';
import makeStyles from './loginform.styles';

const LoginForm = () => {
	const classes = makeStyles();
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: '',
			}}
			validationSchema={loginSchema}
		>
			{({ values, isValid }) => (
				<Form className={classes.form}>
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
						disabled={!values.email || !values.password || !isValid}
					>
						Sign In
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

export default LoginForm;
