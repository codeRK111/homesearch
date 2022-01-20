import {
	Box,
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import React from 'react';
import { asyncAddPackage } from '../../API/package';

export type AddPackageFormState = {
	name: string;
	actualPrice: number;
	price: number;
	packageDetails: Array<{ detail: string; detailType: 'present' | 'absent' }>;
	category: string;
};

interface Props {
	onSuccess: () => void;
}

const AddPackageForm: React.FC<Props> = ({ onSuccess }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const initialData: AddPackageFormState = {
		name: '',
		actualPrice: 0,
		price: 0,
		packageDetails: [],
		category: '',
	};

	const onSubmit = async (
		values: AddPackageFormState,
		helpers: FormikHelpers<AddPackageFormState>
	) => {
		try {
			await asyncAddPackage(values);
			helpers.resetForm();
			onSuccess();
			setSnackbar({
				open: true,
				message: 'Package created successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	return (
		<div>
			<Formik initialValues={initialData} onSubmit={onSubmit}>
				{({ values, isSubmitting }) => (
					<Form>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<FSelect
									name={'category'}
									label="Package Category"
									showNone={false}
								>
									<MenuItem value={'tenant'}>Tenant</MenuItem>
									<MenuItem value={'builder'}>
										Builder
									</MenuItem>
									<MenuItem value={'realtor'}>
										Realtor
									</MenuItem>
									<MenuItem value={'owner'}>Owner</MenuItem>
									<MenuItem value={'buyer'}>Buyer</MenuItem>
								</FSelect>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									variant="filled"
									name="name"
									label="Package Name"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									variant="filled"
									name="actualPrice"
									label="Actual Price"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									variant="filled"
									name="price"
									label="Sale Price"
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6" gutterBottom>
									Features
								</Typography>
								<FieldArray
									name="packageDetails"
									render={(arrayHelpers) => (
										<Grid container spacing={3}>
											{values.packageDetails.map(
												(c, i) => (
													<Grid
														item
														key={i}
														xs={12}
														md={6}
													>
														<FTextField
															variant="filled"
															name={`packageDetails.${i}.detail`}
														/>
														<FSelect
															name={`packageDetails.${i}.detailType`}
															label="Type"
															showNone={false}
														>
															<MenuItem
																value={
																	'present'
																}
															>
																Included
															</MenuItem>
															<MenuItem
																value={'absent'}
															>
																Not Included
															</MenuItem>
														</FSelect>
														<Button
															type="button"
															onClick={() =>
																arrayHelpers.remove(
																	i
																)
															}
															variant="contained"
															color="secondary"
														>
															Remove Feature
														</Button>
													</Grid>
												)
											)}
											<Box mt="1rem">
												<button
													type="button"
													onClick={() =>
														arrayHelpers.push({
															detail: '',
															detailType:
																'present',
														})
													}
												>
													+
												</button>
											</Box>
										</Grid>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									endIcon={
										isSubmitting ? (
											<CircularProgress
												size={20}
												color="inherit"
											/>
										) : (
											<></>
										)
									}
								>
									Add Package
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddPackageForm;
