import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import { Alert } from '@material-ui/lab';
import FTextField from '../../../components/formik/textField.component';
import FormikFilledDatePicker from '../../../components/formik/datePicker.component';
import SearchPlace from '../../../components/searchPlace';
import axios from 'axios';
import { updateBuilderBasicDetails } from '../../../utils/asyncBuilder';
import { useHistory } from 'react-router-dom';
import useStyles from './editBuilder.style';
import { withAsync } from '../../../hoc/withAsync';

const UpdateBuilderBasicDetails = ({
	builder,
	loading,
	setLoading,
	error,
	setError,
}) => {
	const classes = useStyles();
	const history = useHistory();

	const [showSuccess, setShowSuccess] = useState(false);

	// Axios Cancel Token
	const cancelToken = useRef(null);

	const redirectToBuilders = () => {
		history.push('/builders/active');
	};
	const sanitizeInput = (values) => {
		const fieldsToRemove = [
			'id',
			'_id',
			'logo',
			'photos',
			'status',
			'adminId',
			'slug',
			'createdAt',
		];
		const clone = { ...values };
		fieldsToRemove.forEach((c) => {
			if (clone[c] || clone[c] === null || clone[c] === undefined) {
				delete clone[c];
			}
		});
		if (clone.cities && clone.cities.length > 0) {
			clone.cities = values.cities.map((c) => c.id);
		}
		return clone;
	};

	const onSubmit = async (values) => {
		const body = sanitizeInput(values);
		try {
			cancelToken.current = axios.CancelToken.source();
			await updateBuilderBasicDetails(
				values.id,
				body,
				cancelToken.current,
				setLoading
			);
			setError(null);
			setShowSuccess(true);
		} catch (error) {
			setError(error);
			setShowSuccess(false);
		}
	};

	useEffect(() => {
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, []);

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}
	return (
		<div>
			{error && <p className={classes.error}>{error}</p>}
			<Formik
				initialValues={builder}
				enableReinitialize
				onSubmit={onSubmit}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Developer Name"
									label="Developer Name"
									name="developerName"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Company Name"
									label="Company Name"
									name="companyName"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Contact Number"
									label="Contact Number"
									name="phoneNumber"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Contact email"
									label="Contact email"
									name="email"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="CIN Number"
									label="CIN Number"
									name="cin"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="RERA ID"
									label="RERA ID"
									name="rera"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Total Projects"
									label="Total Projects"
									name="totalProjects"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Under construction Projects"
									label="Under construction Projects"
									name="underConstructionProjects"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Completed Projects"
									label="Completed Projects"
									name="completedProjects"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormikFilledDatePicker
									disablePast={false}
									formLabel={'Operating Since'}
									name="operatingSince"
									value={values.operatingSince}
									onChange={(value) =>
										setFieldValue('operatingSince', value)
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									formLabel="Registered Office Address"
									label="Registered Office Address"
									name="officeAddress"
									multiline={true}
									rows={3}
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									formLabel="Corporate Office Address"
									label="Corporate Office Address"
									name="corporateOfficeAddress"
									multiline={true}
									rows={3}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box>
									<Typography variant="caption" gutterBottom>
										Existing Cities
									</Typography>
								</Box>
								<Box
									component="ul"
									className={classes.chipWrapper}
								>
									{values.cities.map((data) => {
										return (
											<li key={data.id}>
												<Chip
													label={data.name}
													onDelete={() => {
														const newCities =
															values.cities.filter(
																(c) =>
																	c.id !==
																	data.id
															);
														setFieldValue(
															'cities',
															newCities
														);
													}}
													className={classes.chip}
												/>
											</li>
										);
									})}
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<SearchPlace
									type="city"
									label="Add City"
									onSelect={(c) => {
										if (
											!c ||
											values.cities.find(
												(b) => b.id === c.id
											)
										) {
											return;
										}
										const newCities = [...values.cities, c];
										setFieldValue('cities', newCities);
									}}
									padding={false}
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									formLabel="Description"
									label="Description"
									name="description"
									multiline={true}
									rows={6}
								/>
							</Grid>
							{error && (
								<Grid item xs={12}>
									<Alert
										severity="error"
										onClose={() => {
											setError(null);
										}}
									>
										This is an error alert
									</Alert>
								</Grid>
							)}
							{showSuccess && (
								<Grid item xs={12}>
									<Alert
										severity="success"
										action={
											<Button
												color="inherit"
												size="small"
												onClick={redirectToBuilders}
											>
												Go To Builders Page
											</Button>
										}
									>
										Builder Updated Successfully
									</Alert>
								</Grid>
							)}
							<Grid item xs={12}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
									disabled={loading}
									{...buttonProps}
								>
									Update Builder
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default withAsync(UpdateBuilderBasicDetails);
