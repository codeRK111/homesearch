import { Box, CircularProgress } from '@material-ui/core';
import { Property, RentProperty } from '../../../model/property.interface';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
	properties: Array<Property & RentProperty>;
}

const RentPropertiesTable: React.FC<IMyPostedLeadsTable> = ({
	loading,
	properties,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<Property & RentProperty>>([]);

	// Effects
	useEffect(() => {
		setData(properties);
	}, [properties]);

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
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Title</StyledTableCell>
							<StyledTableCell>For</StyledTableCell>
							<StyledTableCell>Type</StyledTableCell>
							<StyledTableCell>City</StyledTableCell>
							<StyledTableCell>Location</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell>Posted On</StyledTableCell>

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
											{row.title ? row.title : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.for ? row.for : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.for === 'rent'
												? row.type
												: row.sale_type}
										</StyledTableCell>
										<StyledTableCell>
											{row.city ? row.city.name : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.location
												? row.location.name
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.status}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt as Date)}
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default RentPropertiesTable;
