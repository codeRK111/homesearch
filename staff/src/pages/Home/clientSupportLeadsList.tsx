import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import LeadStatusSwitch from '../../components/Switch';
import LeadsTab from '../../components/LeadsTab';
import LeadsTable from '../../components/Table/leads/leads';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyLeads } from '../../API/lead';

interface IClientSupportLeadsList {
	userCategory: any;
}
const ClientSupportLeadsList = ({ userCategory }: IClientSupportLeadsList) => {
	// State
	const [page, setPage] = useState(1);
	const [timeInterval, setTimeInterval] = useState('all');
	const [showHolds, setShowHolds] = useState(false);
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
			if (showHolds) {
				filter.stage = 2;
			}
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
	}, [page, limit, showHolds, userCategory, timeInterval]);
	useEffect(() => {
		setPage(1);
	}, [limit, userCategory, timeInterval]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<Box mt="1rem">
			<Box mb="1rem">
				<LeadStatusSwitch value={showHolds} setValue={setShowHolds} />
			</Box>
			<Box mb="1rem">
				<LeadsTab setTimeInterval={setTimeInterval} />
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
