import * as Yup from 'yup';

import {
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import { City } from '../../model/city.interface';
import FCheckbox from '../Formik/checkbox';
import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import { ILead } from '../../model/lead.interface';
import SearchCity from '../Search/city';

type InitialValue = ILead & {
	package: 'b' | 'oc';
};

interface SendQueryProps {
	initialValues: InitialValue;
}

const SendQuery: React.FC<SendQueryProps> = ({ initialValues }) => {
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object({
		package: Yup.mixed().oneOf(['b', 'oc']).required('package required'),
		name: Yup.string().required('name required'),
		city: Yup.object()
			.shape({
				id: Yup.string().required(),
				name: Yup.string().required(),
				state: Yup.string().required(),
			})
			.required('name required'),
		preferedLocation: Yup.string().required('Location required'),
		email: Yup.string().email('Invalid email').required('email required'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
		minPrice: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
		maxPrice: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
	});

	const onSubmit = async (
		values: ILead,
		helpers: FormikHelpers<InitialValue>
	) => {
		try {
		} catch (err: any) {}
	};
	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				enableReinitialize
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FSelect
									name={'package'}
									label="Select Package"
									showNone={false}
								>
									<MenuItem value={'b'}>Bhubaneswar</MenuItem>
									<MenuItem value={'oc'}>Other City</MenuItem>
								</FSelect>
							</Grid>
							<Grid item xs={12}>
								<FTextField name={'name'} label="Name" />
							</Grid>
							<Grid item xs={12}>
								<FTextField name={'email'} label="Email" />
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'number'}
									label="Phone Number"
								/>
							</Grid>
							<Grid item xs={12}>
								<SearchCity
									value={values.city as null | City}
									onSelect={(val) => {
										setFieldValue('city', val);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'preferedLocation'}
									label="Prefered Location"
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography variant="caption">
									Property Types
								</Typography>
								<Grid container spacing={1}>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'Flat'}
											label="Flat"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'Duplex'}
											label="Duplex"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'1RK'}
											label="1RK"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'1BHK'}
											label="1BHK"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'2BHK'}
											label="2BHK"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'3BHK'}
											label="3BHK"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'4BHK'}
											label="4BHK"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'Fully Furnished'}
											label="Fully Furnished"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'Semi Furnished'}
											label="Semi Furnished"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="propertyRequirements"
											value={'Unfurnished'}
											label="Unfurnished"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<FTextField
									name={'minPrice'}
									label="Min Budget"
								/>
							</Grid>
							<Grid item xs={6}>
								<FTextField
									name={'maxPrice'}
									label="Max Budget"
								/>
							</Grid>

							<Grid item xs={12} md={2}>
								<Button
									fullWidth
									variant={'contained'}
									color={'primary'}
									size={'large'}
									type={'submit'}
									disabled={loading}
									endIcon={
										loading ? (
											<CircularProgress
												size={20}
												color={'inherit'}
											/>
										) : (
											<></>
										)
									}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SendQuery;
