import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { isExpired, parseDate } from '../../../utils/render';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import { PaymentLink } from '../../../model/payment.interface';
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
	links: PaymentLink[];
}

const PaymentLinkTable: React.FC<IMyPostedLeadsTable> = ({
	loading,
	links,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<PaymentLink>>([]);

	// Effects
	useEffect(() => {
		setData(links);
	}, [links]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 11 }, (_, i) => i + 1).map((c) => (
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
							<StyledTableCell>Payment Link ID</StyledTableCell>
							<StyledTableCell>Amount</StyledTableCell>
							<StyledTableCell>Client Name</StyledTableCell>
							<StyledTableCell>Client Number</StyledTableCell>
							<StyledTableCell>Notes</StyledTableCell>
							<StyledTableCell>Payment Status</StyledTableCell>
							<StyledTableCell>Generated Date</StyledTableCell>
							<StyledTableCell>Expiry Date</StyledTableCell>
							<StyledTableCell>Is expired</StyledTableCell>
							<StyledTableCell>Link</StyledTableCell>

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
											{row.paymentLinkNumber}
										</StyledTableCell>
										<StyledTableCell>
											&#x20B9; {row.amount}
										</StyledTableCell>
										<StyledTableCell>
											{row.name}
										</StyledTableCell>
										<StyledTableCell>
											{row.phone}
										</StyledTableCell>
										<StyledTableCell>
											{row.notes}
										</StyledTableCell>
										<StyledTableCell>
											{row.statis === 'active' ? (
												<CancelIcon color="secondary" />
											) : (
												<CheckCircleIcon color="primary" />
											)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt as Date)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.expiryDate as Date)}
										</StyledTableCell>
										<StyledTableCell>
											{isExpired(row.expiryDate) ? (
												<CheckCircleIcon color="secondary" />
											) : (
												<CancelIcon color="primary" />
											)}
										</StyledTableCell>
										<StyledTableCell>
											<a
												href={`https://homesearch18.com/pay?pl=${row.id}`}
												target="_blank"
												rel="noreferrer"
											>{`https://homesearch18.com/pay?pl=${row.id}`}</a>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default PaymentLinkTable;
