import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { asyncFetchAdmins } from '../../API/auth';
import {
	asyncFetchSubscriptionRevenue,
	asyncFetchSubscriptions,
	FetchSubscriptionResponse,
} from '../../API/payment';
import TablePagination from '../../components/Table/pagination';
import TenantSubscriptionTable from '../../components/Table/payment/subscription';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { FetchAdminResponse, StaffType } from '../../model/staff.interface';
import {
	months,
	paymentModes,
	toHumanReadable,
	typeOfPackages,
	years,
} from '../../utils/render';

const AccountantList = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [bdmLoading, setBdmLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [revenueLoading, setRevenueLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [year, setYear] = useState('');
	const [paymentMode, setPaymentMode] = useState('');
	const [packageType, setPackageType] = useState('');
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
	const handleChangePackageType = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPackageType((event.target as HTMLInputElement).value);
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
				packageType,
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
	}, [page, limit, createdBy, year, month, paymentMode, packageType]);

	const fetchRevenue = useCallback(async () => {
		try {
			setRevenueLoading(true);
			const filter: any = {
				dealBy: createdBy,
				year,
				month,
				paymentMode,
				packageType,
			};

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
	}, [createdBy, year, month, paymentMode, packageType]);

	const fetchAdmins = useCallback(async () => {
		try {
			setBdmLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				limit: 100,
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
			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">Package Types</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={packageType}
						onChange={handleChangePackageType}
						row
					>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="All"
						/>

						{typeOfPackages.map((c, i) => (
							<FormControlLabel
								value={c.value}
								key={i}
								control={<Radio />}
								label={c.label}
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
			<Box
				display="flex"
				width={'100%'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<p>
					{' '}
					<b>{data.totalDocs}</b> documents found{' '}
				</p>
				<Button variant="contained" color="primary">
					Export Table
				</Button>
			</Box>
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
