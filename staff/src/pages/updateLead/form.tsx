import * as Yup from 'yup';

import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	MenuItem,
	TextField,
} from '@material-ui/core';
import {
	ClientRequirementCategory,
	ClientRequirementType,
	ILead,
	LeadUserCategory,
} from '../../model/lead.interface';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { City } from '../../model/city.interface';
import ClientRequirement from './requirement';
import FCheckbox from '../../components/Formik/checkbox';
import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import { IStaff } from '../../model/staff.interface';
import { Ptype } from '../../model/property.interface';
import SearchCity from '../../components/Search/city';
import Typography from '@material-ui/core/Typography';
import { asyncUpdateLead } from '../../API/lead';
import { useHistory } from 'react-router';

interface IUpdateLeadForm {
	initialValues: ILead & { tags?: Array<string> };
	id: string;
	onSuccess?: (data?: any) => void;
}

export interface IClientRequirementState {
	requirement: ClientRequirementType;
	category: ClientRequirementCategory;
	pType: Ptype;
	minPrice: string | number;
	maxPrice: string | number;
	action: string;
	holdDate?: Date;
	pickerDate: Date | null;
	bdm: string | IStaff | null;
	staffId?: string;
	staffType?: string;
	notInterested?: boolean;
	postProperty?: boolean;
	preferedLocation?: string;
	tags?: Array<string>;
}

const renderAction = (lead: ILead): string => {
	if (lead.stage === 2 && !lead.notInterested) {
		return 'hold';
	} else if (
		(lead.stage === 3 || lead.stage === 4) &&
		!lead.notInterested &&
		!lead.postProperty
	) {
		return 'forward';
	} else if (lead.stage === 0 && lead.notInterested) {
		return 'notInterested';
	} else if (lead.stage === 9) {
		return 'postProperty';
	} else {
		return '';
	}
};

const UpdateLeadForm: React.FC<IUpdateLeadForm> = ({
	initialValues,
	id,
	onSuccess,
}) => {
	const history = useHistory();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Invalid Name'),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
		minPrice: Yup.string()
			.matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/g, 'Invalid Number')
			.nullable(),
		maxPrice: Yup.string()
			.matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/g, 'Invalid Number')
			.nullable(),
	});

	// State
	const [loading, setLoading] = useState(false);
	const [tagText, setTagText] = useState('');
	const [clientRequirement, setRequirement] =
		useState<IClientRequirementState>({
			requirement: initialValues.requirement
				? initialValues.requirement
				: ClientRequirementType.HVP,
			category: initialValues.category
				? initialValues.category
				: ClientRequirementCategory.Sale,
			pType: initialValues.pType ? initialValues.pType : Ptype.Apartment,
			minPrice: initialValues.minPrice ? initialValues.minPrice : '',
			maxPrice: initialValues.maxPrice ? initialValues.maxPrice : '',

			action: renderAction(initialValues),
			pickerDate: initialValues.holdDate
				? initialValues.holdDate
				: new Date(),
			bdm: initialValues.bdm
				? typeof initialValues.bdm === 'string'
					? initialValues.bdm
					: (initialValues.bdm.id as string)
				: '',
			tags: initialValues.tags ? initialValues.tags : [],
		});

	const manageRequirement = (value: ClientRequirementType) => {
		setRequirement((prevState) => ({
			...prevState,
			requirement: value,
		}));
	};
	const manageStaffType = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			staffType: value,
		}));
	};
	const manageBDM = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			bdm: value,
			staffId: value,
		}));
	};
	const manageHoldDate = (value: Date | null) => {
		setRequirement((prevState) => ({
			...prevState,
			pickerDate: value,
		}));
	};
	const manageAction = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			action: value,
		}));
	};
	const manageCategory = (value: ClientRequirementCategory) => {
		setRequirement((prevState) => ({
			...prevState,
			category: value,
		}));
	};
	const managePtype = (value: Ptype) => {
		setRequirement((prevState) => ({
			...prevState,
			pType: value,
		}));
	};
	const manageMinPrice = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			minPrice: value,
		}));
	};
	const manageMaxPrice = (value: string) => {
		setRequirement((prevState) => ({
			...prevState,
			maxPrice: value,
		}));
	};

	const onSubmit = async (
		values: IUpdateLeadForm['initialValues'],
		helpers: FormikHelpers<ILead>
	) => {
		try {
			setLoading(true);
			const input = { ...values, ...clientRequirement };
			if (input.city) {
				input.city = (input.city as City).id;
			}
			input.tags = values.tags;
			console.log(input.action);
			if (input.action === 'hold') {
				if (clientRequirement.pickerDate) {
					input.hold = true;
					input.holdDate = clientRequirement.pickerDate;
				}
				if (input.bdm) {
					input.bdm = null;
				}
				if (input.postProperty) {
					delete input.postProperty;
				}
				if (input.staffType) {
					delete input.staffType;
				}
				if (input.notInterested) {
					delete input.notInterested;
				}
			} else if (input.action === 'notInterested') {
				input.hold = false;
				if (input.holdDate) {
					delete input.holdDate;
				}
				if (input.postProperty) {
					delete input.postProperty;
				}
				if (input.staffType) {
					delete input.staffType;
				}
				input.notInterested = true;
			} else if (input.action === 'postProperty') {
				input.hold = false;
				if (input.holdDate) {
					delete input.holdDate;
				}
				if (input.notInterested) {
					delete input.notInterested;
				}
				if (input.staffType) {
					delete input.staffType;
				}
				input.postProperty = true;
			} else {
				input.hold = false;
				if (input.holdDate) {
					delete input.holdDate;
				}
				if (input.postProperty) {
					delete input.postProperty;
				}
				if (input.notInterested) {
					delete input.notInterested;
				}
			}
			const requiredFields: Array<
				keyof ILead | keyof IClientRequirementState
			> = [
				'action',
				'bdm',
				'category',
				'email',
				'hold',
				'holdDate',
				'maxPrice',
				'minPrice',
				'name',
				'number',
				'pType',
				'requirement',
				'city',
				'userCategory',
				'propertyRequirements',
				'notInterested',
				'postProperty',
				'staffType',
				'staffId',
				'preferedLocation',
				'tags',
			];
			const keyss = Object.keys(input) as Array<
				keyof ILead | keyof IClientRequirementState
			>;
			keyss.forEach((c) => {
				if (!requiredFields.includes(c)) {
					delete input[c];
				}
			});
			console.log(input);
			const updatedLead = await asyncUpdateLead(id, input);
			setLoading(false);
			helpers.resetForm();

			setSnackbar({
				open: true,
				message: 'Lead Updated successfully',
				severity: 'success',
			});
			if (onSuccess) {
				onSuccess(updatedLead);
			}
		} catch (err: any) {
			console.log(err);
			setLoading(false);
			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
	};
	return (
		<div>
			<div>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{({ values, setFieldValue, errors }) => (
						<Form>
							{/* <p>
								<pre>{JSON.stringify(errors, null, 2)}</pre>
							</p> */}
							<Grid container spacing={3} justifyContent="center">
								<Grid item xs={12} md={6}>
									<FSelect
										name={'userCategory'}
										label="Category"
									>
										<MenuItem
											value={LeadUserCategory.Tenant}
										>
											Tenant
										</MenuItem>
										<MenuItem
											value={LeadUserCategory.Buyer}
										>
											Buyer
										</MenuItem>

										<MenuItem
											value={LeadUserCategory.Owner}
										>
											Owner
										</MenuItem>
										<MenuItem
											value={LeadUserCategory.Realtor}
										>
											Realtor
										</MenuItem>
										<MenuItem
											value={LeadUserCategory.Builder}
										>
											Builder
										</MenuItem>
										<MenuItem
											value={LeadUserCategory.Associate}
										>
											Associate
										</MenuItem>

										<MenuItem
											value={LeadUserCategory.Unknown}
										>
											Unknown
										</MenuItem>
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField name={'name'} label="Name" />
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField name={'email'} label="Email" />
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name={'number'}
										label="Phone Number"
										disabled={true}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<SearchCity
										value={values.city as null | City}
										onSelect={(val) => {
											setFieldValue('city', val);
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name={'preferedLocation'}
										label="Prefered Location"
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="caption"
										display="block"
										align="center"
									>
										Property Types
									</Typography>
									<Grid
										container
										spacing={1}
										justifyContent="center"
									>
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
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<FieldArray
										name="tags"
										render={(arrayHelpers) => (
											<>
												<Box
													display={'flex'}
													justifyContent="center"
													alignItems={'center'}
												>
													<TextField
														value={tagText}
														onChange={(e) =>
															setTagText(
																e.target.value
															)
														}
														label={
															'Enter a tag name'
														}
														variant="filled"
														size="small"
													/>
													<Button
														variant="contained"
														type="button"
														size="large"
														onClick={() => {
															if (tagText) {
																arrayHelpers.push(
																	tagText
																);
																setTagText('');
															}
														}}
													>
														Add
													</Button>
												</Box>
												<Box
													mt="1rem"
													display={'flex'}
													justifyContent="center"
													alignItems={'center'}
												>
													{values.tags &&
														values.tags.map(
															(c, i) => (
																<Chip
																	label={c}
																	onDelete={() =>
																		arrayHelpers.remove(
																			i
																		)
																	}
																	variant="outlined"
																	key={i}
																/>
															)
														)}
												</Box>
											</>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<ClientRequirement
										setBDM={manageBDM}
										setMax={manageMaxPrice}
										setAction={manageAction}
										setMin={manageMinPrice}
										setRequirement={manageRequirement}
										setCategory={manageCategory}
										setPType={managePtype}
										setHoldDate={manageHoldDate}
										manageStaffType={manageStaffType}
										{...clientRequirement}
									/>
								</Grid>

								<Grid item xs={12}>
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
		</div>
	);
};

export default UpdateLeadForm;
