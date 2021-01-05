import { Link, useHistory, withRouter } from 'react-router-dom';
import {
	selectAllStates as allStates,
	selectCityLoading as cityLoading,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import {
	fetchCitiesStart as fetchCities,
	fetchAllStatesStart as fetchStates,
} from '../../redux/city/city.actions';

import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import RenderByAccess from '../roleRender/roleRender.component';
import Select from '../select/select.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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
	match: { params },
}) {
	const history = useHistory();
	const [state, selectState] = React.useState(params.state);
	const [cities, setCities] = React.useState([]);
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
	React.useEffect(() => {
		fetchStates();
	}, []);
	React.useEffect(() => {
		if (params.state) {
			fetchCities(params.state, responseHandler);
		}
	}, [params.state]);

	const classes = useStyles();

	const handleState = (e) => {
		history.push(`/cities/${e.target.value}`);
	};

	const ActionHeadingNode = RenderByAccess(
		<TableCell align="right" style={{ color: '#ffffff' }}>
			Action
		</TableCell>,
		[
			{
				type: 'cityActions',
				value: 'update',
			},
			{
				type: 'cityActions',
				value: 'delete',
			},
		],
		null,
		true
	);

	const actionDataEditNode = (c) => {
		const Comp = RenderByAccess(
			<Link to={`/cities/edit/${c.id}`}>Edit</Link>,
			[
				{
					type: 'cityActions',
					value: 'update',
				},
			]
		);

		return <Comp />;
	};
	const actionDatadeleteNode = (c) => {
		const Comp = RenderByAccess(
			<Box ml="0.5rem">
				<Link to={`/cities/delete/${c.id}`}>Delete</Link>
			</Box>,
			[
				{
					type: 'cityActions',
					value: 'delete',
				},
			]
		);

		return <Comp />;
	};

	const actionDataParentNode = (c) => {
		const Comp = RenderByAccess(
			<TableCell align="right">
				<Box display="flex" justifyContent="flex-end">
					{actionDataEditNode(c)}
					{actionDatadeleteNode(c)}
				</Box>
			</TableCell>,
			[
				{
					type: 'cityActions',
					value: 'update',
				},
				{
					type: 'cityActions',
					value: 'delete',
				},
			],
			null,
			true
		);

		return <Comp />;
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
									value={params.state}
									onChange={handleState}
									menuItems={allStates.map((c) => ({
										value: c,
										label: c,
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
								State
							</TableCell>
							<ActionHeadingNode />
						</TableRow>
					</TableHead>
					<TableBody>
						{cities.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{c.name}</TableCell>
								<TableCell>{c.state}</TableCell>
								{actionDataParentNode(c)}
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
	allStates,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStates: () => dispatch(fetchStates()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
