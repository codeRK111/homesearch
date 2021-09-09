import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { DOMAIN_NAME } from '../../utils/staticData';
import OpinionStatusSwitch from '../switches/opinionStatus';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

function ProjectSurvaysTable({ loading, opinions }) {
	const classes = useStyles();

	// State

	const [data, setData] = useState([]);

	const renderIcon = (status) => {
		return status ? <CheckIcon /> : <CancelIcon />;
	};

	const renderTitle = (opinion) => {
		return (
			<a
				href={`${DOMAIN_NAME}/project-details/${opinion.project.id}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{opinion.project.title}
			</a>
		);
	};

	// Effects
	useEffect(() => {
		setData(opinions);
	}, [opinions]);

	const Loader = (
		<StyledTableRow>
			{Array.from({ length: 10 }, (_, i) => i + 1).map((c) => (
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
							<StyledTableCell>Project</StyledTableCell>
							<StyledTableCell>User</StyledTableCell>
							<StyledTableCell>Parking Easy</StyledTableCell>
							<StyledTableCell>Walkable Distance</StyledTableCell>
							<StyledTableCell>Student Area</StyledTableCell>
							<StyledTableCell>Dog friendly</StyledTableCell>
							<StyledTableCell>Family Area</StyledTableCell>
							<StyledTableCell>Safe Area</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>

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
											{renderTitle(row)}
										</StyledTableCell>
										<StyledTableCell>
											{row.user.name}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(row.parkingEasy)}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(
												row.walkableDistanceFromMarket
											)}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(row.studentArea)}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(row.dogFriendly)}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(row.familyArea)}
										</StyledTableCell>
										<StyledTableCell>
											{renderIcon(row.safeArea)}
										</StyledTableCell>
										<StyledTableCell>
											<OpinionStatusSwitch
												id={row.id}
												opinionStatus={row.status}
											/>
										</StyledTableCell>
									</StyledTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default ProjectSurvaysTable;
