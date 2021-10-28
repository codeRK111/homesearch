import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { parseDate, renderPackageName } from '../../../utils/render';

import Paper from '@material-ui/core/Paper';
import { Subscription } from '../../../model/subscription.interface';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 13,
	},
	body: {
		fontSize: 13,
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

interface IMyPostedLeadsTable {
	loading: boolean;
	subscriptions: Subscription[];
}

const TenantSubscriptionTable: React.FC<IMyPostedLeadsTable> = ({
	loading,
	subscriptions,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<Subscription>>([]);

	// Effects
	useEffect(() => {
		setData(subscriptions);
	}, [subscriptions]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
				<StyledTableCell key={c}>
					<CircularProgress size={15} color="inherit" />
				</StyledTableCell>
			))}
		</StyledTableRow>
	);

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Subscription ID</StyledTableCell>
							<StyledTableCell>Payment ID</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell>Close By</StyledTableCell>
							<StyledTableCell>Client Name</StyledTableCell>
							<StyledTableCell>Client Number</StyledTableCell>
							<StyledTableCell>Client Email</StyledTableCell>
							<StyledTableCell>Package Name</StyledTableCell>
							<StyledTableCell>Main Amount</StyledTableCell>
							<StyledTableCell>Amount Paid</StyledTableCell>
							<StyledTableCell>Feedback</StyledTableCell>
							<StyledTableCell>Rating</StyledTableCell>

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
											{row.subscriptionNumber}
										</StyledTableCell>
										<StyledTableCell>
											{row.paymentId}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt as Date)}
										</StyledTableCell>
										<StyledTableCell>
											{row.dealBy ? row.dealBy.name : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.user.name}
										</StyledTableCell>
										<StyledTableCell>
											{row.user.number}
										</StyledTableCell>
										<StyledTableCell>
											{row.user.email}
										</StyledTableCell>
										<StyledTableCell>
											{renderPackageName(
												row.packageType,
												row.package
											)}
										</StyledTableCell>
										<StyledTableCell>
											{row.mainAmount}
										</StyledTableCell>
										<StyledTableCell>
											{row.paidAmount}
										</StyledTableCell>
										<StyledTableCell>-</StyledTableCell>
										<StyledTableCell>-</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TenantSubscriptionTable;
