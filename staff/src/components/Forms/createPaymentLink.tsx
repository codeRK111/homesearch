import * as Yup from 'yup';

import { Box, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { GetAllGSTSResponseType, asyncGetAllGSTs } from '../../API/gst';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import DateTimePickerComponent from '../Pickers/dateTime';
import FSelect from '../Formik/select';
import FTextField from '../Formik/input';
import { asyncCreatePaymentLink } from '../../API/payment';
import { asyncFetchAdmins } from '../../API/auth';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	linkWrapper: {
		width: 600,
		padding: '1rem',
		background: '#cccccc',
	},
	copyButton: {
		border: 'none',
		background: theme.palette.primary.main,
		color: '#ffffff',
		cursor: 'pointer',
	},
}));

export interface ICreatePaymentLinkData {
	amount: string;
	name: string;
	phone: string;
	notes: string;
	expiryDate: Date | null;
	dealBy: string;
	gst?: string;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
}

const CreatePaymentLinkForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
}) => {
	const { linkWrapper, copyButton } = useStyles();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		amount: Yup.string().required('amount required'),
		gst: Yup.string().required('gst required'),
		phone: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number'),
	});

	const initialValues: ICreatePaymentLinkData = {
		amount: '',
		name: '',
		phone: '',
		notes: '',
		expiryDate: dayjs().add(1, 'h').toDate(),
		dealBy: '',
		gst: '',
	};

	// State
	const [loading, setLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [link, setLink] = useState('');
	const [staffLoading, setStaffLoading] = useState(false);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [gstsList, setGsts] = useState<GetAllGSTSResponseType>({
		gsts: [],
		totalDocs: 0,
	});

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

	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	// Callbacks
	const onSubmit = async (
		values: ICreatePaymentLinkData,
		helpers: FormikHelpers<ICreatePaymentLinkData>
	) => {
		try {
			setLoading(true);
			const response = await asyncCreatePaymentLink(values);
			setLink(response);
			setLoading(false);
			setSnackbar({
				open: true,
				message: 'Link created successfully',
				severity: 'success',
			});
			helpers.resetForm();
			setIsCopied(false);
		} catch (err: any) {
			setLoading(false);
			setIsCopied(false);
			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
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
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
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
								<FTextField name={'amount'} label="Amount *" />
							</Grid>
							<Grid item xs={12}>
								<FTextField name={'name'} label="Client Name" />
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'phone'}
									label="Client Phone Number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'notes'}
									label="Notes"
									rows={5}
									multiline
								/>
							</Grid>
							<Grid item xs={12}>
								<DateTimePickerComponent
									label="Choose expiry date and time"
									handleDateChange={(date: Date | null) => {
										setFieldValue('expiryDate', date);
									}}
									date={values.expiryDate}
								/>
							</Grid>
							<Grid item xs={12}>
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
			{link && (
				<Box display="flex" mt="1rem">
					<Box className={linkWrapper}>{link}</Box>
					<button
						className={copyButton}
						onClick={() => {
							navigator.clipboard.writeText(link);
							setIsCopied(true);
						}}
					>
						{isCopied ? 'Copied!' : 'Copy'}
					</button>
				</Box>
			)}
		</div>
	);
};

export default CreatePaymentLinkForm;
