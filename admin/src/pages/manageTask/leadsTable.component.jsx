import { Box, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import DeleteAlert from '../../components/deleteAlert/deleteAlert.component';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteQuery } from '../../redux/query/query.actions';
import { fetchProjectAdvertisementLeads } from '../../redux/kra/kra.actions';
import moment from 'moment';
import { renderBoolean } from '../../utils/render.utils';
import { selectDeleteQueryLoading } from '../../redux/query/query.selector';
import { selectfetchProjectAdvertisementLeadsLoading } from '../../redux/kra/kra.selector';
import { useHistory } from 'react-router-dom';

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY hh:mm:ss');
};
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
	schedule: {
		backgroundColor: '#f1c40f',
	},
	closed: {
		backgroundColor: '#16a085',
		color: '#ffffff',
	},
	denied: {
		backgroundColor: '#e74c3c',
		color: '#ffffff',
	},
	info: {
		height: '15px',
		width: '15px',
		marginRight: '0.5rem',
	},
});

function CustomizedTables({
	queries,
	deleteQuery,
	deleteLoading,
	loading,
	fetchLeads,
	fetchLoading,
}) {
	const [open, setOpen] = React.useState(false);
	const [leads, setLeads] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState(null);
	const [id, setId] = React.useState(null);
	const history = useHistory();

	const renderStyle = (c) => {
		if (c.scheduleCall) {
			return classes.schedule;
		}

		if (c.status === 'closed') {
			return classes.closed;
		}
		if (c.status === 'denied') {
			return classes.denied;
		}
	};

	const fetchCallBack = (status, data) => {
		if (status === 'success') {
			setLeads(data);
			setAsyncError(null);
		} else {
			setLeads([]);
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (!open) {
			setId(null);
		}
	}, [open]);

	React.useEffect(() => {
		fetchLeads('5ff834ad527c84098cfedb87', fetchCallBack);
	}, []);

	const handleClose = () => {
		setOpen(false);
	};
	const onYes = () => {
		// deleteQuery(id, handleDeleteQuery);
	};

	const onDelete = (id) => (_) => {
		setId(id);
		setOpen(true);
	};

	// const handleDeleteQuery = (status, data) => {
	// 	if (status === 'success') {
	// 		handleClose();
	// 		setAllQueries(queries.filter((c) => c.id !== data.id));
	// 	}
	// };

	// const onRedirect = (data) => (_) => {
	// 	history.push(redirectUrl(data));
	// };

	const classes = useStyles();

	const redirectUrl = (data) => {
		switch (data.type) {
			case 'property':
				return `/properties/editProperties/${data.property.id}`;
			case 'project':
				return `/edit-projects/${data.project.id}`;
			case 'projectproperty':
				return `/edit-projects/${data.projectProperty.project}`;

			default:
				break;
		}
	};

	return (
		<Box>
			<Box>
				<Grid container spacing={2} justify="center">
					<Grid item xs={12} md={1}>
						<Box display="flex" alignItems="center">
							<Box
								className={clsx(classes.schedule, classes.info)}
							></Box>
							<Box className={classes.bf}>Schedule</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={1}>
						<Box display="flex" alignItems="center">
							<Box
								className={clsx(classes.closed, classes.info)}
							></Box>
							<Box className={classes.bf}>Closed</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={1}>
						<Box display="flex" alignItems="center">
							<Box
								className={clsx(classes.denied, classes.info)}
							></Box>
							<Box className={classes.bf}>Denied</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
			{fetchLoading ? (
				<Skeleton variant="rect" width={'100%'} height={'30vh'} />
			) : (
				<TableContainer component={Paper}>
					<DeleteAlert
						title="Are you sure ?"
						subtitle={'This item will be deleted permanently'}
						open={open}
						handleClose={handleClose}
						onYes={onYes}
					/>
					<Table
						className={classes.table}
						aria-label="customized table"
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>SL Num.</StyledTableCell>
								<StyledTableCell>Builder Name</StyledTableCell>
								<StyledTableCell>
									Contact Person Name
								</StyledTableCell>
								<StyledTableCell>Number</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Project Name</StyledTableCell>
								<StyledTableCell>Call Attended</StyledTableCell>
								<StyledTableCell>
									Client Response
								</StyledTableCell>
								<StyledTableCell>Schedule Call</StyledTableCell>
								<StyledTableCell>Schedule Time</StyledTableCell>
								<StyledTableCell>Created</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
								<StyledTableCell>Denied Reason</StyledTableCell>
								<StyledTableCell align="center">
									Actions
								</StyledTableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{leads.map((c, i) => (
								<TableRow key={c.id} className={renderStyle(c)}>
									<StyledTableCell>{i + 1}</StyledTableCell>
									<StyledTableCell>
										{c.builderName}
									</StyledTableCell>
									<StyledTableCell>
										{c.contactPersonName}
									</StyledTableCell>
									<StyledTableCell>
										{c.contactNumber
											? `${c.contactNumber}(primary)`
											: ''}
										<br />
										{c.ulternateContactNumber
											? `${c.ulternateContactNumber}(secondary)`
											: ''}
									</StyledTableCell>
									<StyledTableCell>{c.email}</StyledTableCell>
									<StyledTableCell>
										{c.projectName}
									</StyledTableCell>
									<StyledTableCell>
										{renderBoolean(c.callAttended)}
									</StyledTableCell>
									<StyledTableCell>
										{c.clientResponse}
									</StyledTableCell>
									<StyledTableCell>
										{renderBoolean(c.scheduleCall)}
									</StyledTableCell>
									<StyledTableCell>
										{c.scheduleTime
											? parseDate(c.scheduleTime)
											: '-'}
									</StyledTableCell>
									<StyledTableCell>
										{parseDate(c.createdAt)}
									</StyledTableCell>
									<StyledTableCell>
										{c.status}
									</StyledTableCell>
									<StyledTableCell>
										{c.deniedResponse.length === 0
											? '-'
											: c.deniedResponse[
													c.deniedResponse.length - 1
											  ]['message']}
									</StyledTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	deleteLoading: selectDeleteQueryLoading,
	fetchLoading: selectfetchProjectAdvertisementLeadsLoading,
});

const dispatchStateToProps = (dispatch) => ({
	deleteQuery: (id, callback) => dispatch(deleteQuery({ id, callback })),
	fetchLeads: (id, callback) =>
		dispatch(fetchProjectAdvertisementLeads({ id, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(CustomizedTables);
