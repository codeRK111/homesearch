import * as Yup from 'yup';

import { Box, Chip, Grid } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import ChipSelect from '../../../components/v2/chipSelect/chipSelectedFullWidth.component';
import React from 'react';
import SearchCity from '../../../components/searchCity';
import TextField from '../../../components/formik/textFieldDefault.component';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/auth/auth.actions';
import useGlobalClasses from '../../../common.style';
import useStyles from './userProfile.style';
import { yupValidation } from '../../../utils/validation.utils';

const basicValidation = Yup.object({
	email: yupValidation.email,
	name: Yup.string().required('Enter your name'),
	role: Yup.string().required('Select your role'),
});

const UpdateMyBasicInfo = ({ onSubmit, user, updateBasicDetailsLoading }) => {
	const classes = useStyles();
	const gClasses = useGlobalClasses();

	const onBasicSubmit = (values) => {
		const clone = { ...values };
		delete clone.city;
		if (clone.role !== 'agent') {
			const excludeFields = [
				'address',
				'description',
				'companyName',
				'cities',
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
		onSubmit(clone);
	};

	return (
		<Formik
			initialValues={{
				name: user.name,
				email: user.email,
				role: user.role,
				address: user.address ? user.address : '',
				description: user.description ? user.description : '',
				companyName: user.companyName ? user.companyName : '',
				city: {
					id: null,
					name: '',
				},
				cities: user.cities ? user.cities : [],
			}}
			validationSchema={basicValidation}
			onSubmit={onBasicSubmit}
		>
			{({ values, setFieldValue }) => (
				<Form>
					<TextField name="name" />
					<TextField name="email" />

					<Box mt="1rem">
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
					</Box>
					{values.role === 'agent' && (
						<Box mt="1rem">
							<TextField name="address" placeholder="Address" />
							<TextField
								name="description"
								placeholder="Description"
							/>
							<TextField
								name="companyName"
								placeholder="Company Name"
							/>

							<FieldArray
								name="cities"
								render={(arrayHelpers) => (
									<div>
										<SearchCity
											onSelect={(c) => {
												setFieldValue('city', c);
												if (c) {
													arrayHelpers.push(c);
												}
											}}
											value={values.city}
										/>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												flexWrap: 'wrap',
											}}
										>
											{values.cities.map(
												(city, index) => (
													<Chip
														key={index}
														label={city.name}
														onDelete={() =>
															arrayHelpers.remove(
																index
															)
														}
														className={classes.chip}
													/>
												)
											)}
										</Box>
									</div>
								)}
							/>
						</Box>
					)}
					<Box mt="2rem" className={gClasses.flexCenter}>
						<button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.button}
							size="large"
						>
							{updateBasicDetailsLoading
								? 'Updating ...'
								: 'Update'}
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
});

export default connect(null, mapDispatchToProps)(UpdateMyBasicInfo);
