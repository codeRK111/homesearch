import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { GetAllGSTSResponseType, asyncGetAllGSTs } from '../../API/gst';
import { PackageBenifit, PackageDetails } from '../../model/package.interface';
import React, { useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import DeleteIcon from '@material-ui/icons/Delete';
import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import { asyncUpdatePackageDetails } from '../../API/package';

interface Props {
	onSuccess: () => void;
	data: any;
}

const UpdatePackageForm: React.FC<Props> = ({ onSuccess, data }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [gstsList, setGsts] = useState<GetAllGSTSResponseType>({
		gsts: [],
		totalDocs: 0,
	});

	useEffect(() => {
		(async () => {
			try {
				const resp = await asyncGetAllGSTs({ page: 1, limit: 100 });
				setGsts(resp);
			} catch (error) {}
		})();
	}, []);

	const onSubmit = async (
		values: any,
		helpers: FormikHelpers<PackageDetails>
	) => {
		try {
			await asyncUpdatePackageDetails(values);
			helpers.resetForm();
			onSuccess();
			setSnackbar({
				open: true,
				message: 'Package updated successfully',
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
			<Formik
				initialValues={{
					...data,
					gst: data.gst ? data.gst.id : '',
				}}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{({ values, isSubmitting }) => (
					<Form>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<FSelect
									name={'gst'}
									label="Choose GST Number"
									showNone={false}
								>
									{gstsList.gsts.map((c) => (
										<MenuItem key={c.id} value={c.id}>
											{c.number}
										</MenuItem>
									))}
								</FSelect>
							</Grid>
							<Grid item xs={12}>
								<FSelect
									name={'status'}
									label="Type"
									showNone={false}
								>
									<MenuItem value={'active'}>Active</MenuItem>
									<MenuItem value={'inactive'}>
										Inactive
									</MenuItem>
								</FSelect>
							</Grid>
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
												(
													c: PackageBenifit,
													i: number
												) => (
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
														<IconButton
															type="button"
															onClick={() =>
																arrayHelpers.remove(
																	i
																)
															}
														>
															<DeleteIcon color="secondary" />
														</IconButton>
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
									Update Package
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UpdatePackageForm;
