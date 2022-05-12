import * as Yup from 'yup';

import { Button, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { GetAllGSTSResponseType, asyncGetAllGSTs } from '../../API/gst';
import React, { useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import DateTimePickerComponent from '../Pickers/dateTime';
import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import { asyncCreateAndDownloadInvoice } from '../../API/payment';

export interface CreateInvoiceFormData {
	number: string;
	email?: string;
	name: string;
	amount: number;
	gstType: 'excluded' | 'included';
	serviceProvidedBy: string;
	description: string;
	discount: number;
	gst: string;
	invoiceId?: number;
	date?: Date;
}

export const CreateInvoiceForm: React.FC<{
	onSuccess?: (lead?: any) => void;
}> = ({ onSuccess }) => {
	const [gstsList, setGsts] = useState<GetAllGSTSResponseType>({
		gsts: [],
		totalDocs: 0,
	});
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		number: Yup.string().required('Please provide Phone Number'),
		name: Yup.string().required('Please provide your name'),
		serviceProvidedBy: Yup.string()
			.required('Please enter service provided by')
			.max(30, 'Max 30 characters allowed'),
		description: Yup.string()
			.required('Please enter some description')
			.max(30, 'Max 30 characters allowed'),
		amount: Yup.number()
			.typeError('Not a valid number')
			.required('Please provide amount'),
		discount: Yup.number()
			.typeError('Not a valid number')
			.required('Please provide discounted amount'),
		gstType: Yup.mixed()
			.oneOf(['excluded', 'included'])
			.required('Please Select GST type'),
		gst: Yup.string().required('Please choose a gst number'),
	});
	const initialValues: CreateInvoiceFormData = {
		number: '',
		email: '',
		name: '',
		amount: 0,
		gstType: 'excluded',
		serviceProvidedBy: '',
		description: '',
		discount: 0,
		gst: '',
		invoiceId: 0,
		date: new Date(),
	};

	// State
	const [loading, setLoading] = useState(false);

	const onSubmit = async (
		values: CreateInvoiceFormData,
		helpers: FormikHelpers<CreateInvoiceFormData>
	) => {
		await asyncCreateAndDownloadInvoice(values);
	};

	useEffect(() => {
		(async () => {
			try {
				const resp = await asyncGetAllGSTs({ page: 1, limit: 100 });
				setGsts(resp);
			} catch (error) {}
		})();
	}, []);
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
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<FTextField
									name={'name'}
									label="Customer Name *"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FTextField
									name={'email'}
									label="Customer Email"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FTextField
									name={'number'}
									label="Customer Number *"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FTextField
									name={'amount'}
									type="number"
									label="Invoice Amount *"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FTextField
									name={'discount'}
									type="number"
									label="Discount Amount *"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FSelect
									name={'gstType'}
									label="GST Type"
									showNone={false}
								>
									<MenuItem value={'included'}>
										Included
									</MenuItem>
									<MenuItem value={'excluded'}>
										Excluded
									</MenuItem>
								</FSelect>
							</Grid>
							<Grid item md={6} xs={12}>
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
							<Grid item md={6} xs={12}>
								<FTextField
									name={'serviceProvidedBy'}
									label="Service Provided By (Max 30 characters) *"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'description'}
									label="Description (Max 30 characters) *"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'invoiceId'}
									label="Invoice ID"
									type="number"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<DateTimePickerComponent
									label="Date"
									handleDateChange={(date: Date | null) => {
										setFieldValue('date', date);
									}}
									date={values.date}
									disablePast={false}
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
	);
};
