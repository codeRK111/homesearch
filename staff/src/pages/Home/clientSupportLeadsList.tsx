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
	const [page, setPage] = useState(parsed.page ? Number(parsed.page) : 1);
	const [timeInterval, setTimeInterval] = useState('all');
	const [showHolds, setShowHolds] = useState(false);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});
	const [city, setCity] = useState<City | null>(null);
	const [number, setNumber] = useState('');

	// Callback
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		// setPage(pageNumber);
		push(`/?page=${pageNumber}`);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchLeadsInputType = { page, limit };
			if (showHolds) {
				filter.stage = 2;
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
	}, [page, limit, showHolds, userCategory, timeInterval, city, number]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval, city, number]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);
	useEffect(() => {
		setPage(parsed.page ? Number(parsed.page) : 1);
	}, [parsed]);

	return (
		<Box mt="1rem">
			<Box mb="1rem">
				<LeadStatusSwitch value={showHolds} setValue={setShowHolds} />
			</Box>
			<Box mb="1rem">
				<FilterLeads
					setTimeInterval={setTimeInterval}
					city={city}
					setCity={setCity}
					number={number}
					setNumber={setNumber}
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
