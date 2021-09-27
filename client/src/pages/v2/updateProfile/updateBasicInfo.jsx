import * as Yup from 'yup';

import { Box, Chip, FormGroup, Grid, Typography } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';

import ChipSelect from '../../../components/v2/chipSelect/chipSelectedFullWidth.component';
import FormikCheckbox from '../../../components/formik/checkboxDefault.component';
import SearchCity from '../../../components/searchCity';
import TextField from '../../../components/formik/textFieldDefault.component';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/auth/auth.actions';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import { updateBasicDetails } from '../../../utils/asyncUser';
import useGlobalClasses from '../../../common.style';
import useStyles from '../userProfile/userProfile.style';
import { yupValidation } from '../../../utils/validation.utils';

const basicValidation = Yup.object({
	email: yupValidation.email,
	name: Yup.string().required('Enter your name'),
	role: Yup.string().required('Select your role'),
});

const UpdateMyBasicInfo = ({ fetchMyInfo, user, setSnackbar }) => {
	const classes = useStyles();
	const gClasses = useGlobalClasses();

	const cancelToken = useRef(null);

	// State
	const [loading, setLoading] = useState(false);

	const updateBasicInfo = async (values) => {
		try {
			cancelToken.current = axios.CancelToken.source();

			await updateBasicDetails(values, cancelToken.current, setLoading);
			setSnackbar({
				open: true,
				message: 'Photo Updated successfully',
				severity: 'success',
			});

			fetchMyInfo();
		} catch (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	};

	const onBasicSubmit = (values) => {
		const clone = { ...values };
		delete clone.selectedCity;
		if (clone.role !== 'agent') {
			const excludeFields = [
				'address',
				'description',
				'companyName',
				'cities',
				'connection',
				'leads',
				'network',
				'managedPTypes',
			];
			excludeFields.forEach((c) => {
				if (clone[c]) {
					delete clone[c];
				}
			});
		}
		if (clone.cities) {
			clone.cities = clone.cities.map((c) => c.id);
		}
		if (clone.city) {
			clone.city = clone.city.id;
		}
		updateBasicInfo(clone);
	};

	return (
		<Formik
			initialValues={{
				name: user.name,
				email: user.email,
				role: user.role,
				managedPTypes: user.managedPTypes ? user.managedPTypes : [],
				connection: user.connection ? user.connection : 0,
				network: user.network ? user.network : 0,
				deals: user.deals ? user.deals : 0,
				city: user.city
					? user.city
					: {
							id: null,
							name: '',
					  },
				address: user.address ? user.address : '',
				description: user.description ? user.description : '',
				companyName: user.companyName ? user.companyName : '',
				selectedCity: {
					id: null,
					name: '',
				},
				cities: user.cities ? user.cities : [],
			}}
			enableReinitialize
			validationSchema={basicValidation}
			onSubmit={onBasicSubmit}
		>
			{({ values, setFieldValue }) => (
				<Form>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								name="name"
								label="Name"
								spacing={false}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name="email"
								label="Email"
								spacing={false}
							/>
						</Grid>
						<Grid item xs={12}>
							<SearchCity
								heading={'Your City'}
								onSelect={(c) => {
									setFieldValue('city', c);
								}}
								value={values.city}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography
								variant="caption"
								display="block"
								gutterBottom
							>
								Role
							</Typography>
							<Grid container spacing={1} justify="center">
								<Grid item xs={6} md={3}>
									<ChipSelect
										selected={values.role === 'builder'}
										onClick={() => {
											setFieldValue('role', 'builder');
										}}
									>
										Builder
									</ChipSelect>
								</Grid>
								<Grid item xs={6} md={3}>
									<ChipSelect
										selected={values.role === 'agent'}
										onClick={() => {
											setFieldValue('role', 'agent');
										}}
									>
										Realtor
									</ChipSelect>
								</Grid>
								<Grid item xs={6} md={3}>
									<ChipSelect
										selected={values.role === 'owner'}
										onClick={() => {
											setFieldValue('role', 'owner');
										}}
									>
										Owner
									</ChipSelect>
								</Grid>
								<Grid item xs={6} md={3}>
									<ChipSelect
										selected={values.role === 'tenant'}
										onClick={() => {
											setFieldValue('role', 'tenant');
										}}
									>
										Tenant
									</ChipSelect>
								</Grid>
							</Grid>
						</Grid>
						{values.role === 'agent' && (
							<>
								<Grid item xs={12}>
									<Typography
										variant="caption"
										display="block"
										gutterBottom
									>
										Types Of Property You Are Managing
									</Typography>
									<FormGroup row>
										<FormikCheckbox
											name="managedPTypes"
											value="project"
											type="checkbox"
											formLabel="Project"
										/>
										<FormikCheckbox
											name="managedPTypes"
											value="rent"
											type="checkbox"
											formLabel="Rent"
										/>
										<FormikCheckbox
											name="managedPTypes"
											value="sale"
											type="checkbox"
											formLabel="Sale"
										/>
									</FormGroup>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="address"
										placeholder="Address"
										label="Address"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="companyName"
										placeholder="Company Name"
										label="Company Name"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										name="connection"
										placeholder="Total Connection"
										label="Total Connection"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										name="network"
										placeholder="Total Network"
										label="Total Network"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										name="deals"
										placeholder="Total Deals Till Now"
										label="Total Deals Till Now"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name="description"
										placeholder="Description"
										label="Description"
										iType="textarea"
										spacing={false}
									/>
								</Grid>
								<Grid item xs={12}>
									<FieldArray
										name="cities"
										render={(arrayHelpers) => (
											<div>
												<SearchCity
													heading={
														'Cities you are managing'
													}
													onSelect={(c) => {
														setFieldValue(
															'selectedCity',
															c
														);
														if (c) {
															arrayHelpers.push(
																c
															);
														}
													}}
													value={values.selectedCity}
												/>
												<Box
													sx={{
														display: 'flex',
														justifyContent:
															'center',
														flexWrap: 'wrap',
													}}
												>
													{values.cities.map(
														(city, index) => (
															<Chip
																variant="outlined"
																key={index}
																label={
																	city.name
																}
																onDelete={() =>
																	arrayHelpers.remove(
																		index
																	)
																}
																className={
																	classes.chip
																}
															/>
														)
													)}
												</Box>
											</div>
										)}
									/>
								</Grid>
							</>
						)}
					</Grid>

					<Box mt="1rem"></Box>

					<Box mt="2rem" className={gClasses.flexCenter}>
						<button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.button}
							size="large"
						>
							{loading ? 'Updating ...' : 'Update'}
						</button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(UpdateMyBasicInfo);
