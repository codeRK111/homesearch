import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	Select,
	TextField,
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import QueryTable from '../../components/queryTable/queryTable.component';
import React from 'react';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectQueries } from '../../redux/query/query.selector';
import { setSnackbar } from '../../redux/ui/ui.actions';

const Queries = ({ setSnackbar }) => {
	const cancelToken = React.useRef(undefined);
	const [page, setPage] = React.useState(1);
	const [queryFor, setQueryFor] = React.useState('');
	const [propertyFor, setPropertyFor] = React.useState('');
	const [propertyType, setPropertyType] = React.useState('');
	const [via, setVia] = React.useState('web');
	const [limit, setLimit] = React.useState(5);
	const [loading, setLoading] = React.useState(false);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const [data, setData] = React.useState({
		queries: [],
		totalDocs: 0,
	});

	const fetchQueries = () => {
		const filter = {};
		if (queryFor) {
			filter.queryFor = queryFor;
		}
		if (propertyFor) {
			filter.propertyFor = propertyFor;
		}
		if (propertyType) {
			filter.propertyType = propertyType;
		}
		if (via) {
			filter.via = via;
		}
		cancelToken.current = axios.CancelToken.source();
		const token = localStorage.getItem('JWT');
		setLoading(true);
		axios
			.post(
				apiUrl(`/query/get-all-queries`, 'v2'),
				{ ...filter, page, limit },
				{
					cancelToken: cancelToken.current.token,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((resp) => {
				setLoading(false);
				setData(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setSnackbar({
					open: true,
					message,
					severity: 'error',
				});
				return;
			});
	};

	React.useEffect(() => {
		fetchQueries();
	}, [page, setSnackbar, queryFor, propertyFor, propertyType, via, limit]);

	// Cancel Request
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel(
					'Operation canceled due to new request'
				);
			}
		};
	}, []);
	return (
		<div>
			<Box p="1rem">
				<h3>Queries on Property</h3>
				<Box mb="2rem">
					<Grid container spacing={1}>
						<Grid item xs={6} md={3}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Query For
								</InputLabel>
								<Select
									native
									value={queryFor}
									onChange={(e) =>
										setQueryFor(e.target.value)
									}
									inputProps={{
										name: 'age',
										id: 'filled-age-native-simple',
									}}
								>
									<option
										aria-label="None"
										value=""
										disabled
									/>
									<option value={'number'}>Number</option>
									<option value={'message'}>Enquiry</option>
									<option value={'whatsapp'}>Whatsapp</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Property For
								</InputLabel>
								<Select
									native
									value={propertyFor}
									onChange={(e) =>
										setPropertyFor(e.target.value)
									}
									inputProps={{
										name: 'age',
										id: 'filled-age-native-simple',
									}}
								>
									<option
										aria-label="None"
										value=""
										disabled
									/>
									<option value={'rent'}>Rent</option>
									<option value={'sale'}>Sale</option>
									<option value={'project'}>Project</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Property Type
								</InputLabel>
								<Select
									native
									value={propertyType}
									onChange={(e) =>
										setPropertyType(e.target.value)
									}
									inputProps={{
										name: 'age',
										id: 'filled-age-native-simple',
									}}
								>
									<option
										aria-label="None"
										value=""
										disabled
									/>
									<option value={'flat'}>Apartment</option>
									<option value={'independenthouse'}>
										Villa
									</option>
									<option value={'hostel'}>Hostel</option>
									<option value={'pg'}>PG</option>
									<option value={'land'}>Land</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl variant="filled" fullWidth>
								<InputLabel htmlFor="filled-age-native-simple">
									Via
								</InputLabel>
								<Select
									native
									value={via}
									onChange={(e) => setVia(e.target.value)}
									inputProps={{
										name: 'age',
										id: 'filled-age-native-simple',
									}}
								>
									<option value={'web'}>Web</option>
									<option value={'app'}>Mobile App</option>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb="1rem"
				>
					<p>
						{' '}
						<b>{data.totalDocs}</b> queries found{' '}
					</p>
					<TextField
						id="outlined-number"
						label="Queries per page"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						variant="filled"
						value={limit}
						onChange={(e) => setLimit(e.target.value)}
					/>
				</Box>
				<QueryTable
					queries={data.queries}
					loading={loading}
					fetchQueries={fetchQueries}
				/>
				<Box mt="1rem" display="flex" justifyContent="center">
					<Pagination
						count={Math.ceil(data.totalDocs / limit)}
						page={page}
						onChange={handleChange}
						color="primary"
					/>
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	queries: selectQueries,
});

const dispatchStateToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Queries);
