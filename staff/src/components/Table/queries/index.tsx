import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrimText from '../../TrimText';
import { UserQuery } from '../../../model/userQuery.interface';
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

interface ITestimonialTable {
	loading: boolean;
	queries: UserQuery[];
}

const UserQueriesTable: React.FC<ITestimonialTable> = ({
	loading,
	queries,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<UserQuery>>([]);

	// Effects
	useEffect(() => {
		setData(queries);
	}, [queries]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 7 }, (_, i) => i + 1).map((c) => (
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
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone Number</StyledTableCell>
							<StyledTableCell>Message</StyledTableCell>
							<StyledTableCell>Created At</StyledTableCell>
							<StyledTableCell>Number Verified</StyledTableCell>

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
											<TrimText
												text={
													row.message
														? row.message
														: ''
												}
											/>
										</StyledTableCell>

										<StyledTableCell>
											{parseDate(row.createdAt as Date)}
										</StyledTableCell>
										<StyledTableCell>
											{row.verified ? (
												<CheckCircleIcon
													style={{ color: 'green' }}
												/>
											) : (
												<CancelIcon
													style={{ color: 'red' }}
												/>
											)}
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default UserQueriesTable;
