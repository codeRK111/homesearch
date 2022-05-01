import * as Yup from 'yup';

import { Button, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import { asyncAddGST } from '../../API/gst';

export interface AddGSTInputData {
	number: string;
	gstType: 'igst' | 'other';
	cgst?: null | number;
	sgst?: null | number;
	igst?: null | number;
}

export const AddGSTForm: React.FC<{
	onSuccess?: (lead?: any) => void;
}> = ({ onSuccess }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		gstType: Yup.mixed().oneOf(['igst', 'other']).required('gstType'),
		number: Yup.string().required('Please provide GST Number'),
		cgst: Yup.mixed().when('gstType', {
			is: (val: AddGSTInputData['gstType']) => val === 'other',
			then: Yup.number()
				.typeError('CGST must be a number')
				.required('cgst required'),
		}),
		sgst: Yup.mixed().when('gstType', {
			is: (val: AddGSTInputData['gstType']) => val === 'other',
			then: Yup.number()
				.typeError('SGST must be a number')
				.required('sgst required'),
		}),
		igst: Yup.mixed().when('gstType', {
			is: (val: AddGSTInputData['gstType']) => val === 'igst',
			then: Yup.number()
				.typeError('IGST must be a number')
				.required('igst required'),
		}),
	});
	const initialValues: AddGSTInputData = {
		number: '',
		gstType: 'igst',
		cgst: null,
		sgst: null,
		igst: null,
	};

	// State
	const [loading, setLoading] = useState(false);

	const onSubmit = async (
		values: AddGSTInputData,
		helpers: FormikHelpers<AddGSTInputData>
	) => {
		try {
			if (values.gstType === 'igst') {
				values.cgst = null;
				values.sgst = null;
			} else {
				values.igst = null;
			}
			setLoading(true);
			await asyncAddGST(values);
			helpers.resetForm();
			setLoading(false);
			if (onSuccess) {
				onSuccess();
			}
			setSnackbar({
				open: true,
				message: 'GST Posted successfully',
				severity: 'success',
			});
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
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
						{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FTextField
									name={'number'}
									label="GST Number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FSelect
									name={'gstType'}
									label="GST Type"
									showNone={false}
								>
									<MenuItem value={'igst'}>IGST</MenuItem>
									<MenuItem value={'other'}>Other</MenuItem>
								</FSelect>
							</Grid>
							{values.gstType === 'igst' && (
								<Grid item xs={12}>
									<FTextField
										name={'igst'}
										label="IGST(%)"
										type="number"
									/>
								</Grid>
							)}
							{values.gstType === 'other' && (
								<>
									<Grid item xs={12}>
										<FTextField
											name={'cgst'}
											label="CGST(%)"
											type="number"
										/>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'sgst'}
											label="SGST(%)"
											type="number"
										/>
									</Grid>
								</>
							)}
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
	);
};
