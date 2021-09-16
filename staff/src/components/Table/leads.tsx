import { Box, CircularProgress, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import { ILead } from '../../model/lead.interface';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrimText from '../TrimText';
import moment from 'dayjs';
import { useHistory } from 'react-router';

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date: Date | undefined) => {
	if (!date) {
		return '-';
	}
	const m = moment(date);
	return m.format('DD MMM YYYY hh:mm');
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

interface ILeadsTable {
	loading: boolean;
	leads: ILead[];
}

const LeadsTable: React.FC<ILeadsTable> = ({ loading, leads }) => {
	const classes = useStyles();
	const history = useHistory();

	// State

	const [data, setData] = useState<Array<ILead>>([]);

	const onEdit = (id: string | undefined) => () =>
		history.push(`/lead/${id}`);

	// Effects
	useEffect(() => {
		setData(leads);
	}, [leads]);

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
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone Number</StyledTableCell>
							<StyledTableCell>Message</StyledTableCell>
							<StyledTableCell>Assigned On</StyledTableCell>
							<StyledTableCell>Staff Feedback</StyledTableCell>
							<StyledTableCell>Posted On</StyledTableCell>
							<StyledTableCell>Update</StyledTableCell>

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
											{row.name ? row.name : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.email ? row.email : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.number}
										</StyledTableCell>
										<StyledTableCell>
											{row.message ? (
												<TrimText
													text={row.message}
													num={50}
												/>
											) : (
												'-'
											)}
										</StyledTableCell>

										<StyledTableCell>
											{parseDate(row.assignedAt)}
										</StyledTableCell>

										<StyledTableCell>
											{row.feedback}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={onEdit(row.id)}
											>
												<EditIcon color="primary" />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default LeadsTable;
