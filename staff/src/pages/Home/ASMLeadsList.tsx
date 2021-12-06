import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { City } from '../../model/city.interface';
import FilterLeads from './filterLeads';
import LeadsASMTable from '../../components/Table/leads/asm';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyLeads } from '../../API/lead';

interface IClientSupportLeadsList {
	userCategory: any;
}
const ASMLeadsList = ({ userCategory }: IClientSupportLeadsList) => {
	// State

	const [page, setPage] = useState(1);
	const [timeInterval, setTimeInterval] = useState('all');
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
		setPage(pageNumber);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: FetchLeadsInputType = { page, limit };

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
	}, [page, limit, userCategory, timeInterval, city, number]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval, city, number]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<Box mt="1rem">
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
			<LeadsASMTable
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

export default ASMLeadsList;
