import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useState } from 'react';

import LeadsTable from '../../components/Table/leads/bdm';
import { PageWrapper } from '../../components/UI/Container';
import TablePagination from '../../components/Table/pagination';
import { Typography } from '@material-ui/core';
import { asyncFetchMyLeads } from '../../API/lead';

const BDMLeadsPage = () => {
	// State
	const [page, setPage] = useState(1);
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
	}, [page, limit]);
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
		</PageWrapper>
	);
};

export default BDMLeadsPage;
