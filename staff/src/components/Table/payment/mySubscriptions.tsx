import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	Subscription,
	SubscriptionPaymentMode,
} from '../../../model/subscription.interface';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { parseDate, renderPackageName } from '../../../utils/render';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { User } from '../../../model/user.interface';

// import EditIcon from '@material-ui/icons/Edit';

const renderClientDetails = (sub: Subscription, field: any) => {
	if (
		sub.paymentMode === SubscriptionPaymentMode.Cash ||
		sub.paymentMode === SubscriptionPaymentMode.Gateway
	) {
		return sub[field as keyof Subscription] as string;
	} else {
		return sub.user[field as keyof User];
	}
};

// 9778538778

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
	subscriptions: Subscription[];
}

const MySubscriptionsTable: React.FC<IMyPostedLeadsTable> = ({
	subscriptions,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<Subscription>>([]);

	// Effects
	useEffect(() => {
		setData(subscriptions);
	}, [subscriptions]);

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Subscription ID</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell>Client Details</StyledTableCell>

							<StyledTableCell>Package Name</StyledTableCell>
							<StyledTableCell>Main Amount</StyledTableCell>
							<StyledTableCell>Amount Paid</StyledTableCell>
							<StyledTableCell>Payment Mode</StyledTableCell>
							<StyledTableCell>Send Invoice</StyledTableCell>

							{/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{data.map((row, i) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell>{i + 1}</StyledTableCell>

								<StyledTableCell>
									{row.subscriptionNumber}
								</StyledTableCell>
								<StyledTableCell>
									{parseDate(row.createdAt as Date)}
								</StyledTableCell>

								<StyledTableCell>
									Name -{' '}
									<b>{renderClientDetails(row, 'name')}</b>{' '}
									<br />
									Number -{' '}
									<b>
										{renderClientDetails(row, 'number')}
									</b>{' '}
									<br />
									Email -{' '}
									<b>{renderClientDetails(row, 'email')}</b>
								</StyledTableCell>

								<StyledTableCell>
									{renderPackageName(
										row.packageType,
										row.packageId
									)}
								</StyledTableCell>
								<StyledTableCell>
									{row.mainAmount}
								</StyledTableCell>
								<StyledTableCell>
									{row.paidAmount}
								</StyledTableCell>
								<StyledTableCell>
									{row.paymentMode}
								</StyledTableCell>
								<StyledTableCell>
									<Button
										variant="contained"
										color="primary"
										size="small"
									>
										Send
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default MySubscriptionsTable;
