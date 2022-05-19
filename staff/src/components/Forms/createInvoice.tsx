import * as Yup from 'yup';

import { Button, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
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
	serviceProvidedBy: string;
	description: string;
	discount: number;
	gst: string;
	invoiceId?: number;
	date?: Date;
	paymentStatus: 'paid' | 'unpaid';
	amountAfterGST: number;
	sgstPercentage: number;
	sgstAmount: number;
	cgstPercentage: number;
	cgstAmount: number;
	igstPercentage: number;
	igstAmount: number;
	amountAfterDiscount: number;
}

export const CreateInvoiceForm: React.FC<{
	onSuccess?: (lead?: any) => void;
}> = ({ onSuccess }) => {
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
		gst: Yup.string().required('Please choose a gst number'),
	});
	const initialValues: CreateInvoiceFormData = {
		number: '',
		email: '',
		name: '',
		amount: 0,
		serviceProvidedBy: '',
		description: '',
		discount: 0,
		gst: '',
		invoiceId: 0,
		date: new Date(),
		paymentStatus: 'paid',
		sgstPercentage: 9,
		sgstAmount: 0,
		cgstPercentage: 9,
		cgstAmount: 0,
		igstPercentage: 18,
		igstAmount: 0,
		amountAfterGST: 0,
		amountAfterDiscount: 0,
	};

	// State
	const [loading, setLoading] = useState(false);

	const onSubmit = async (
		values: CreateInvoiceFormData,
		helpers: FormikHelpers<CreateInvoiceFormData>
	) => {
		setLoading(true);
		await asyncCreateAndDownloadInvoice(values);
		setLoading(false);
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
								<FTextField
									name={'amountAfterDiscount'}
									type="number"
									label="Amount after discount *"
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<FTextField
									name={'gst'}
									type="string"
									label="GST Number"
								/>
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
									name={'sgstPercentage'}
									label="SGST Percentage"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'sgstAmount'}
									label="SGST Amount"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'cgstPercentage'}
									label="CGST Percentage"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'cgstAmount'}
									label="CGST Amount"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'igstPercentage'}
									label="IGST Percentage"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'igstAmount'}
									label="IGST Amount"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'amountAfterGST'}
									label="Amount after GST"
									type="number"
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<FSelect
									name={'paymentStatus'}
									label="Payment Status"
									showNone={false}
								>
									<MenuItem value={'paid'}>Paid</MenuItem>
									<MenuItem value={'unpaid'}>Unpaid</MenuItem>
								</FSelect>
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
