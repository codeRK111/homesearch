import { Box, CircularProgress, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { City } from '../../../model/city.interface';
import { ILead } from '../../../model/lead.interface';
import LeadsComments from '../../LeadComments';
import Paper from '@material-ui/core/Paper';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
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
	leads: ILead[];
	updateLeadComment?: (lead: ILead) => void;
}

const MyPostedLeadsTable: React.FC<IMyPostedLeadsTable> = ({
	loading,
	leads,
	updateLeadComment,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<ILead>>([]);
	const [open, setOpen] = useState(false);
	const [selectedLead, setSelectedLead] = useState<ILead | null>(null);

	const handleCloseModal = () => {
		setOpen(false);
	};
	const openModal = (lead: ILead) => () => {
		setSelectedLead(lead);
		setOpen(true);
	};

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
			<LeadsComments
				open={open}
				handleClose={handleCloseModal}
				id={selectedLead?.id}
				comments={selectedLead?.comments}
				number={selectedLead ? selectedLead.number : ''}
				updateLeadComment={updateLeadComment}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Source</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone Number</StyledTableCell>
							<StyledTableCell>City</StyledTableCell>
							<StyledTableCell>Location</StyledTableCell>
							<StyledTableCell>Category</StyledTableCell>
							<StyledTableCell>Posted On</StyledTableCell>
							<StyledTableCell>Comments</StyledTableCell>

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
											{row.source ? row.source : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.name ? row.name : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.email ? row.email : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.number ? row.number : '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.city
												? (row.city as City).name
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.preferedLocation
												? row.preferedLocation
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{row.userCategory
												? row.userCategory
												: '-'}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt as Date)}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={openModal(row)}
											>
												<QuestionAnswerIcon color="primary" />
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

export default MyPostedLeadsTable;
