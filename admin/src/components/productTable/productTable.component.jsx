import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialogue from '../alertDialogue/alertDialogue.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectProperties,
	selectLoading,
} from '../../redux/property/property.selector';
import { fetchProperties } from '../../redux/property/property.actions';
import Box from '@material-ui/core/Box';
import { useHistory, Link } from 'react-router-dom';
import CustomSelect from './select.component';
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

function Orders({ fetchProperties, allProperties, loading }) {
	const history = useHistory();
	const hnadleProperties = (status, data = null) => {
		console.log(status);
		console.log(data);
	};
	React.useEffect(() => {
		fetchProperties(hnadleProperties);
	}, []);

	const classes = useStyles();

	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={allProperties.length === 0 && loading}
				// onClick={handleClose}
			>
				loading...
			</Backdrop>

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
								Title
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								For
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Type
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								City
							</TableCell>

							<TableCell style={{ color: '#ffffff' }}>
								Location
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Status
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								User
							</TableCell>
							<TableCell style={{ color: '#ffffff' }}>
								Posted on
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
						{allProperties.map((c, i) => (
							<TableRow key={i}>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{c.title}</TableCell>
								<TableCell>{c.for}</TableCell>
								<TableCell>{c.type}</TableCell>
								<TableCell>{c.city.name}</TableCell>

								<TableCell>{c.location.name}</TableCell>
								<TableCell>{c.status}</TableCell>
								<TableCell>{c.userId.name}</TableCell>
								<TableCell>
									{`${moment(c.createdAt, 'YYYY-MM-DD')}`}
								</TableCell>
								<TableCell align="right">
									<Link
										to={`/properties/editProperties/${c.id}`}
									>
										Edit
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className={classes.seeMore}>
				<Link color="primary" href="#" onClick={preventDefault}>
					{/* See more orders */}
				</Link>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = createStructuredSelector({
	allProperties: selectProperties,
	loading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProperties: (callback) => dispatch(fetchProperties({ callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
