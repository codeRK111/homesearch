import * as Yup from 'yup';

import {
	AddPropertyLeadData,
	BooleanValue,
} from '../../model/propertyLead.interface';
import {
	AddPropertyPageResponse,
	asyncGetAddPropertyPageResources,
} from '../../API/page';
import {
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { City } from '../../model/city.interface';
import FCheckbox from '../Formik/checkbox';
import FRadio from '../Formik/radio';
import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import { Location } from '../../model/location.interface';
import { PFacing } from '../../model/property.interface';
import SearchCity from '../Search/city';
import SearchLocation from '../Search/location';
import { asyncAddPropertyLead } from '../../API/property';
import { renderPropertyOnFoor } from '../../utils/render';

interface IAddPropertyLeadForm {
	lat: null | number;
	lng: null | number;
	onSuccess: (id: string) => void;
}

const prepareData = (data: AddPropertyLeadData): any => {
	if (data.for === 'sale') {
		const deleteFields: Array<keyof AddPropertyLeadData> = [
			'availableFor',
			'maintainanceFee',
			'petAllowed',
		];
		deleteFields.forEach((c) => {
			if (data[c] !== undefined) {
				delete data[c];
			}
		});
	}
	return data;
};

const AddPropertyLeadForm: React.FC<IAddPropertyLeadForm> = ({
	lat,
	lng,
	onSuccess,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [fetchData, setFetchData] = useState<AddPropertyPageResponse | null>(
		null
	);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const validationSchema = Yup.object({
		name: Yup.string(),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
		minPrice: Yup.string()
			.matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g, 'Invalid Number')
			.required('Min price required'),
		maxPrice: Yup.string()
			.matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g, 'Invalid Number')
			.required('Max price required'),
		maintainanceFee: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
		superBuiltupArea: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
		carpetArea: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
	});

	const fetchResources = useCallback(async () => {
		try {
			setFetchLoading(true);
			const data = await asyncGetAddPropertyPageResources();
			setFetchData(data);
		} catch (error: any) {
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const initialValues: AddPropertyLeadData = {
		name: '',
		email: '',
		number: '',
		location: null,
		minPrice: 0,
		maxPrice: 0,
		propertyRequirements: [],
		availableFor: [],
		amenities: [],
		city: null,
		for: 'rent',
		photos: [],
		facing: PFacing.East,
		petAllowed: BooleanValue.True,
		floor: 1,
		propertyOnFloor: '',
		maintainanceFee: 0,
		superBuiltupArea: '',
		carpetArea: '',
	};

	const onSubmit = async (
		values: AddPropertyLeadData,
		helpers: FormikHelpers<AddPropertyLeadData>
	) => {
		const inputData = prepareData(values);
		try {
			setAddLoading(true);
			const resp = await asyncAddPropertyLead({ lat, lng, ...inputData });
			setAddLoading(false);
			onSuccess(resp.id);
			helpers.resetForm();
		} catch (error: any) {
			setAddLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	useEffect(() => {
		fetchResources();
	}, [fetchResources]);
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ values, setFieldValue, touched, errors }) => (
				<Form>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<FRadio
								row
								groupLabel="Property For"
								name={'for'}
								options={[
									{
										label: 'Rent',
										value: 'rent',
									},
									{
										label: 'Sale',
										value: 'sale',
									},
								]}
							/>
						</Grid>
						<Grid item xs={12}>
							<FRadio
								row
								groupLabel="Property Facing"
								name={'facing'}
								options={[
									{
										label: 'East',
										value: PFacing.East,
									},
									{
										label: 'West',
										value: PFacing.West,
									},
									{
										label: 'North',
										value: PFacing.North,
									},
									{
										label: 'South',
										value: PFacing.South,
									},
								]}
							/>
						</Grid>
						<Grid item xs={12}>
							<FTextField name={'name'} label="Client Name" />
						</Grid>
						<Grid item xs={12}>
							<FTextField
								name={'email'}
								label="Client Email"
								type="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<FTextField
								name={'number'}
								label="Client Phone Number"
							/>
						</Grid>
						<Grid item xs={12}>
							<SearchCity
								label="Enter City "
								error={touched.city ? errors.city : ''}
								value={values.city}
								onSelect={(value: City | null) => {
									setFieldValue('city', value);
								}}
							/>
						</Grid>
						{values.city && values.city.id && (
							<Grid item xs={12}>
								<SearchLocation
									label="Enter Location "
									value={values.location}
									city={values.city.id}
									error={
										touched.location ? errors.location : ''
									}
									onSelect={(value: Location | null) => {
										setFieldValue('location', value);
									}}
								/>
							</Grid>
						)}
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
										value={'5BHK'}
										label="5BHK"
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
							<FTextField name={'minPrice'} label="Min Budget" />
						</Grid>
						<Grid item xs={6}>
							<FTextField name={'maxPrice'} label="Max Budget" />
						</Grid>
						<Grid item xs={6}>
							<FTextField
								name={'superBuiltupArea'}
								label="SBA in Sq Ft"
							/>
						</Grid>
						<Grid item xs={6}>
							<FTextField
								name={'carpetArea'}
								label="CA in Sq. ft"
							/>
						</Grid>
						{values.for === 'rent' && (
							<Grid item xs={12}>
								<FTextField
									name={'maintainanceFee'}
									label="Maintainance Fee (If any)"
								/>
							</Grid>
						)}
						<Grid item xs={6}>
							<FTextField
								name={'floor'}
								label="Total Number of floor"
							/>
						</Grid>
						<Grid item xs={6}>
							<FSelect
								name={'propertyOnFloor'}
								label="Property On Floor"
								showNone={false}
							>
								{renderPropertyOnFoor(
									values.floor as number
								).map((c, i) => (
									<MenuItem value={c.value} key={i}>
										{c.label}
									</MenuItem>
								))}
							</FSelect>
						</Grid>
						{values.for === 'rent' && (
							<>
								<Grid item xs={12}>
									<Typography variant="caption">
										Available For
									</Typography>
									<Grid container spacing={1}>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Family'}
												label="Family"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Bachelors (Men)'}
												label="Bachelors (Men)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Bachelors (Women)'}
												label="Bachelors (Women)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Job holder (Men)'}
												label="Job holder (Men)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Job holder (Women)'}
												label="Job holder (Women)"
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<FSelect
										name={'petAllowed'}
										label="Pet Friendly"
										showNone={false}
									>
										<MenuItem value={BooleanValue.True}>
											Yes
										</MenuItem>
										<MenuItem value={BooleanValue.False}>
											No
										</MenuItem>
									</FSelect>
								</Grid>
							</>
						)}
						{fetchData && (
							<Grid item xs={12}>
								<Typography variant="caption">
									Amenities
								</Typography>
								<Grid container spacing={1}>
									{fetchData.amenities.map((c) => (
										<Grid item xs={6} md={2} key={c.id}>
											<FCheckbox
												type="checkbox"
												name="amenities"
												value={c.id}
												label={c.name}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
						)}

						<Grid item xs={12} md={2}>
							<Button
								fullWidth
								variant={'contained'}
								color={'primary'}
								size={'large'}
								type={'submit'}
								disabled={addLoading}
								endIcon={
									addLoading ? (
										<CircularProgress
											size={20}
											color={'inherit'}
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
	);
};

export default AddPropertyLeadForm;
