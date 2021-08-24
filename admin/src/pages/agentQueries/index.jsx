import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef } from 'react';

import AgentQueriesTable from '../../components/queryTable/agentQueries.component';
import Pagination from '@material-ui/lab/Pagination';
import TableSkeleton from '../../components/skeleton/table.component';
import axios from 'axios';
import { getAgentQueries } from '../../utils/asyncQueries';
import useStyles from './agentQueries.style';

const AgentQueries = () => {
	const cancelToken = useRef(undefined);
	const [page, setPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [via, setVia] = React.useState('web');
	const [queryFor, setQueryFor] = React.useState('');
	const [propertyFor, setPropertyFor] = React.useState('');
	const [propertyType, setPropertyType] = React.useState('');
	const [limit, setLimit] = React.useState(10);
	const [queriesPerPage, setQueriesPerPage] = React.useState(10);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const [data, setData] = React.useState({
		queries: [],
		totalDocs: 0,
	});
	const classes = useStyles();

	const fetchQueries = useCallback(async () => {
		cancelToken.current = axios.CancelToken.source();
		const data = {
			page,
			limit,
			via,
		};
		if (queryFor) {
			data.queryFor = queryFor;
		}
		if (propertyType) {
			data.propertyType = propertyType;
		}
		if (propertyFor) {
			data.queryOn = propertyFor;
		}

		try {
			const result = await getAgentQueries(
				data,
				cancelToken.current,
				setLoading
			);
			setData(result);
			setError(null);
		} catch (error) {
			setError(error);
		}
	}, [page, via, queryFor, propertyFor, propertyType, limit]);

	useEffect(() => {
		fetchQueries();
	}, [fetchQueries]);
	return (
		<div className={classes.wrapper}>
			<h1>Agent Queries</h1>
			<Box mb="2rem">
				<Grid container spacing={1}>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Query For
							</InputLabel>
							<Select
								value={queryFor}
								onChange={(e) => setQueryFor(e.target.value)}
							>
								<MenuItem value={''}>All</MenuItem>
								<MenuItem value={'number'}>Number</MenuItem>
								<MenuItem value={'message'}>Enquiry</MenuItem>
								<MenuItem value={'whatsapp'}>Whatsapp</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Property For
							</InputLabel>
							<Select
								value={propertyFor}
								onChange={(e) => setPropertyFor(e.target.value)}
							>
								<MenuItem value="">All</MenuItem>

								<MenuItem value={'project'}>Project</MenuItem>
								<MenuItem value={'projectProperty'}>
									Project Property
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Property Type
							</InputLabel>
							<Select
								value={propertyType}
								onChange={(e) =>
									setPropertyType(e.target.value)
								}
							>
								<MenuItem value="">All</MenuItem>
								<MenuItem value={'flat'}>Apartment</MenuItem>
								<MenuItem value={'independenthouse'}>
									Villa
								</MenuItem>

								<MenuItem value={'land'}>Land</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl variant="filled" fullWidth>
							<InputLabel htmlFor="filled-age-native-simple">
								Via
							</InputLabel>
							<Select
								value={via}
								onChange={(e) => setVia(e.target.value)}
							>
								<MenuItem value={'web'}>Web</MenuItem>
								<MenuItem value={'app'}>Mobile App</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Box>
			<Box>{loading && <TableSkeleton />}</Box>
			{!loading && (
				<div className={classes.flexWrapper}>
					<Typography>
						Total <b>{data.totalDocs}</b> queries found{' '}
					</Typography>
					<div className={classes.perPageWrapper}>
						<TextField
							variant="filled"
							label="Queries per page"
							size="small"
							value={queriesPerPage}
							onChange={(e) => setQueriesPerPage(e.target.value)}
						/>
						<button
							onClick={() => {
								if (Number(queriesPerPage)) {
									setPage(1);
									setLimit(queriesPerPage);
								}
							}}
						>
							Apply
						</button>
					</div>
				</div>
			)}
			{!loading && (
				<Box mt="1rem">
					<AgentQueriesTable
						queries={data.queries}
						fetchQueries={fetchQueries}
					/>
				</Box>
			)}
			{!loading && (
				<Box mt="1rem" display="flex" justifyContent="center">
					<Pagination
						count={Math.ceil(data.totalDocs / limit)}
						page={page}
						onChange={handleChange}
						color="primary"
					/>
				</Box>
			)}
		</div>
	);
};

export default AgentQueries;
