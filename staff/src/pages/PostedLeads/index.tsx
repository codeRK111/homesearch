import { Box, Container, Typography } from '@material-ui/core';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import axios, { CancelTokenSource } from 'axios';

import MyPostedLeadsTable from '../../components/Table/leads/myLeads';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyPostedLeads } from '../../API/lead';

const PostedLeadsPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// Token
	const source = useRef<CancelTokenSource | null>(null);
	// State
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState<FetchMyLeadsResponseData>({
		totalDocs: 0,
		leads: [],
	});
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			//Check if there are any previous pending requests

			source.current = axios.CancelToken.source();
			const filter: FetchLeadsInputType = {
				page,
				limit,
			};

			setLoading(true);
			const resp = await asyncFetchMyPostedLeads(
				filter,

				source.current
			);
			setData(resp);

			setLoading(false);
			setError('');
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
			setData({
				totalDocs: 0,
				leads: [],
			});
		}
	}, [page, limit]);

	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

	useEffect(() => {
		if (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	}, [error, setSnackbar]);

	return (
		<Container component={Box} mt="1rem">
			<Typography variant="h5" gutterBottom align="center">
				Leads posted by me
			</Typography>

			<MyPostedLeadsTable loading={loading} leads={data.leads} />
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</Container>
	);
};

export default PostedLeadsPage;
