import { Box, CircularProgress, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Paper from '@material-ui/core/Paper';
import RequestRemarkDialog from '../requestRemark';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { renderBoolean } from '../../utils/render.utils';

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

function JoinRequestTable({ loading, requests }) {
	const classes = useStyles();

	// State
	const [request, setRequest] = useState(null);
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);

	// Callbacks
	const onRemark = (id) => () => {
		setRequest(id);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onSuccess = (id, value) => {
		setData((prevState) =>
			prevState.map((c) => {
				if (c.id === id) {
					c.remark = value;
				}

				return c;
			})
		);
	};

	// Effects
	useEffect(() => {
		setData(requests);
	}, [requests]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 9 }, (_, i) => i + 1).map((c) => (
				<StyledTableCell key={c}>
					<CircularProgress size={15} color="inherit" />
				</StyledTableCell>
			))}
		</StyledTableRow>
	);

	return (
		<Box>
			<RequestRemarkDialog
				open={open}
				handleClose={onClose}
				id={request}
				onSuccess={onSuccess}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone Number</StyledTableCell>
							<StyledTableCell>Number Verified</StyledTableCell>
							<StyledTableCell>Remark</StyledTableCell>
							<StyledTableCell>Remark By</StyledTableCell>
							<StyledTableCell>Created</StyledTableCell>
							<StyledTableCell>Updated</StyledTableCell>
							<StyledTableCell>Add Remark</StyledTableCell>

							{/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading
							? Loader
							: data.map((row, i) => (
									<StyledTableRow key={row.id}>
										<StyledTableCell>
											{i + 1}
										</StyledTableCell>

										<StyledTableCell>
											{row.name}
										</StyledTableCell>
										<StyledTableCell>
											{row.email}
										</StyledTableCell>
										<StyledTableCell>
											{row.phoneNumber}
										</StyledTableCell>
										<StyledTableCell>
											{renderBoolean(row.verified)}
										</StyledTableCell>
										<StyledTableCell>
											{row.remark}
										</StyledTableCell>
										<StyledTableCell>
											{row.remarkBy
												? row.remarkBy.name
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.updatedAt)}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={onRemark(row.id)}
											>
												<ChatBubbleIcon />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default JoinRequestTable;
