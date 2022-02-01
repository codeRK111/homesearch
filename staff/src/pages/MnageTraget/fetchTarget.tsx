import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	Paper,
	Select,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { futureYears, months, toHumanReadable } from '../../utils/render';

import { IStaff } from '../../model/staff.interface';
import { StaffTarget } from '../../model/staffTarget.interface';
import { asyncFetchTargetDetails } from '../../API/payment';

interface Props {
	admins: Array<IStaff>;
}

const FetchTarget: React.FC<Props> = ({ admins }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const d = new Date();
	const [year, setYear] = useState(d.getFullYear());
	const [month, setMonth] = useState(d.getMonth());
	const [staff, setStaff] = useState('');
	const [target, setTarget] = useState<StaffTarget | null>(null);
	const [loading, setLoading] = useState(false);

	const handleChangeStaff = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setStaff(event.target.value as string);
	};
	const handleChangeYear = (event: React.ChangeEvent<{ value: unknown }>) => {
		setYear(event.target.value as number);
	};
	const handleChangeMonth = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setMonth(event.target.value as number);
	};

	const onFetch = async () => {
		if (!staff) return;
		try {
			setLoading(true);
			const resp = await asyncFetchTargetDetails({
				staff,
				month,
				year,
			});
			setTarget(resp);
			console.log(resp);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	return (
		<div>
			<Box mt="2rem">
				<Typography variant="h5" gutterBottom>
					Fetch Target
				</Typography>
				<Box>
					<FormControl variant="filled" fullWidth>
						<InputLabel htmlFor="filled-age-native-simple">
							Select A Staff
						</InputLabel>
						<Select
							native
							value={staff}
							onChange={handleChangeStaff}
						>
							{admins.map((c) => (
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
							<Button
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								onClick={onFetch}
								disabled={loading}
								endIcon={
									loading ? (
										<CircularProgress
											size={20}
											color="inherit"
										/>
									) : (
										<></>
									)
								}
							>
								Fetch Details
							</Button>
						</Grid>
					</Grid>
				</Box>
				{target && !loading && (
					<Box mt="2rem">
						<Paper>
							<Box p="1rem">
								<Typography gutterBottom>
									Name: <b>{target.staff.name}</b>
								</Typography>
								<Typography gutterBottom>
									Year: <b>{target.year}</b>
								</Typography>
								<Typography gutterBottom>
									Month: <b>{months[target.month]}</b>
								</Typography>
								<Typography gutterBottom>
									Target:{' '}
									<b>
										{toHumanReadable(target.targetAmount)}
									</b>
								</Typography>
								<Typography gutterBottom>
									Completed:{' '}
									<b>
										{toHumanReadable(
											target.completedAmount
										)}
									</b>
								</Typography>
								<Typography gutterBottom>
									Incentive (%):{' '}
									<b>{target.incentivePercentage}</b>
								</Typography>
							</Box>
						</Paper>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default FetchTarget;
