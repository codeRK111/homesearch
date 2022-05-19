import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import ChangePaymentStatus from './payment-status';
import DownloadInvoice from './download-invoice';
import { Invoice } from '../../../model/invoice.interface';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { parseDate } from '../../../utils/render';

// import EditIcon from '@material-ui/icons/Edit';

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

interface IGSTTable {
	loading: boolean;
	gsts: Invoice[];
	fetchInvoices: () => void;
}

const InvoiceTable: React.FC<IGSTTable> = ({
	loading,
	gsts,
	fetchInvoices,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<Invoice>>([]);

	// Effects
	useEffect(() => {
		setData(gsts);
	}, [gsts]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 17 }, (_, i) => i + 1).map((c) => (
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
							<StyledTableCell>Invoice Number</StyledTableCell>
							<StyledTableCell>Customer Name</StyledTableCell>
							<StyledTableCell>Customer Email</StyledTableCell>
							<StyledTableCell>
								Customer Phone Number
							</StyledTableCell>
							<StyledTableCell>
								Service Provided By
							</StyledTableCell>
							<StyledTableCell>Product Desc</StyledTableCell>
							<StyledTableCell>GST Number</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell>Payment Status</StyledTableCell>
							<StyledTableCell>Amount</StyledTableCell>
							<StyledTableCell>Discount</StyledTableCell>
							<StyledTableCell>
								Amount After Discount
							</StyledTableCell>
							<StyledTableCell>CGST % / Price</StyledTableCell>
							<StyledTableCell>SGST % / Price</StyledTableCell>
							<StyledTableCell>IGST % / Price</StyledTableCell>
							<StyledTableCell>Peice After GST</StyledTableCell>
							<StyledTableCell>Download</StyledTableCell>

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
											{row.invoiceNumber}
										</StyledTableCell>
										<StyledTableCell>
											{row.name}
										</StyledTableCell>
										<StyledTableCell>
											{row.email}
										</StyledTableCell>
										<StyledTableCell>
											{row.number}
										</StyledTableCell>
										<StyledTableCell>
											{row.serviceProvidedBy}
										</StyledTableCell>
										<StyledTableCell>
											{row.description}
										</StyledTableCell>
										<StyledTableCell>
											{row.gst}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.date)}
										</StyledTableCell>
										<StyledTableCell>
											<ChangePaymentStatus
												id={row.id}
												initialStatus={
													row.paymentStatus
												}
											/>
										</StyledTableCell>
										<StyledTableCell>
											{row.amount}
										</StyledTableCell>
										<StyledTableCell>
											{row.discount}
										</StyledTableCell>
										<StyledTableCell>
											{row.amountAfterDiscount}
										</StyledTableCell>
										<StyledTableCell>
											{row.cgstPercentage} /{' '}
											{row.cgstAmount}
										</StyledTableCell>
										<StyledTableCell>
											{row.sgstPercentage} /{' '}
											{row.sgstAmount}
										</StyledTableCell>
										<StyledTableCell>
											{row.igstPercentage} /{' '}
											{row.igstAmount}
										</StyledTableCell>
										<StyledTableCell>
											{row.amountAfterGST}
										</StyledTableCell>
										<StyledTableCell>
											<DownloadInvoice id={row.id} />
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InvoiceTable;
