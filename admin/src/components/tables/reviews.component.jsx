import { Box, CircularProgress } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderPropertyTypes,
} from '../../utils/render.utils';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { DOMAIN_NAME } from '../../utils/staticData';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import StatusSwitch from '../switches/reviewSwitch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TopSwitch from '../switches/topReviewSwitch';
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

function ReviewsTable({ loading, reviews }) {
	const classes = useStyles();

	const renderTitle = (review) => {
		switch (review.propertyType) {
			case 'property':
				return (
					<a
						href={`${DOMAIN_NAME}/v2/property-details/${review.property.id}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{review.property.title}
					</a>
				);
			case 'project':
				return (
					<a
						href={`${DOMAIN_NAME}/project-details/${review.project.id}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{review.project.title}
					</a>
				);

			default:
				return '-';
		}
	};

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
							<StyledTableCell>Category</StyledTableCell>
							<StyledTableCell>Property Type</StyledTableCell>
							<StyledTableCell>Property</StyledTableCell>
							<StyledTableCell>Message</StyledTableCell>
							<StyledTableCell>User</StyledTableCell>
							<StyledTableCell>Created</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell>Top</StyledTableCell>
							{/* <StyledTableCell align="center">
									Actions
								</StyledTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading
							? Loader
							: reviews.map((row, i) => (
									<StyledTableRow key={row.id}>
										<StyledTableCell>
											{i + 1}
										</StyledTableCell>

										<StyledTableCell>
											{capitalizeFirstLetter(row.pFor)}
										</StyledTableCell>
										<StyledTableCell>
											{renderPropertyTypes(
												row.propertyItemType
											)}
										</StyledTableCell>
										<StyledTableCell>
											{renderTitle(row)}
										</StyledTableCell>
										<StyledTableCell>
											{row.message}
										</StyledTableCell>
										<StyledTableCell>
											{row.user.name}
										</StyledTableCell>
										<StyledTableCell>
											{parseDate(row.createdAt)}
										</StyledTableCell>
										<StyledTableCell>
											<StatusSwitch
												id={row.id}
												reviewStatus={row.status}
											/>
										</StyledTableCell>
										<StyledTableCell>
											<TopSwitch
												id={row.id}
												top={row.top}
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

export default ReviewsTable;
