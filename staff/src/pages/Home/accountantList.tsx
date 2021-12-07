import {
	Box,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { FetchAdminResponse, StaffType } from '../../model/staff.interface';
import {
	FetchSubscriptionResponse,
	asyncFetchSubscriptionRevenue,
	asyncFetchSubscriptions,
} from '../../API/payment';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import {
	months,
	paymentModes,
	toHumanReadable,
	years,
} from '../../utils/render';

import TablePagination from '../../components/Table/pagination';
import TenantSubscriptionTable from '../../components/Table/payment/subscription';
import { asyncFetchAdmins } from '../../API/auth';

const AccountantList = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [bdmLoading, setBdmLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [revenueLoading, setRevenueLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [year, setYear] = useState('');
	const [paymentMode, setPaymentMode] = useState('');
	const [month, setMonth] = useState<string | number>('');
	const [revenue, setRevenue] = useState<number>(0);
	const [data, setData] = useState<FetchSubscriptionResponse>({
		totalDocs: 0,
		subscriptions: [],
	});
	const [adminData, setAdminData] = useState<FetchAdminResponse>({
		admins: [],
		totalDocs: 0,
	});
	const [createdBy, setCreatedBy] = useState('');

	// Callback
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};
	const handleChangeCreatedBy = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCreatedBy((event.target as HTMLInputElement).value);
	};
	const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (value === '' && month !== '') {
			setMonth('');
		}
		setYear((event.target as HTMLInputElement).value);
	};
	const handleChangeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (value !== '' && year === '') {
			setSnackbar({
				open: true,
				message: 'Please select a year',
				severity: 'error',
			});
			return;
		}
		setMonth(value === '' ? '' : Number(value));
	};

	const handleChangePaymentMode = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = (event.target as HTMLInputElement).value;

		setPaymentMode(value);
	};

	// Fetch subscriptios
	const fetchSubscriptions = useCallback(async () => {
		try {
			setLoading(true);
			const filter: any = {
				page,
				limit,
				dealBy: createdBy,
				year,
				month,
				paymentMode,
			};

			const resp = await asyncFetchSubscriptions(filter);
			setData(resp);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setData({
				totalDocs: 0,
				subscriptions: [],
			});
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit, createdBy, year, month, paymentMode]);

	const fetchRevenue = useCallback(async () => {
		try {
			setRevenueLoading(true);
			const filter: any = { dealBy: createdBy, year, month, paymentMode };

			const { totalAmount: resp } = await asyncFetchSubscriptionRevenue(
				filter
			);
			if (resp[0] && resp[0]['total']) {
				setRevenue(resp[0]['total']);
			} else {
				setRevenue(0);
			}

			setRevenueLoading(false);
		} catch (error: any) {
			setRevenueLoading(false);
			setRevenue(0);
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createdBy, year, month, paymentMode]);

	const fetchAdmins = useCallback(async () => {
		try {
			setBdmLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				types: [
					StaffType.ClientSupport,
					StaffType.SuperAdmin,
					StaffType.AssistantSalesManager,
					StaffType.SalesExecutive,
				],
			});
			setBdmLoading(false);
			setAdminData(resp);
		} catch (error) {
			setBdmLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSubscriptions();
	}, [fetchSubscriptions]);
	useEffect(() => {
		fetchRevenue();
	}, [fetchRevenue]);

	useEffect(() => {
		fetchAdmins();
	}, [fetchAdmins]);

	return (
		<Box mt="1rem">
			<p> </p>
			{bdmLoading ? (
				<CircularProgress size={15} color="inherit" />
			) : (
				<FormControl component="fieldset">
					<FormLabel component="legend">Posted By</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={createdBy}
						onChange={handleChangeCreatedBy}
						row
					>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="All"
						/>
						{adminData.admins.map((c) => (
							<FormControlLabel
								value={c.id}
								key={c.id}
								control={<Radio />}
								label={c.name}
							/>
						))}
					</RadioGroup>
				</FormControl>
			)}

			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">Year</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={year}
						onChange={handleChangeYear}
						row
					>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="All"
						/>
						{years.map((c, i) => (
							<FormControlLabel
								value={c}
								key={i}
								control={<Radio />}
								label={c}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Box>
			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">Month</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={month}
						onChange={handleChangeMonth}
						row
					>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="All"
						/>

						{months.map((c, i) => (
							<FormControlLabel
								value={i}
								key={i}
								control={<Radio />}
								label={c}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Box>
			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">Payment Mode</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={paymentMode}
						onChange={handleChangePaymentMode}
						row
					>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="All"
						/>

						{paymentModes.map((c, i) => (
							<FormControlLabel
								value={c}
								key={i}
								control={<Radio />}
								label={c}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Box>
			<Box mt="1rem" mb="1rem" display="flex" alignItems="center">
				<Box mr="1rem">Total Revenue: </Box>
				{revenueLoading ? (
					<CircularProgress size={15} color="inherit" />
				) : (
					<Typography variant="h4">
						{toHumanReadable(revenue)}
					</Typography>
				)}
			</Box>
			<p>
				{' '}
				<b>{data.totalDocs}</b> documents found{' '}
			</p>
			<TenantSubscriptionTable
				loading={loading}
				subscriptions={data.subscriptions}
			/>
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</Box>
	);
};

export default AccountantList;
