import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Box } from '@material-ui/core';
import DeleteAlert from '../deleteAlert/deleteAlert.component';
import DeleteIcon from '@material-ui/icons/Delete';
import ForumIcon from '@material-ui/icons/Forum';
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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteQuery } from '../../redux/query/query.actions';
import moment from 'moment';
import { selectDeleteQueryLoading } from '../../redux/query/query.selector';
import { useHistory } from 'react-router-dom';

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY');
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
});

function CustomizedTables({ queries, deleteQuery, deleteLoading, loading }) {
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [allQueries, setAllQueries] = React.useState([]);
	const history = useHistory();
	React.useEffect(() => {
		setAllQueries(queries);
	}, [queries]);
	React.useEffect(() => {
		if (!open) {
			setId(null);
		}
	}, [open]);
	const handleClose = () => {
		setOpen(false);
	};
	const onYes = () => {
		deleteQuery(id, handleDeleteQuery);
	};

	const onDelete = (id) => (_) => {
		setId(id);
		setOpen(true);
	};

	const handleDeleteQuery = (status, data) => {
		if (status === 'success') {
			handleClose();
			setAllQueries(queries.filter((c) => c.id !== data.id));
		}
	};

	const onRedirect = (data) => (_) => {
		history.push(redirectUrl(data));
	};
	const redirectToQueryConvo = (id) => (_) => {
		history.push(`/queries/${id}`);
	};

	const classes = useStyles();
	const renderTitle = (data) => {
		switch (data.type) {
			case 'property':
				return data.property.title;
			case 'project':
				return data.project.title;
			case 'projectproperty':
				return data.projectProperty.title;

			default:
				break;
		}
	};

	const redirectUrl = (data) => {
		switch (data.type) {
			case 'property':
				const u = data.property.for === 'rent' ? '' : 'Sale';
				return `/properties/editProperties${u}/${data.property.id}`;
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
			{loading && queries.length === 0 ? (
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
								<StyledTableCell>Property</StyledTableCell>
								<StyledTableCell>Query For</StyledTableCell>
								<StyledTableCell>User</StyledTableCell>
								<StyledTableCell>Number</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Created</StyledTableCell>
								<StyledTableCell align="center">
									Actions
								</StyledTableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{allQueries.map((row, i) => (
								<StyledTableRow key={row.id}>
									<StyledTableCell>{i + 1}</StyledTableCell>
									<StyledTableCell>
										{renderTitle(row)}
									</StyledTableCell>
									<StyledTableCell>
										{row.queryType}
									</StyledTableCell>
									<StyledTableCell>
										{row.userName}
									</StyledTableCell>
									<StyledTableCell>
										{row.phoneNumber}
									</StyledTableCell>
									<StyledTableCell>
										{row.email}
									</StyledTableCell>
									<StyledTableCell>
										{parseDate(row.createdAt)}
									</StyledTableCell>
									<StyledTableCell>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-around"
										>
											<Tooltip title="View">
												<Box
													className="pointer"
													onClick={onRedirect(row)}
												>
													<VisibilityIcon size="small" />
												</Box>
											</Tooltip>
											{/* <Tooltip title="Conversations">
												<Box
													className="pointer"
													onClick={redirectToQueryConvo(
														row.id
													)}
												>
													<ForumIcon size="small" />
												</Box>
											</Tooltip> */}

											<Tooltip title="Delete">
												<Box
													className="pointer"
													onClick={onDelete(row.id)}
												>
													<DeleteIcon
														style={{
															fontSize: '1.3rem',
														}}
													/>
												</Box>
											</Tooltip>
										</Box>
									</StyledTableCell>
								</StyledTableRow>
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
});

const dispatchStateToProps = (dispatch) => ({
	deleteQuery: (id, callback) => dispatch(deleteQuery({ id, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(CustomizedTables);
