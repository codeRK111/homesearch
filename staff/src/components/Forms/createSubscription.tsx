import { CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { asyncFetchAdmins } from '../../API/auth';
import { asyncGetPackages } from '../../API/package';
import { asyncCreateSubscription } from '../../API/payment';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { PackageDetails } from '../../model/package.interface';
import { IStaff, StaffType } from '../../model/staff.interface';
import {
	SubscriptionPackageType,
	SubscriptionPaymentMode,
} from '../../model/subscription.interface';
import FTextField from '../Formik/input';
import FSelect from '../Formik/select';
import DateTimePickerComponent from '../Pickers/dateTime';
import { Button } from '../UI/Button';

export interface IcreateSubscriptionData {
	mainAmount: number;
	paidAmount: number;
	dealBy: string;
	package?: string;
	name: string;
	email: string;
	number: string;
	paymentMode: SubscriptionPaymentMode;
	packageType: SubscriptionPackageType;
	createdAt: Date;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
}

const CreateSubscriptionForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
}) => {
	// const { linkWrapper, copyButton } = useStyles();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().required('name required'),
		dealBy: Yup.string().required('Deal by required'),
		mainAmount: Yup.number().required('mainAmount required'),
		paidAmount: Yup.number().required('paidAmount required'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('number required'),
	});

	const initialValues: IcreateSubscriptionData = {
		mainAmount: 0,
		paidAmount: 0,
		dealBy: '',
		package: '',
		name: '',
		email: '',
		number: '',
		paymentMode: SubscriptionPaymentMode.Cash,
		packageType: SubscriptionPackageType.ConsultantFee,
		createdAt: new Date(),
	};

	// State
	const [loading, setLoading] = useState(false);
	const [staffLoading, setStaffLoading] = useState(false);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [packages, setPackages] = useState<PackageDetails[]>([]);

	const fetchStaffs = useCallback(async () => {
		try {
			setStaffLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				types: [
					StaffType.ClientSupport,
					StaffType.AssistantSalesManager,
					StaffType.SalesExecutive,
					StaffType.SuperAdmin,
				],
				page: 1,
				limit: 100,
			});
			setStaffLoading(false);
			setStaffs(resp.admins);
		} catch (error) {
			setStaffLoading(false);
			setStaffs([]);
		}
	}, []);

	const fetchPackages = useCallback(async () => {
		try {
			const resp = await asyncGetPackages();
			setPackages(resp);
		} catch (error) {
			setPackages([]);
		}
	}, []);

	// Callbacks
	const onSubmit = async (
		values: IcreateSubscriptionData,
		helpers: FormikHelpers<IcreateSubscriptionData>
	) => {
		try {
			setLoading(true);
			if (values.packageType !== SubscriptionPackageType.TenantPackage) {
				delete values.package;
			}
			await asyncCreateSubscription(values);
			// setLink(response);
			setLoading(false);
			let successMessage = '';
			if (values.email) {
				successMessage =
					'Subscription created and invoice sent to email successfully';
			} else {
				successMessage = 'Subscription created successfully';
			}
			setSnackbar({
				open: true,
				message: successMessage,
				severity: 'success',
			});
			helpers.resetForm();
		} catch (err: any) {
			setLoading(false);

			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
	};

	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				enableReinitialize
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FTextField
									name={'name'}
									label="Client Name *"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'email'}
									label="Client Email *"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'number'}
									label="Client Number *"
								/>
							</Grid>
							<Grid item xs={12}>
								<FSelect
									name={'packageType'}
									label="Package Type"
									showNone={false}
								>
									<MenuItem
										value={
											SubscriptionPackageType.TenantPackage
										}
									>
										Tenant Package
									</MenuItem>
									<MenuItem
										value={
											SubscriptionPackageType.PaymentLink
										}
									>
										Payment Link
									</MenuItem>
									<MenuItem
										value={
											SubscriptionPackageType.ConsultantFee
										}
									>
										Consultant Fee
									</MenuItem>
								</FSelect>
							</Grid>
							{values.packageType ===
								SubscriptionPackageType.TenantPackage && (
								<Grid item xs={12}>
									<FSelect
										name={'package'}
										label="Package"
										showNone={false}
									>
										{packages.map((c) => (
											<MenuItem value={c.id}>
												{c.name}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
							)}
							<FSelect
								name={'paymentMode'}
								label="Payment Mode"
								showNone={false}
							>
								<MenuItem
									value={SubscriptionPaymentMode.Gateway}
								>
									Razorpay
								</MenuItem>
								<MenuItem value={SubscriptionPaymentMode.Cash}>
									Cash
								</MenuItem>
							</FSelect>
							<Grid item xs={12} md={6}>
								<FSelect
									name={'dealBy'}
									label="Deal by"
									showNone={false}
								>
									{staffs.map((c) => (
										<MenuItem
											key={c.id as string}
											value={c.id as string}
										>
											{c.name}
										</MenuItem>
									))}
								</FSelect>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									name={'mainAmount'}
									label="Main Amount *"
									type="number"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									name={'paidAmount'}
									label="Paid Amount *"
									type="number"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<DateTimePickerComponent
									label="Date"
									handleDateChange={(date: Date | null) => {
										setFieldValue('createdAt', date);
									}}
									date={values.createdAt}
									disablePast={false}
								/>
							</Grid>

							<Grid item xs={12}>
								<Button
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

export default CreateSubscriptionForm;
