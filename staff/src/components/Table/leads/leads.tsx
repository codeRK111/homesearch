import { Box, CircularProgress } from '@material-ui/core';
import { IStaff, StaffType } from '../../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { ILead } from '../../../model/lead.interface';
import { LeadRow } from './lead-row';
import LeadsComments from '../../LeadComments';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { UpdateLeadDialog } from '../../Dialogs/updateLead';
import { asyncFetchAdmins } from '../../../API/auth';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

// import EditIcon from '@material-ui/icons/Edit';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 12,
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
		minWidth: 500,
	},
});

interface ILeadsTable {
	loading: boolean;
	leads: ILead[];
	fetchLeads: () => void;
}

const LeadsTable: React.FC<ILeadsTable> = ({ loading, leads, fetchLeads }) => {
	const classes = useStyles();

	const { user } = useTypedSelector((state) => state.auth);
	// State

	const [data, setData] = useState<Array<ILead>>([]);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [staffLoading, setStaffLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('');
	const [editOpen, setEditOpen] = useState(false);

	const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
	const [selectedUpdateLead, setSelectedUpdateLead] = useState<ILead | null>(
		null
	);

	const handleCloseModal = () => {
		setOpen(false);
	};

	const fetchStaffs = useCallback(async () => {
		try {
			setStaffLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				types: [
					StaffType.ClientSupport,
					StaffType.AssistantSalesManager,
					StaffType.SalesExecutive,
					StaffType.GM,
				],
				page: 1,
				limit: 200,
			});
			setStaffLoading(false);
			setStaffs(resp.admins);
		} catch (error) {
			setStaffLoading(false);
			setStaffs([]);
		}
	}, []);

	// Effects
	useEffect(() => {
		setData(leads);
	}, [leads]);
	// Effects
	useEffect(() => {
		fetchStaffs();
	}, [fetchStaffs]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 5 }, (_, i) => i + 1).map((c) => (
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
			<UpdateLeadDialog
				open={editOpen}
				setOpen={setEditOpen}
				id={selectedUpdateLead ? (selectedUpdateLead.id as string) : ''}
				onSuccess={fetchLeads}
			/>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Expand</StyledTableCell>
							<StyledTableCell>
								Reschedule & Update
							</StyledTableCell>
							<StyledTableCell>Tags</StyledTableCell>
							<StyledTableCell>Details</StyledTableCell>
							<StyledTableCell>Staff Details</StyledTableCell>
							<StyledTableCell>Assign</StyledTableCell>

							<StyledTableCell>Action</StyledTableCell>
							{/* <StyledTableCell>Send Query</StyledTableCell> */}

							{/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading || staffLoading
							? Loader
							: data.map((row, i) => (
									<LeadRow
										data={row}
										id={row.id as string}
										selectedId={id}
										setSelectedId={setId}
										staffs={staffs}
									/>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default LeadsTable;
