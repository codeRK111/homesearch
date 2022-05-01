import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { GST } from '../../../model/gstModel';
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
	gsts: GST[];
	fetchGSTs: () => void;
}

const GSTsTable: React.FC<IGSTTable> = ({ loading, gsts, fetchGSTs }) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<GST>>([]);

	// Effects
	useEffect(() => {
		setData(gsts);
	}, [gsts]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 8 }, (_, i) => i + 1).map((c) => (
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
							<StyledTableCell>GST ID</StyledTableCell>
							<StyledTableCell>GST Number</StyledTableCell>
							<StyledTableCell>IGST</StyledTableCell>
							<StyledTableCell>CGST</StyledTableCell>
							<StyledTableCell>SGST</StyledTableCell>
							<StyledTableCell>Created At</StyledTableCell>
							<StyledTableCell>UpdatedAt</StyledTableCell>
							<StyledTableCell>Created By</StyledTableCell>

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
											{row.gstNumber}
										</StyledTableCell>

										<StyledTableCell>
											{row.number}
										</StyledTableCell>
										<StyledTableCell>
											{row.igst ? `${row.igst}%` : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.cgst ? `${row.cgst}%` : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.sgst ? `${row.sgst}%` : '-'}
										</StyledTableCell>

										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.updatedAt)}
										</StyledTableCell>
										<StyledTableCell>
											{row.createdBy.name}
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default GSTsTable;
