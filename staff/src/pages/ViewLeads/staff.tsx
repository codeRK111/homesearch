import { Box, Typography } from '@material-ui/core';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import LeadStatusSwitch from '../../components/Switch';
import LeadsTable from '../../components/Table/leads/leads';
import { PageWrapper } from '../../components/UI/Container';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyLeads } from '../../API/lead';

const StaffLeadsPage = () => {
	// State
	const [page, setPage] = useState(1);
	const [days, setDays] = useState(2);
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
	}, [page, limit, showHolds]);
	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	return (
		<PageWrapper>
			<Typography variant="h5" gutterBottom>
				My Leads
			</Typography>
			<p>
				<b>{data.totalDocs}</b> leads found
			</p>
			<Box mb="1rem">
				<LeadStatusSwitch value={showHolds} setValue={setShowHolds} />
			</Box>
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
		</PageWrapper>
	);
};

export default StaffLeadsPage;
