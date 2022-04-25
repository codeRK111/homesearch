import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { City } from '../../model/city.interface';
import FilterLeads from './filterLeads';
import LeadStatusSwitch from '../../components/Switch';
import LeadsTable from '../../components/Table/leads/leads';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyLeads } from '../../API/lead';
import queryString from 'query-string';
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
	const [days, setDays] = useState<any>('off');
	const [timeInterval, setTimeInterval] = useState('all');
	const [showHolds, setShowHolds] = useState(false);
	const [limit, setLimit] = useState(10);
	const [tags, setTags] = useState<string[]>([]);

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});
	const [city, setCity] = useState<City | null>(null);
	const [number, setNumber] = useState('');

	// Callback

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

	useEffect(() => {
		setPage(parsed.page ? Number(parsed.page) : 1);
	}, [parsed]);

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchLeadsInputType = { page, limit };
			if (days) {
				filter.reschedule = days;
			}
			if (showHolds) {
				filter.stage = 2;
			}
			if (tags.length > 0) {
				filter.tags = tags;
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
		page,
		limit,
		showHolds,
		userCategory,
		timeInterval,
		city,
		number,
		tags,
		days,
	]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval, city, number, tags]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<Box mt="1rem">
			<Box mb="1rem">
				<LeadStatusSwitch value={showHolds} setValue={setShowHolds} />
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
				/>
			</Box>
			<p>
				<b>{data.totalDocs}</b> leads found
			</p>
			<LeadsTable
				loading={loading}
				leads={data.leads}
				fetchLeads={fetchLeads}
				hold={showHolds}
				days={days}
				setDays={setDays}
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
