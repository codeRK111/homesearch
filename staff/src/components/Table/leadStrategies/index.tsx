import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import { ILeadStrategy } from '../../../model/leadStrategy';
import Paper from '@material-ui/core/Paper';
import RemoveStrategyButton from '../utility/removeStrategyButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrimText from '../../TrimText';
import UpdateLeadStrategyDialog from '../../Dialogs/updateStrategy';
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

interface ILeadsTable {
	loading: boolean;
	leads: ILeadStrategy[];
	fetchLeads: () => void;
}

const LeadsStrategiesTable: React.FC<ILeadsTable> = ({
	loading,
	leads,
	fetchLeads,
}) => {
	const classes = useStyles();

	// State

	const [data, setData] = useState<Array<ILeadStrategy>>([]);
	const [selectedLeadStrategy, setSelectedLeadStrategy] =
		useState<ILeadStrategy | null>(null);
	const [open, setOpen] = useState(false);

	const openModal = (lead: ILeadStrategy) => () => {
		setSelectedLeadStrategy(lead);
		setOpen(true);
	};

	// Effects
	useEffect(() => {
		setData(leads);
	}, [leads]);

	const onSuccess = (id: string) => {
		setData((prevState) => prevState.filter((c) => c.id !== id));
	};

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
			<UpdateLeadStrategyDialog
				open={open}
				handleClose={() => {
					setOpen(false);
				}}
				fetchLeads={fetchLeads}
				strategy={selectedLeadStrategy}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>URL</StyledTableCell>
							<StyledTableCell>Photo</StyledTableCell>
							<StyledTableCell>Description</StyledTableCell>
							<StyledTableCell>Created At</StyledTableCell>
							<StyledTableCell>UpdatedAt</StyledTableCell>
							<StyledTableCell>Update</StyledTableCell>
							<StyledTableCell>Delete</StyledTableCell>

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
											<a
												href={`${row.url}`}
												target="_blank"
												rel="noreferrer"
											>
												{row.url}
											</a>
										</StyledTableCell>
										<StyledTableCell>
											<Tooltip
												title={
													<React.Fragment>
														<img
															src={`/assets/lead-strategies/${row.photo}`}
															alt="Banner"
															style={{
																width: '100%',
																height: '100%',
															}}
														/>
													</React.Fragment>
												}
											>
												<Avatar
													alt="Cindy Baker"
													src={`/assets/lead-strategies/${row.photo}`}
												/>
											</Tooltip>
										</StyledTableCell>
										<StyledTableCell>
											<TrimText text={row.description} />
										</StyledTableCell>

										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.updatedAt)}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={openModal(row)}
											>
												<EditIcon color="primary" />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<RemoveStrategyButton
												id={row.id}
												onSuccess={onSuccess}
											/>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default LeadsStrategiesTable;
