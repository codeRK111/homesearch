import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import LeadsASMTable from '../../components/Table/leads/asm';
import LeadsTab from '../../components/Tab/leadFilter';
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
	}, [page, limit, userCategory, timeInterval]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<Box mt="1rem">
			<Box mb="1rem">
				<LeadsTab setTimeInterval={setTimeInterval} />
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
