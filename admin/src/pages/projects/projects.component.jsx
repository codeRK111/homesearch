import {
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ProjectTable from '../../components/projectTable/projectTable.component';
import SearchBuilder from '../../components/searchPlace/searchBuilders';
import SearchPlace from '../../components/searchPlace/withReset';
import TablePagination from '../builders/pagination.component';
import TableSkeleton from '../../components/skeleton/table.component';
import axios from 'axios';
import { getAllProjects } from '../../utils/asyncProject';
import useStyles from './projects.style';

// import TableSkeleton from '../../components/skeleton/table.component';

const ProjectsListingPage = ({
	match: {
		params: { status },
	},
}) => {
	const classes = useStyles();
	const cancelToken = useRef(undefined);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [title, setTitle] = useState('');
	const [id, setId] = useState('');
	const [city, setCity] = useState(null);
	const [builder, setBuilder] = useState(null);
	const [projectType, setProjectType] = useState('');
	const [complitionStatus, setComplitionStatus] = useState('');
	const [limit, setLimit] = useState(10);
	const [queriesPerPage, setQueriesPerPage] = useState(10);

	const handleChange = (event, value) => {
		setPage(value);
	};

	const onReset = () => {
		setPage(1);
		setError(null);
		setTitle('');
		setId('');
		setCity(null);
		setBuilder(null);
		setProjectType('');
		setComplitionStatus('');
		setLimit(10);
		setQueriesPerPage(10);
	};
	const [data, setData] = React.useState({
		projects: [],
		totalDocs: 0,
	});

	const fetchProjects = useCallback(async () => {
		cancelToken.current = axios.CancelToken.source();
		const data = {
			page,
			limit,
		};
		if (title) {
			data.title = title;
		}
		if (id) {
			data.id = `HSI${id}`;
		}
		if (projectType) {
			data.projectType = projectType;
		}
		if (complitionStatus) {
			data.complitionStatus = complitionStatus;
		}
		if (city) {
			data.city = city;
		}
		if (builder) {
			data.builder = builder;
		}
		if (status) {
			data.status = status;
		}

		try {
			const result = await getAllProjects(
				data,
				cancelToken.current,
				setLoading
			);
			setData(result);
			setError(null);
		} catch (error) {
			console.log('---------------------------');
			setError(error);
		}
	}, [
		page,
		limit,
		title,
		projectType,
		complitionStatus,
		status,
		city,
		builder,
		id,
	]);

	useEffect(() => {
		fetchProjects();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchProjects]);
	return (
		<div>
			<Box p="1rem">
				<Box mb="2rem">
					<Grid container spacing={1}>
						<Grid item xs={6} md={2}>
							<TextField
								variant="filled"
								label="Search by ID"
								value={id}
								onChange={(e) => setId(e.target.value)}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											HSI
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Project Type
								</InputLabel>
								<Select
									value={projectType}
									onChange={(e) =>
										setProjectType(e.target.value)
									}
								>
									<MenuItem value="">All</MenuItem>

									<MenuItem value={'flat'}>
										Apartment
									</MenuItem>
									<MenuItem value={'independenthouse'}>
										Villa
									</MenuItem>
									<MenuItem value={'land'}>Land</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={2}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Complition Status
								</InputLabel>
								<Select
									value={complitionStatus}
									onChange={(e) =>
										setComplitionStatus(e.target.value)
									}
								>
									<MenuItem value="">All</MenuItem>
									<MenuItem value={'upcoming'}>
										Upcoming
									</MenuItem>
									<MenuItem value={'ongoing'}>
										Ongoing
									</MenuItem>

									<MenuItem value={'completed'}>
										Completed
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={2}>
							<SearchPlace
								type="city"
								value={city}
								onSelect={(c) => {
									setCity(c);
								}}
								padding={false}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<SearchBuilder
								value={builder}
								onSelect={(c) => {
									setBuilder(c);
								}}
								padding={false}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								color="secondary"
								size="large"
								fullWidth
								style={{ height: '100%' }}
								onClick={onReset}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</Box>
				<Box display="flex" justifyContent="flex-end" mb="1rem">
					{/* <Button
						variant="contained"
						color="default"
						classes={{
							label: 'transform-none',
						}}
						startIcon={<AddIcon />}
						size="small"
						onClick={() => history.push('/admins/add')}
					>
						Add Builders / Staff
					</Button> */}
				</Box>
				<Paper>
					<Box p="1rem">
						<h1> Projects</h1>
						{error && (
							<Typography
								className={classes.error}
								align="center"
								gutterBottom
								style={{ color: 'red' }}
							>
								{error}
							</Typography>
						)}

						<div className={classes.flexWrapper}>
							<Typography>
								Total <b>{data.totalDocs}</b> projects found{' '}
							</Typography>

							<div className={classes.perPageWrapper}>
								<TextField
									variant="filled"
									label="Search by title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									fullWidth
								/>
							</div>
						</div>
						<Box>{loading && <TableSkeleton />}</Box>
						{!loading && (
							<Box mt="1rem">
								<ProjectTable
									projects={data.projects}
									fetchProjects={fetchProjects}
								/>
							</Box>
						)}

						{!loading && (
							<TablePagination
								limit={limit}
								setLimit={setLimit}
								page={page}
								setPage={handleChange}
								totalDocs={data.totalDocs}
							/>
						)}
					</Box>
				</Paper>
			</Box>
		</div>
	);
};

export default ProjectsListingPage;
