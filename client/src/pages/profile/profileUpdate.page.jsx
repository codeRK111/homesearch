import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import AppBar from '../../components/appBar/appBar.component';
import Footer from '../../components/footer/footer.component';
import ImageUpload from './imageUpload.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import useStyles from './profile.styles';

const initialValues = {
	name: '',
	email: '',
	number: '',
	city: '',
	password: '',
	mobileStatus: '',
};

const UpdateProfile = () => {
	const classes = useStyles();

	return (
		<Box>
			<AppBar />
			<Box mt="5rem" display="flex" width="100%" justifyContent="center">
				<Box className={classes.wrapper}>
					<Box mb="1rem" display="flex" justifyContent="center">
						<ImageUpload />
					</Box>
					<Formik initialValues={initialValues}>
						{({ values, setFieldValue }) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item xs={12} md={6}>
										<TextField
											name="name"
											formLabel="Name *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name="number"
											type="tel"
											formLabel="Phone number *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name="email"
											type="email"
											formLabel="Email *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name="city"
											formLabel="City *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name="password"
											formLabel="Password *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Select
											name="availability"
											formLabel="Mobile Status *"
											options={[
												{
													value: 'semi-private',
													label: 'Semiprivate',
												},
												{
													value: 'private',
													label: 'Private',
												},
												{
													value: 'public',
													label: 'Public',
												},
											]}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											className={classes.uploadButton}
										>
											Update
										</Button>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
};

export default UpdateProfile;
