import {
	Box,
	Checkbox,
	Chip,
	CircularProgress,
	IconButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	parseDate,
	renderCellData,
	renderLeadStage,
} from '../../../utils/render';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
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
		fontWeight: 500,
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
	onDelete: (value: string) => void;
	manageSelectedLeads: (id: string) => void;
	hold: boolean;
	selectedLeads: string[];
	days: any;
	setDays: (days: any) => void;
}

const LeadsTable: React.FC<ILeadsTable> = ({
	loading,
	leads,
	fetchLeads,
	hold,
	manageSelectedLeads,
	selectedLeads,
	onDelete,
	setDays,
	days,
}) => {
	const classes = useStyles();
	const { user } = useTypedSelector((state) => state.auth);
	// State

	const [data, setData] = useState<Array<ILead>>([]);
	const [open, setOpen] = useState(false);
	const [selectedLead, setSelectedLead] = useState<ILead | null>(null);

	const handleChangeCheckbox = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		manageSelectedLeads(event.target.value);
	};

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
			{Array.from({ length: 6 }, (_, i) => i + 1).map((c) => (
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
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell width={'10%'}>
								Reschedule <br />
								<select
									value={days}
									onChange={(e) => setDays(e.target.value)}
								>
									<option value={'off'}>Off</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={5}>5</option>
									<option value={7}>7</option>
									<option value={10}>10</option>
									<option value={15}>15</option>
									<option value={30}>30</option>
								</select>
							</StyledTableCell>
							<StyledTableCell>Tags</StyledTableCell>
							<StyledTableCell>Details</StyledTableCell>

							<StyledTableCell>Staff Details</StyledTableCell>

							<StyledTableCell>Comments</StyledTableCell>
							<StyledTableCell>Assign</StyledTableCell>
							{/* <StyledTableCell>Delete</StyledTableCell> */}

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
											{row.comments
												?.filter((b) => b.reschedule)
												.map((c) => (
													<Chip
														icon={
															<AccessTimeIcon />
														}
														label={`${parseDate(
															c.reschedule as Date
														)}-${c.from.name}`}
													/>
												))}
										</StyledTableCell>
										<StyledTableCell>
											{row.tags && (
												<Box mt="0.3rem">
													{row.tags.map((c, i) => (
														<Chip
															key={i}
															label={c}
														/>
													))}
												</Box>
											)}
										</StyledTableCell>

										<StyledTableCell>
											<b>Name: </b>
											{row.name ? row.name : '-'} <br />
											<b>Email: </b>
											{row.email ? row.email : '-'} <br />
											<b>Phone: </b> {row.number} <br />
											<b>City: </b>{' '}
											{row.city
												? (row.city as City).name
												: '-'}{' '}
											<br />
											<b>Location: </b>{' '}
											{row.preferedLocation}
											<br />
											<b>Category: </b>{' '}
											{renderCellData(row.userCategory)}
											<br />
											<b>Requirement: </b>{' '}
											{renderCellData(row.requirement)}
											<br />
											<b>Requirement Type: </b>{' '}
											{renderCellData(row.category)}
											<br />
											<b>Property Type: </b>{' '}
											{renderCellData(row.pType)}
											<br />
											{row.propertyRequirements && (
												<Box>
													{row.propertyRequirements.map(
														(c, i) => (
															<Chip
																key={i}
																label={c}
															/>
														)
													)}
												</Box>
											)}
											{renderCellData(row.minPrice)} to{' '}
											{renderCellData(row.maxPrice)}
										</StyledTableCell>

										<StyledTableCell>
											<b>Created At: </b>
											{parseDate(
												row.createdAt as Date
											)}{' '}
											<br />
											<b>Posted By: </b>
											{row.createdBy?.name} <br />
											<b>Stage: </b>
											{renderLeadStage(row)} <br />
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={openModal(row)}
											>
												<QuestionAnswerIcon color="primary" />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<Checkbox
												value={row.id}
												onChange={handleChangeCheckbox}
												color="primary"
												checked={selectedLeads.includes(
													row.id as string
												)}
											/>
										</StyledTableCell>
										{/* <StyledTableCell>
											<IconButton
												onClick={() =>
													onDelete(row.id as string)
												}
											>
												<DeleteIcon color="secondary" />
											</IconButton>
										</StyledTableCell> */}
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default LeadsTable;
