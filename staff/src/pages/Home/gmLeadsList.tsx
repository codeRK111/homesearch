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
} from '@material-ui/core';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import {
	asyncAssignSupport,
	asyncDeleteLead,
	asyncFetchMyLeads,
} from '../../API/lead';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { City } from '../../model/city.interface';
import FilterLeads from './filterLeads';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LeadStatusSwitch from '../../components/Switch';
import LeadsTable from '../../components/Table/leads/gm';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchAdmins } from '../../API/auth';
import { renderStaffRole } from '../../utils/render';

interface IGMLeadsList {
	userCategory: any;
	leadStatus: any;
}

const GMLeadsList = ({ userCategory, leadStatus }: IGMLeadsList) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// State
	const [page, setPage] = useState(1);
	const [timeInterval, setTimeInterval] = useState('all');
	const [city, setCity] = useState<City | null>(null);
	const [showHolds, setShowHolds] = useState(false);
	const [showNewLeads, setShowNewLeads] = useState(false);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [staffLoading, setStaffLoading] = useState(false);
	const [assignLoading, setAssignLoading] = useState(false);
	const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [staff, setStaff] = useState('');
	const [postedBy, setPostedBy] = useState('');
	const [number, setNumber] = useState('');
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});
	const [tags, setTags] = useState<string[]>([]);

	// Callback

	const addTags = (val: string) => {
		setTags((prevState) => [...prevState, val]);
	};
	const removeTags = (index: number) => {
		setTags((prevState) => prevState.filter((_, i) => i !== index));
	};

	const onAssign = async () => {
		try {
			setAssignLoading(true);
			const staffType = staffs.find((c) => c.id === staff);
			if (!staffType) return;
			await asyncAssignSupport(selectedLeads, staff, staffType.type);
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
	const onDelete = async (id: string) => {
		try {
			setDeleteLoading(true);

			await asyncDeleteLead(id);

			setDeleteLoading(false);
			fetchLeads();
			setSnackbar({
				open: true,
				message: 'Deleted successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setDeleteLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
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
				types: [
					StaffType.ClientSupport,
					StaffType.AssistantSalesManager,
					StaffType.SalesExecutive,
				],
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
			if (tags.length > 0) {
				filter.tags = tags;
			}
			if (number) {
				filter.number = number;
			}
			if (postedBy) {
				filter.postedBy = postedBy;
			}
			if (showNewLeads) {
				filter.stage = 0;
			}
			if (userCategory) {
				filter.userCategory = userCategory;
			}
			filter.city = city?.id;

			if (leadStatus) {
				filter.leadStatus = leadStatus;
			}
			if (timeInterval) {
				filter.timeInterval = timeInterval;
			}
			const resp = await asyncFetchMyLeads(filter);
			setData(resp);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				leads: [],
			});
			setLoading(false);
		}
	}, [
		page,
		limit,
		showHolds,
		showNewLeads,
		userCategory,
		leadStatus,
		timeInterval,
		city,
		number,
		tags,
		postedBy,
	]);
	useEffect(() => {
		setPage(1);
	}, [
		limit,
		showHolds,
		showNewLeads,
		userCategory,
		leadStatus,
		timeInterval,
		city,
		number,
		tags,
	]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);
	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	return (
		<Box mt="1rem">
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
						<Grid item xs={12} md={4}>
							<Box display={'flex'}>
								<FormControl variant="filled" fullWidth>
									<InputLabel id="demo-simple-select-filled-label">
										PostedBy
									</InputLabel>
									<Select
										value={postedBy}
										onChange={(e) =>
											setPostedBy(
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
										<MenuItem value={''}>
											<b>All</b>
										</MenuItem>
										{staffs.map((c) => (
											<MenuItem key={c.id} value={c.id}>
												{c.name} -{' '}
												<b>{renderStaffRole(c.type)}</b>
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
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
													{c.name} -{' '}
													<b>
														{renderStaffRole(
															c.type
														)}
													</b>
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
			<FilterLeads
				setTimeInterval={setTimeInterval}
				city={city}
				setCity={setCity}
				number={number}
				setNumber={setNumber}
				addTags={addTags}
				removeTags={removeTags}
				tags={tags}
			/>
			<p>
				<b>{data.totalDocs}</b> leads found
			</p>
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
				onDelete={onDelete}
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

export default GMLeadsList;
