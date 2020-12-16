import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Box } from '@material-ui/core';
import DeleteAlert from '../deleteAlert/deleteAlert.component';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
import { deleteExpertQuery } from '../../redux/query/query.actions';
import moment from 'moment';
import { renderBoolean } from '../../utils/render.utils';
import { selectDeleteExpertQueryLoading } from '../../redux/query/query.selector';
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

function CustomizedTables({
	queries,
	deleteExpertQuery,
	deleteLoading,
	loading,
	fetchData,
}) {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [allQueries, setAllQueries] = React.useState([]);
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
		deleteExpertQuery(id, handleDeleteQuery);
	};

	const onDelete = (id) => (_) => {
		setId(id);
		setOpen(true);
	};
	const onEdit = (id) => (_) => {
		history.push(`/update-expert-query/${id}`);
	};

	const handleDeleteQuery = (status, data) => {
		if (status === 'success') {
			handleClose();
			fetchData();
		}
	};

	const classes = useStyles();

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
								<StyledTableCell>User</StyledTableCell>
								<StyledTableCell>Number</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Created</StyledTableCell>
								<StyledTableCell>
									Number verified
								</StyledTableCell>
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
										{row.name}
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
										{renderBoolean(row.verified)}
									</StyledTableCell>
									<StyledTableCell>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="center"
										>
											<Tooltip title="Edit">
												<Box
													className="pointer"
													onClick={onEdit(row.id)}
												>
													<EditIcon
														style={{
															fontSize: '1.2rem',
														}}
													/>
												</Box>
											</Tooltip>
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
	deleteLoading: selectDeleteExpertQueryLoading,
});

const dispatchStateToProps = (dispatch) => ({
	deleteExpertQuery: (id, callback) =>
		dispatch(deleteExpertQuery({ id, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(CustomizedTables);
