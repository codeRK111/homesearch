import * as Yup from 'yup';

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';

import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import { RenderByRole } from '../../../components/v2/renderByRole';
import TextField from '../../../components/formik/textField.component';
import { USER_ROLE } from '../../../utils/render.utils';
import { asyncCreateCP } from '../../../utils/asyncChanelPartner';

const validationSchema = Yup.object({
	name: Yup.string().required('name required'),
	email: Yup.string().required('email required'),
	password: Yup.string().required('password required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], "Passwords don't match!")
		.required('confirm password Required'),
	number: Yup.string()
		.length(10, '10 digits required')
		.matches(/^\d{10}$/, 'Invalid Number'),
});

const ChanelPartnerPage = ({ user }) => {
	const onSubmit = async (
		values,
		{ setSubmitting, resetForm, setFieldError }
	) => {
		try {
			setFieldError('submitError', '');
			setSubmitting(true);
			await asyncCreateCP(values);
			resetForm();
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
			setFieldError('submitError', error.message);
		}
	};
	return (
		<>
			<Nav />
			<Container>
				<Box p="1rem">
					<Typography variant="h6" align="center" gutterBottom>
						Become A Chanel Partner
					</Typography>

					<Formik
						initialValues={{
							name: user.name ? user.name : '',
							email: user.email ? user.email : '',
							number: user.number ? user.number : '',
							password: '',
							confirmPassword: '',
						}}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ values, errors, isSubmitting }) => (
							<Form>
								<Grid container spacing={3} justify="center">
									<Grid item xs={12} md={7}>
										<TextField
											formLabel="Name"
											name="name"
											disabled={!!values.name}
											error={errors['name']}
										/>
									</Grid>
									<Grid item xs={12} md={7}>
										<TextField
											formLabel="Email"
											name="email"
											disabled={!!values.email}
											error={errors['email']}
										/>
									</Grid>
									<Grid item xs={12} md={7}>
										<TextField
											formLabel="Phone Number"
											name="number"
											disabled={!!values.number}
											error={errors['number']}
										/>
									</Grid>
									<Grid item xs={12} md={7}>
										<TextField
											formLabel="Password"
											name="password"
											error={errors['password']}
										/>
									</Grid>
									<Grid item xs={12} md={7}>
										<TextField
											formLabel="Confirm Password"
											name="confirmPassword"
											error={errors['confirmPassword']}
										/>
									</Grid>
									<Grid item xs={12} md={7}>
										{errors.submitError && (
											<Typography
												color="error"
												gutterBottom
											>
												{errors.submitError}
											</Typography>
										)}
										<Button
											color="primary"
											variant="contained"
											size="large"
											fullWidth
											type="submit"
											disabled={isSubmitting}
											endIcon={
												isSubmitting ? (
													<CircularProgress
														color="inherit"
														size={20}
													/>
												) : (
													<></>
												)
											}
										>
											Next
										</Button>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</>
	);
};

export default RenderByRole(ChanelPartnerPage, USER_ROLE.Agent);
