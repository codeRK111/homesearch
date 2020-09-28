import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';

// Custom components
import FormInput from '../forminput/forminput.component';
import { loginSchema } from './otp.utils';
import makeStyles from './otp.styles';

const LoginForm = () => {
	const classes = makeStyles();
	return (
		<Formik
			initialValues={{
				number: '',
				otp: '',
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
						id="number"
						label="Number"
						name="number"
						autoComplete="number"
						value={values.number}
						type="number"
					/>
					<FormInput
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="otp"
						label="OTP"
						type="number"
						id="otp"
						autoComplete="current-otp"
						value={values.otp}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={!values.number || !values.otp || !isValid}
					>
						Sign In
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
