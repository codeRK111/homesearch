import {
	Avatar,
	Backdrop,
	Box,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import CityTopSwitch from './topSwitch.component';
import { Link } from 'react-router-dom';
import StateNames from './stateNames.component';
import StatusSwitch from './statusSwitch';
import TablePagination from '../../pages/builders/pagination.component';
import axios from 'axios';
import { getAllCities } from '../../utils/asyncCity';
import useStyles from './cityTable.style';
import { withAsync } from '../../hoc/withAsync';

function Orders({ loading, setLoading, error, setError }) {
	const classes = useStyles();
	const source = useRef(null);
	const [state, selectState] = React.useState('');
	const [name, setName] = React.useState('');
	const [page, setPage] = useState(1);
	const [top, setTop] = useState(false);
	const [status, setStatus] = useState('active');
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState({
		cities: [],
		totalDocs: 0,
	});

	const handlePageChange = (event, value) => {
		setPage(value);
	};
	const handleChangeTop = (event) => {
		const { checked } = event.target;
		setTop(checked);
	};
	const handleChangeRadio = (e) => {
		const { value } = e.target;
		setStatus(value);
	};

	const fetchCities = useCallback(async () => {
		source.current = axios.CancelToken.source();
		const filterData = {
			page,
			limit,
			top,
		};

		if (state) {
			filterData.state = state;
		}
		if (name) {
			filterData.name = name;
		}
		filterData.status = status;
		try {
			const resp = await getAllCities(
				filterData,
				source.current,
				setLoading
			);
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
		}
	}, [page, limit, state, name, top, status, setLoading, setError]);

	useEffect(() => {
		setPage(1);
	}, [state, limit, name, top, status]);

	useEffect(() => {
		fetchCities();
	}, [fetchCities]);

	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={loading}
				// onClick={handleClose}
			>
				<CircularProgress size={50} color="inherit" />
			</Backdrop>

			<p className="color-red">{error}</p>
			<Grid container>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6} lg={3}>
							<Box mb="1rem">
								<StateNames
									value={state}
									setValue={selectState}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Box mb="1rem">
								<TextField
									variant="filled"
									value={name}
									onChange={(e) => setName(e.target.value)}
									label="Search By Name"
									fullWidth
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={2}>
							<Box mb="1rem">
								<FormControlLabel
									control={
										<Checkbox
											checked={top}
											onChange={handleChangeTop}
											color="primary"
										/>
									}
									label="Top Cities"
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<Box mb="1rem">
								<RadioGroup row defaultValue={status}>
									<FormControlLabel
										value="active"
										control={
											<Radio
												onChange={handleChangeRadio}
											/>
										}
										label="Active cities"
									/>
									<FormControlLabel
										value="inactive"
										control={
											<Radio
												onChange={handleChangeRadio}
											/>
										}
										label="Inactive cities"
									/>
								</RadioGroup>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div className={classes.tableWrapper}>
				<p className={classes.colorRed}>{error}</p>
				{!loading && (
					<p>
						<b>{data.totalDocs}</b> cities found
					</p>
				)}
				<Table size="medium">
					<TableHead>
						<TableRow
							style={{
								backgroundColor: '#34495e',
							}}
						>
							<TableCell style={{ color: '#ffffff' }}>
								SL no
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Image
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Name
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								State
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Top City
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Status
							</TableCell>
							<TableCell
								align="right"
								style={{ color: '#ffffff' }}
							>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.cities.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>
									{c.image ? (
										<Avatar
											src={`/assets/cities/${c.image}`}
										/>
									) : (
										'-'
									)}
								</TableCell>
								<TableCell>{c.name}</TableCell>
								<TableCell>{c.state}</TableCell>
								<TableCell>
									<CityTopSwitch id={c.id} top={!!c.top} />
								</TableCell>
								<TableCell>
									<StatusSwitch
										id={c.id}
										cityStatus={c.status}
									/>
								</TableCell>
								<TableCell align="right">
									<Box
										display="flex"
										justifyContent="flex-end"
									>
										<Link to={`/cities/edit/${c.id}`}>
											Edit
										</Link>
										<Box ml="0.5rem">
											<Link to={`/cities/delete/${c.id}`}>
												Delete
											</Link>
										</Box>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					setPage={handlePageChange}
					totalDocs={data.totalDocs}
				/>
			</div>
		</React.Fragment>
	);
}

export default withAsync(Orders);
