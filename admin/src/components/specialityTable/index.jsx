import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateSpeciality from './updateSpeciality';
import moment from 'moment';

// import EditIcon from '@material-ui/icons/Edit';

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY');
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

function ProjectSpecialitiesTable({ specialities, fetchData }) {
	const [selectedSpeciality, setSelectedSpeciality] = React.useState(null);

	const onUpdate = (data) => (_) => {
		setSelectedSpeciality(data);
	};

	const handleClose = () => {
		setSelectedSpeciality(null);
	};

	const classes = useStyles();

	return (
		<Box>
			<UpdateSpeciality
				data={selectedSpeciality}
				handleClose={handleClose}
				fetchData={fetchData}
			/>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>SL Num.</StyledTableCell>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Description</StyledTableCell>
							<StyledTableCell>Created At</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">
								Actions
							</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{specialities.map((row, i) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell>{i + 1}</StyledTableCell>
								<StyledTableCell>{row.name}</StyledTableCell>
								<StyledTableCell>
									{row.description}
								</StyledTableCell>
								<StyledTableCell>
									{parseDate(row.createdAt)}
								</StyledTableCell>
								<StyledTableCell>{row.status}</StyledTableCell>

								<StyledTableCell>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="space-around"
									>
										<Tooltip title="Edit">
											<Box
												className="pointer"
												onClick={onUpdate(row)}
											>
												<EditIcon size="small" />
											</Box>
										</Tooltip>
									</Box>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default ProjectSpecialitiesTable;
