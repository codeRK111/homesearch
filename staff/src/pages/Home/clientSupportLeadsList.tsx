import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import {
	CommentStatus,
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
	ILead,
} from '../../model/lead.interface';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { AddLeadDialog } from '../../components/Dialogs/addLead';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { City } from '../../model/city.interface';
import FilterLeads from './filterLeads';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LeadsTable from '../../components/Table/leads/leads';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchAdmins } from '../../API/auth';
import { asyncFetchMyLeads } from '../../API/lead';
import queryString from 'query-string';
import { renderStaffRole } from '../../utils/render';
import { useHistory } from 'react-router-dom';

interface IClientSupportLeadsList {
	userCategory: any;
}
const ClientSupportLeadsList = ({ userCategory }: IClientSupportLeadsList) => {
	// State
	const {
		push,
		location: { search },
	} = useHistory();
	const parsed: any = queryString.parse(search, {
		arrayFormat: 'comma',
	});
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState<string | CommentStatus>('');
	const [open, setOpen] = React.useState(false);
	const [days, setDays] = useState<any>('off');
	const [timeInterval, setTimeInterval] = useState('all');
	const [showHolds, setShowHolds] = useState(false);
	const [limit, setLimit] = useState(10);
	const [tags, setTags] = useState<string[]>([]);
	const [postedBy, setPostedBy] = useState('');
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [staffLoading, setStaffLoading] = useState(false);

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});
	const [city, setCity] = useState<City | null>(null);
	const [number, setNumber] = useState('');

	// Callback

	const onSuccess = (leadInfo: ILead) => {
		setData((prevState) => ({
			leads: [leadInfo, ...prevState.leads],
			totalDocs: prevState.totalDocs + 1,
		}));
	};

	const manageCityChange = (val: City | null) => {
		setCity(val);
		push(`?page=1`);
	};
	const manageNumberChange = (val: string) => {
		setNumber(val);
		push(`?page=1`);
	};
	const addTags = (val: string) => {
		setTags((prevState) => [...prevState, val]);
		push(`?page=1`);
	};
	const removeTags = (index: number) => {
		setTags((prevState) => prevState.filter((_, i) => i !== index));
		push(`?page=1`);
	};
	const manageTimeInterval = (val: string) => {
		setTimeInterval(val);
		push(`?page=1`);
	};

	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		// setPage(pageNumber);
		push(`/?page=${pageNumber}`);
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
				page: 1,
				limit: 200,
			});
			setStaffLoading(false);
			setStaffs(resp.admins);
		} catch (error) {
			setStaffLoading(false);
			setStaffs([]);
		}
	}, []);

	useEffect(() => {
		setPage(parsed.page ? Number(parsed.page) : 1);
	}, [parsed]);

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchLeadsInputType = {
				page,
				limit,
				commentStatus: status,
			};
			if (days) {
				filter.reschedule = days;
			}
			if (showHolds) {
				filter.stage = 2;
			}
			if (tags.length > 0) {
				filter.tags = tags;
			}
			if (postedBy) {
				filter.postedBy = postedBy;
			}
			if (userCategory) {
				filter.userCategory = userCategory;
			}
			if (timeInterval) {
				filter.timeInterval = timeInterval;
			}
			filter.city = city?.id;
			if (number) {
				filter.number = number;
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
		status,
		page,
		limit,
		showHolds,
		userCategory,
		timeInterval,
		city,
		number,
		tags,
		days,
		postedBy,
	]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval, city, number, tags, postedBy]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);
	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	return (
		<Box mt="1rem">
			<AddLeadDialog
				open={open}
				setOpen={setOpen}
				onSuccess={onSuccess}
			/>
			<Box mb="1rem">
				<Grid container justifyContent="center">
					<Grid item xs={12} md={3}>
						<Box display={'flex'}>
							<FormControl variant="filled" fullWidth>
								<InputLabel id="demo-simple-select-filled-label">
									PostedBy
								</InputLabel>
								<Select
									value={postedBy}
									onChange={(e) =>
										setPostedBy(e.target.value as string)
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
				</Grid>
			</Box>
			<Box mb="1rem">
				<FilterLeads
					setTimeInterval={manageTimeInterval}
					city={city}
					setCity={manageCityChange}
					number={number}
					setNumber={manageNumberChange}
					addTags={addTags}
					removeTags={removeTags}
					tags={tags}
					status={status}
					setStatus={setStatus}
				/>
			</Box>
			<Box display={'flex'} justifyContent={'space-between'} p="1rem">
				<p>
					<b>{data.totalDocs}</b> leads found
				</p>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
					startIcon={<AddIcon />}
				>
					Add Lead
				</Button>
			</Box>
			{/* <CollapsibleTable /> */}
			<LeadsTable
				loading={loading}
				leads={data.leads}
				fetchLeads={fetchLeads}
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

export default ClientSupportLeadsList;
