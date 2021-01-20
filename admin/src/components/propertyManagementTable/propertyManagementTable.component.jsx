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
import { deleteFeedback } from '../../redux/feedback/feedback.actions';
import { deleteProjectAdvertisement } from '../../redux/kra/kra.actions';
import moment from 'moment';
import { renderBoolean } from '../../utils/render.utils';
import { selectDeleteFeedbacksCount } from '../../redux/feedback/feedback.selectors';
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
	advertisements,
	deleteFeedback,
	deleteLoading,
	loading,
}) {
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [allQueries, setAllQueries] = React.useState([]);
	const history = useHistory();
	React.useEffect(() => {
		setAllQueries(advertisements);
	}, [advertisements]);
	React.useEffect(() => {
		if (!open) {
			setId(null);
		}
	}, [open]);
	const handleClose = () => {
		setOpen(false);
	};
	const onYes = () => {
		deleteFeedback(id, handleDeleteQuery);
	};

	const onDelete = (id) => (_) => {
		setId(id);
		setOpen(true);
	};
	const onEdit = (id) => (_) => {
		history.push(`/edit-property-advertisement/${id}`);
	};

	const handleDeleteQuery = (status, data) => {
		if (status === 'success') {
			handleClose();
			setAllQueries(advertisements.filter((c) => c.id !== data.id));
		}
	};

	const onRedirect = (data) => (_) => {
		history.push(redirectUrl(data));
	};

	const classes = useStyles();
	const renderTitle = (data) => {
		switch (data.propertyType) {
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
		switch (data.propertyType) {
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
			{loading && advertisements.length === 0 ? (
				<Box>
					<Skeleton
						variant="rect"
						width={'100%'}
						height={'4vh'}
						animation="wave"
					/>
					<Box mt="0.5rem">
						<Skeleton
							variant="rect"
							width={'100%'}
							height={'15vh'}
							animation="wave"
						/>
					</Box>
				</Box>
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
								<StyledTableCell>For</StyledTableCell>
								<StyledTableCell>Staff Name</StyledTableCell>
								<StyledTableCell>
									Min calls / day
								</StyledTableCell>
								<StyledTableCell>
									Min calls / month
								</StyledTableCell>
								{/* <StyledTableCell>Call Attended</StyledTableCell> */}
								<StyledTableCell>Message</StyledTableCell>
								<StyledTableCell>Created By</StyledTableCell>
								<StyledTableCell>Created At</StyledTableCell>
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
										{row.pFor}
									</StyledTableCell>
									<StyledTableCell>
										{row.staff.name}
									</StyledTableCell>
									<StyledTableCell>
										{row.minCallsPerDay}
									</StyledTableCell>
									<StyledTableCell>
										{row.minCallsPerMonth}
									</StyledTableCell>
									{/* <StyledTableCell>{0}</StyledTableCell> */}
									<StyledTableCell>
										{row.message}
									</StyledTableCell>
									<StyledTableCell>
										{row.admin.name}
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
											<Tooltip title="Edit">
												<Box
													className="pointer"
													onClick={onEdit(row.id)}
												>
													<EditIcon
														style={{
															fontSize: '1.3rem',
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
	deleteLoading: selectDeleteFeedbacksCount,
});

const dispatchStateToProps = (dispatch) => ({
	deleteFeedback: (id, callback) =>
		dispatch(deleteProjectAdvertisement({ id, callback })),
});

export default connect(mapStateToProps, dispatchStateToProps)(CustomizedTables);
