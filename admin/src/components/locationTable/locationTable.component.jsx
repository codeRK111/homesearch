import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectCityLoading as cityLoading,
	selectLoading as stateLoading,
	selectAllStates as allStates,
	selectFetchLocationLoading as locationLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart as fetchStates,
	fetchCitiesStart as fetchCities,
	fetchLocationssStart as fetchLocations,
} from '../../redux/city/city.actions';
import Box from '@material-ui/core/Box';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import Select from '../select/select.component';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function preventDefault(event) {
	event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
	flexWrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iconButton: {
		cursor: 'pointer',
	},
	tableWrapper: {
		// overflowX: 'scroll',
	},
	colorRed: {
		color: 'red',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

function Orders({
	cityLoading,
	stateLoading,
	allStates,
	fetchStates,
	fetchCities,
	locationLoading,
	fetchLocations,
}) {
	const history = useHistory();
	const [state, selectState] = React.useState('');
	const [cities, setCities] = React.useState([]);
	const [locations, setLocations] = React.useState([]);
	const [city, setCity] = React.useState('');
	const [asyncError, setAsyncError] = React.useState('');
	const responseHandler = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCities(data.cities);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};
	const locationResponseHandler = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setLocations(data.locations);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};
	React.useEffect(() => {
		fetchStates();
	}, []);
	React.useEffect(() => {
		if (state) {
			fetchCities(state, responseHandler);
		}
	}, [state]);
	React.useEffect(() => {
		if (city) {
			fetchLocations(city, locationResponseHandler);
		}
	}, [city]);

	const classes = useStyles();

	const handleState = (e) => {
		selectState(e.target.value);
	};
	const handleCity = (e) => {
		setCity(e.target.value);
	};

	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={cityLoading}
				// onClick={handleClose}
			>
				loading cities...
			</Backdrop>
			<Backdrop
				className={classes.backdrop}
				open={allStates.length === 0 && stateLoading}
				// onClick={handleClose}
			>
				loading states...
			</Backdrop>
			<Backdrop
				className={classes.backdrop}
				open={locationLoading}
				// onClick={handleClose}
			>
				loading locations...
			</Backdrop>
			<p className="color-red">{asyncError}</p>
			<Grid container>
				<Grid item xs={12} md={12} lg={6}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={12} lg={6}>
							<Box mb="1rem">
								<Select
									label="State"
									helperText="Select a state to view cities"
									name="state"
									value={state}
									onChange={handleState}
									menuItems={allStates.map((c) => ({
										value: c,
										label: c,
									}))}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={12} lg={6}>
							<Box mb="1rem">
								<Select
									label="City"
									helperText="Select a city to view locations"
									name="city"
									value={city}
									onChange={handleCity}
									menuItems={cities.map((c) => ({
										value: c.id,
										label: c.name,
									}))}
								/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div className={classes.tableWrapper}>
				{/* <p className={classes.colorRed}>{error}</p> */}
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
								Name
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								City
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								State
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
						{locations.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{c.name}</TableCell>
								<TableCell>{c.city.name}</TableCell>
								<TableCell>{c.city.state}</TableCell>
								<TableCell align="right">
									<Link to={`/locations`}>Edit</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = createStructuredSelector({
	cityLoading,
	stateLoading,
	locationLoading,
	allStates,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStates: () => dispatch(fetchStates()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	fetchLocations: (city, callback) =>
		dispatch(fetchLocations({ city, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
