import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Custom components
import FormInput from '../forminput/forminput.component';
import { signupSchema } from './signup.utils';
import makeStyles from './signup.styles';

const LoginForm = () => {
	const classes = makeStyles();
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				number: '',
				city: '',
			}}
			validationSchema={signupSchema}
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
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="City"
						name="city"
						autoComplete="city"
						value={values.city}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={!values.email || !values.password || !isValid}
					>
						Sign Up
					</Button>
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

export default LoginForm;
