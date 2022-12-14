import {
	Box,
	Container,
	FormControlLabel,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@material-ui/core';
import {
	FetchLeadsInputType,
	FetchMyLeadsResponseData,
} from '../../model/lead.interface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import axios, { CancelTokenSource } from 'axios';

import LeadsTable from '../../components/Table/leads/leads';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchMyPostedLeads } from '../../API/lead';

const PostedLeadsPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// Token
	const source = useRef<CancelTokenSource | null>(null);
	// State
	const [error, setError] = useState('');
	const [assigned, setAssigned] = useState(false);
	const [number, setNumber] = useState('');
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAssigned(event.target.checked);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			//Check if there are any previous pending requests

			source.current = axios.CancelToken.source();
			const filter: FetchLeadsInputType = {
				page,
				limit,
				assigned,
			};
			if (number) {
				filter.number = number;
			}
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
	}, [page, limit, number, assigned]);

	useEffect(() => {
		setPage(1);
	}, [limit, number, assigned]);
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
			<Grid container spacing={1} justifyContent="center">
				<Grid item xs={12} md={4}>
					<TextField
						label="Filter By Number"
						variant="filled"
						size="small"
						fullWidth
						value={number}
						onChange={(e) => {
							setNumber(e.target.value);
						}}
					/>
				</Grid>
			</Grid>
			<FormControlLabel
				control={
					<Switch
						checked={assigned}
						onChange={handleChange}
						color="primary"
					/>
				}
				label="Show Assigned leads"
			/>
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
		</Container>
	);
};

export default PostedLeadsPage;
