import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@material-ui/core';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
	ILead,
} from '../../model/lead.interface';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { asyncAssignSupport, asyncFetchMyLeads } from '../../API/lead';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LeadStatusSwitch from '../../components/Switch';
import LeadsTab from '../../components/LeadsTab';
import LeadsTable from '../../components/Table/leads/gm';
import { PageWrapper } from '../../components/UI/Container';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchAdmins } from '../../API/auth';
import { isToday } from '../../utils/render';

interface IGMLeadsList {
	userCategory: any;
	leadStatus: any;
}

const GMLeadsList = ({ userCategory, leadStatus }: IGMLeadsList) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// State
	const [page, setPage] = useState(1);
	const [showHolds, setShowHolds] = useState(false);
	const [showNewLeads, setShowNewLeads] = useState(false);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [staffLoading, setStaffLoading] = useState(false);
	const [assignLoading, setAssignLoading] = useState(false);
	const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [staff, setStaff] = useState('');
	const [todayLeads, setTodayLeads] = useState<Array<ILead>>([]);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});

	// Callback

	const onAssign = async () => {
		try {
			setAssignLoading(true);
			await asyncAssignSupport(selectedLeads, staff);
			setAssignLoading(false);
			setSelectedLeads([]);
			setStaff('');
			fetchLeads();
			setSnackbar({
				open: true,
				message: 'Assigned successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setAssignLoading(false);
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	};
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	const manageSelectedLeads = (lead: string): void => {
		if (selectedLeads.includes(lead)) {
			setSelectedLeads((prevState) =>
				prevState.filter((c) => c !== lead)
			);
		} else {
			setSelectedLeads((prevState) => [...prevState, lead]);
		}
	};

	const fetchStaffs = useCallback(async () => {
		try {
			setStaffLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				type: StaffType.ClientSupport,
			});
			setStaffLoading(false);
			setStaffs(resp.admins);
		} catch (error) {
			setStaffLoading(false);
			setStaffs([]);
		}
	}, []);

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchLeadsInputType = { page, limit };
			if (showHolds) {
				filter.stage = 2;
			}
			if (showNewLeads) {
				filter.stage = 0;
			}
			if (userCategory) {
				filter.userCategory = userCategory;
			}
			if (leadStatus) {
				filter.leadStatus = leadStatus;
			}
			const resp = await asyncFetchMyLeads(filter);
			setData(resp);
			const tLeads = resp.leads.filter((c) => isToday(c.createdAt));
			setTodayLeads(tLeads);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				leads: [],
			});
			setLoading(false);
		}
	}, [page, limit, showHolds, showNewLeads, userCategory, leadStatus]);
	useEffect(() => {
		setPage(1);
	}, [limit, showHolds, showNewLeads, userCategory, leadStatus]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);
	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	return (
		<PageWrapper>
			<Typography variant="h5" gutterBottom>
				All Leads
			</Typography>
			<p>
				<b>{data.totalDocs}</b> leads found
			</p>
			<AppBar position="sticky" color="inherit" elevation={0}>
				<Box mb="1rem">
					<Grid container spacing={3} justify="center">
						<Grid item xs={6} md={3}>
							<LeadStatusSwitch
								value={showHolds}
								setValue={setShowHolds}
							/>
						</Grid>
						<Grid item xs={6} md={3}>
							<LeadStatusSwitch
								value={showNewLeads}
								setValue={setShowNewLeads}
								label="New Leads"
							/>
						</Grid>
						{selectedLeads.length > 0 && (
							<Grid item xs={12} md={4}>
								<Box display={'flex'}>
									<FormControl variant="filled" fullWidth>
										<InputLabel id="demo-simple-select-filled-label">
											Client Support
										</InputLabel>
										<Select
											value={staff}
											onChange={(e) =>
												setStaff(
													e.target.value as string
												)
											}
											labelId="demo-simple-select-filled-label"
											id="demo-simple-select-filled"
											IconComponent={
												staffLoading
													? HourglassEmptyIcon
													: ArrowDropDownIcon
											}
										>
											{staffs.map((c) => (
												<MenuItem
													key={c.id}
													value={c.id}
												>
													{c.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<Button
										variant={'contained'}
										onClick={onAssign}
										disabled={assignLoading}
										endIcon={
											assignLoading ? (
												<CircularProgress
													color="inherit"
													size={20}
												/>
											) : (
												<></>
											)
										}
									>
										Assign
									</Button>
								</Box>
							</Grid>
						)}
					</Grid>
				</Box>
			</AppBar>
			<Box mb="1rem">
				<LeadsTab />
			</Box>
			{/* <Box mb="1rem">
				<h1>Leads Of Today</h1>
				<LeadsTable
					manageSelectedLeads={manageSelectedLeads}
					selectedLeads={selectedLeads}
					loading={loading}
					leads={todayLeads}
					fetchLeads={fetchLeads}
					hold={showHolds}
				/>
			</Box> */}
			<LeadsTable
				manageSelectedLeads={manageSelectedLeads}
				selectedLeads={selectedLeads}
				loading={loading}
				leads={data.leads}
				fetchLeads={fetchLeads}
				hold={showHolds}
			/>
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</PageWrapper>
	);
};

export default GMLeadsList;
