import { Box, CircularProgress, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { parseDate, renderCellData } from '../../../utils/render';

import { City } from '../../../model/city.interface';
import EditIcon from '@material-ui/icons/Edit';
import { ILead } from '../../../model/lead.interface';
import LeadsComments from '../../LeadComments';
import ManageLeadDialog from '../../Dialogs/manageLead';
import Paper from '@material-ui/core/Paper';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';

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

interface ILeadsTable {
	loading: boolean;
	leads: ILead[];
	fetchLeads: () => void;
}

const LeadsASMTable: React.FC<ILeadsTable> = ({
	loading,
	leads,
	fetchLeads,
}) => {
	const classes = useStyles();
	const history = useHistory();
	// State

	const [data, setData] = useState<Array<ILead>>([]);
	const [open, setOpen] = useState(false);
	const [manageOpen, setManageOpen] = useState(false);
	const [selectedLead, setSelectedLead] = useState<ILead | null>(null);

	const onEdit = (id: string | undefined) => () =>
		history.push(`/manage-lead/${id}`);

	const handleCloseModal = () => {
		setOpen(false);
	};
	const handleCloseManageModal = () => {
		setManageOpen(false);
	};
	const openModal = (lead: ILead) => () => {
		setSelectedLead(lead);
		setOpen(true);
	};
	const openManageModal = (lead: ILead) => () => {
		setSelectedLead(lead);
		setManageOpen(true);
	};

	// Effects
	useEffect(() => {
		setData(leads);
	}, [leads]);

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
			<LeadsComments
				open={open}
				handleClose={handleCloseModal}
				id={selectedLead?.id}
				comments={selectedLead?.comments}
				number={selectedLead ? selectedLead.number : ''}
				fetchLeads={fetchLeads}
			/>
			<ManageLeadDialog
				open={manageOpen}
				handleClose={handleCloseManageModal}
				id={selectedLead?.id}
				fetchLeads={fetchLeads}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Contact Details</StyledTableCell>
							<StyledTableCell>Category</StyledTableCell>
							<StyledTableCell>Requirement</StyledTableCell>
							<StyledTableCell>Requirement Type</StyledTableCell>
							<StyledTableCell>Property Type</StyledTableCell>
							<StyledTableCell>Budget</StyledTableCell>
							<StyledTableCell>Assigned On</StyledTableCell>

							<StyledTableCell>Comments</StyledTableCell>
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
											<b>Email: </b>
											{row.email ? row.email : '-'} <br />
											<b>Phone: </b> {row.number}
											<br />
											<b>City: </b>{' '}
											{row.city
												? (row.city as City).name
												: '-'}{' '}
											<br />
											<b>Location: </b>{' '}
											{row.preferedLocation}
										</StyledTableCell>
										<StyledTableCell>
											{renderCellData(row.userCategory)}
										</StyledTableCell>
										<StyledTableCell>
											{renderCellData(row.requirement)}
										</StyledTableCell>
										<StyledTableCell>
											{renderCellData(row.category)}
										</StyledTableCell>
										<StyledTableCell>
											{renderCellData(row.pType)}
										</StyledTableCell>
										<StyledTableCell>
											{renderCellData(row.minPrice)} to{' '}
											{renderCellData(row.maxPrice)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.saleAssignedAt)}
										</StyledTableCell>

										<StyledTableCell>
											<IconButton
												onClick={openModal(row)}
											>
												<QuestionAnswerIcon color="primary" />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={openManageModal(row)}
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

export default LeadsASMTable;
