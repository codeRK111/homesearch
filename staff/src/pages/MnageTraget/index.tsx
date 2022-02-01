import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { futureYears, months } from '../../utils/render';

import { FetchAdminResponse } from '../../model/staff.interface';
import FetchTarget from './fetchTarget';
import Loader from '../../components/Loader';
import { asyncAssignTarget } from '../../API/payment';
import { asyncFetchAdmins } from '../../API/auth';

const percentages = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const ManageTraget = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const d = new Date();
	const [fetchLoading, setFetchLoading] = useState(false);
	const [assignLoading, setAssignLoading] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState('');
	const [year, setYear] = useState(2022);
	const [incentivePercentage, setIncentivePercentage] = useState(20);
	const [targetAmount, setTargetAmount] = useState<string | number>(0);
	const [month, setMonth] = useState(d.getMonth());
	const [adminsData, setAdminsData] = useState<FetchAdminResponse>({
		admins: [],
		totalDocs: 0,
	});

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedAdmin(event.target.value as string);
	};
	const handleChangeYear = (event: React.ChangeEvent<{ value: unknown }>) => {
		setYear(event.target.value as number);
	};
	const handleChangeMonth = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setMonth(event.target.value as number);
	};
	const handleChangeIncentive = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setIncentivePercentage(event.target.value as number);
	};
	const fetchAdmins = useCallback(async () => {
		try {
			setFetchLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				page: 1,
				limit: 100,
			});
			setFetchLoading(false);
			setAdminsData(resp);
		} catch (error) {
			setFetchLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAdmins();
	}, [fetchAdmins]);

	const onAssign = async () => {
		try {
			if (!selectedAdmin) return;
			setAssignLoading(true);
			const input = {
				targetAmount,
				incentivePercentage,
				year,
				month,
				staff: selectedAdmin,
			};
			await asyncAssignTarget(input);
			setAssignLoading(false);
			setSnackbar({
				open: true,
				message: 'Assigned Successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setAssignLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};
	return (
		<Container>
			<Loader open={fetchLoading} />
			<Box mt="2rem">
				<Typography variant="h5" gutterBottom>
					Assign Target
				</Typography>
				<Box>
					<FormControl variant="filled" fullWidth>
						<InputLabel htmlFor="filled-age-native-simple">
							Select A Staff
						</InputLabel>
						<Select
							native
							value={selectedAdmin}
							onChange={handleChange}
						>
							{adminsData.admins.map((c) => (
								<option value={c.id}>{c.name}</option>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box mt="2rem">
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Select A Year
								</InputLabel>
								<Select
									native
									value={year}
									onChange={handleChangeYear}
								>
									{futureYears.map((c, i) => (
										<option value={c} key={i}>
											{c}
										</option>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Select A Month
								</InputLabel>
								<Select
									native
									value={month}
									onChange={handleChangeMonth}
								>
									{months.map((c, i) => (
										<option value={i} key={i}>
											{c}
										</option>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Incentive Percentage
								</InputLabel>
								<Select
									native
									value={incentivePercentage}
									onChange={handleChangeIncentive}
								>
									{percentages.map((c, i) => (
										<option value={c} key={i}>
											{c}
										</option>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								type="number"
								value={targetAmount}
								onChange={(e) =>
									setTargetAmount(e.target.value)
								}
								variant="filled"
								fullWidth
								label="Target Amount"
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								onClick={onAssign}
								disabled={assignLoading}
								endIcon={
									assignLoading ? (
										<CircularProgress
											size={20}
											color="inherit"
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
				</Box>
			</Box>
			<Box mt="2rem">
				<FetchTarget admins={adminsData.admins} />
			</Box>
		</Container>
	);
};

export default ManageTraget;
