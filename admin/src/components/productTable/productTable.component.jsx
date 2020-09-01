import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CustomSelect from './select.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectProperties,
	selectLoading,
} from '../../redux/property/property.selector';
import { fetchProperties } from '../../redux/property/property.actions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

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
	fetchProperties,
	loading,
	match: {
		params: { status },
	},
	allProperties = [],
}) {
	console.log(allProperties);
	const hnadleProperties = (status, data = null) => {
		console.log(status);
		console.log(data);
	};
	React.useEffect(() => {
		fetchProperties(hnadleProperties, status);
	}, [fetchProperties, status]);

	const classes = useStyles();

	return (
		<React.Fragment>
			<Backdrop
				className={classes.backdrop}
				open={loading}
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
								<TableCell>
									<CustomSelect
										value={c.status}
										propertyId={c.id}
										items={[
											{
												label: 'active',
												value: 'active',
											},
											{
												label: 'expired',
												value: 'expired',
											},
											{
												label: 'underScreening',
												value: 'underScreening',
											},
										]}
									/>
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
	fetchProperties: (callback, status) =>
		dispatch(fetchProperties({ callback, status })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
