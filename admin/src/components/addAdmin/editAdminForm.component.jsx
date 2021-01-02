import { Box, Button, Chip, CircularProgress, Grid } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import CheckBox from '../formik/checkbox.component';
import DividerHeading from '../dividerHeadinng/dividerHeading.component';
import React from 'react';
import SearchCity from '../search/city.component';
import Select from '../formik/select.component';
import TextField from '../formik/textField.component';

const AddAdminForm = ({ loading, onSubmit, initialValues }) => {
	const buttonProps = {};

	const submitForm = (values, props) => {
		console.log(props);
		const data = {
			...values,
			propertyAccessCities:
				values.propertyAccessCities.length > 0
					? values.propertyAccessCities.map((c) => c.id)
					: [],
			userAccessCities:
				values.userAccessCities.length > 0
					? values.userAccessCities.map((c) => c.id)
					: [],
		};
		onSubmit(data);
	};

	if (loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box mt="1rem">
			<Formik
				initialValues={initialValues}
				onSubmit={submitForm}
				enableReinitialize
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<DividerHeading>Basic Details</DividerHeading>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									formLabel="Full name"
									name="name"
									type="text"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									formLabel="Username"
									name="username"
									type="text"
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									formLabel="Email"
									name="email"
									type="email"
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<Select
									formLabel="Gender"
									name="gender"
									options={[
										{ value: 'male', label: 'Male' },
										{
											value: 'female',
											label: 'Female',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<Select
									formLabel="Status"
									name="status"
									options={[
										{ value: 'active', label: 'Active' },
										{
											value: 'inactive',
											label: 'Inactive',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<Select
									formLabel="Type"
									name="type"
									options={[
										{
											value: 'super-admin',
											label: 'Super Admin',
										},
										{ value: 'admin', label: 'Admin' },
										{ value: 'staff', label: 'Staff' },
									]}
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<SearchCity
									setSelectedCity={setFieldValue}
									defaultValue={values.city}
								/>
							</Grid>

							<Grid item xs={12}>
								<DividerHeading>
									Property Permissions
								</DividerHeading>
								<Box mt="2rem">
									<FieldArray
										name="propertyAccessCities"
										render={(arrayHelpers) => (
											<Grid container>
												<Grid item xs={12} md={2}>
													<h5>Access Cities</h5>
												</Grid>
												<Grid item xs={12} md={4}>
													<SearchCity
														setSelectedCity={
															arrayHelpers.push
														}
														showLabel={false}
													/>
													<Box mt="1rem">
														{values.propertyAccessCities.map(
															(c, i) => (
																<Chip
																	key={i}
																	label={
																		c.name
																	}
																	onDelete={() =>
																		arrayHelpers.remove(
																			i
																		)
																	}
																/>
															)
														)}
													</Box>
												</Grid>
											</Grid>
										)}
									/>
								</Box>
								<Box>
									<Grid container>
										<Grid item xs={12} md={2}>
											<h5>Access For</h5>
										</Grid>
										<Grid item xs={12} md={1}>
											<CheckBox
												name="propertyAccess"
												value="rent"
												formLabel="Rent"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={1}>
											<CheckBox
												name="propertyAccess"
												value="sale"
												formLabel="Sale"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={1}>
											<CheckBox
												name="propertyAccess"
												value="project"
												formLabel="Project"
												type="checkbox"
											/>
										</Grid>
									</Grid>
									<Box>
										<Grid container>
											<Grid item xs={12} md={2}>
												<h5>Action</h5>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="propertyActions"
													value="create"
													formLabel="Create"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="propertyActions"
													value="view"
													formLabel="View"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="propertyActions"
													value="update"
													formLabel="Update"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={2}>
												<CheckBox
													name="propertyActions"
													value="status"
													formLabel="Change Status"
													type="checkbox"
												/>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<DividerHeading>
									User Permissions
								</DividerHeading>
								<Box mt="2rem">
									<FieldArray
										name="userAccessCities"
										render={(arrayHelpers) => (
											<Grid container>
												<Grid item xs={12} md={2}>
													<h5>Access Cities</h5>
												</Grid>
												<Grid item xs={12} md={4}>
													<SearchCity
														setSelectedCity={
															arrayHelpers.push
														}
														showLabel={false}
													/>
													<Box mt="1rem">
														{values.userAccessCities.map(
															(c, i) => (
																<Chip
																	key={i}
																	label={
																		c.name
																	}
																	onDelete={() =>
																		arrayHelpers.remove(
																			i
																		)
																	}
																/>
															)
														)}
													</Box>
												</Grid>
											</Grid>
										)}
									/>
								</Box>
								<Box>
									<Grid container>
										<Grid item xs={12} md={2}>
											<h5>Access For</h5>
										</Grid>
										<Grid item xs={12} md={2}>
											<CheckBox
												name="userAccess"
												value="self-users"
												formLabel="Self created users"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={2}>
											<CheckBox
												name="userAccess"
												value="other-staff-users"
												formLabel="Other staff created users"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={2}>
											<CheckBox
												name="userAccess"
												value="site-users"
												formLabel="Site login users"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={2}>
											<CheckBox
												name="userAccess"
												value="google-users"
												formLabel="Google users"
												type="checkbox"
											/>
										</Grid>
										<Grid item xs={12} md={2}>
											<CheckBox
												name="userAccess"
												value="facebook-users"
												formLabel="Facebook users"
												type="checkbox"
											/>
										</Grid>
									</Grid>
									<Box>
										<Grid container>
											<Grid item xs={12} md={2}>
												<h5>Action</h5>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="userActions"
													value="create"
													formLabel="Create"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="userActions"
													value="view"
													formLabel="View"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={1}>
												<CheckBox
													name="userActions"
													value="update"
													formLabel="Update"
													type="checkbox"
												/>
											</Grid>
											<Grid item xs={12} md={2}>
												<CheckBox
													name="userActions"
													value="status"
													formLabel="Change Status"
													type="checkbox"
												/>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12}>
								<Button
									type="submit"
									fullWidth
									color="primary"
									variant="contained"
									{...buttonProps}
								>
									Update Admin / Staff
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default AddAdminForm;
