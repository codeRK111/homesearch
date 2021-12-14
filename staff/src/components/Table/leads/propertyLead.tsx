import { Box, Chip, CircularProgress, IconButton } from '@material-ui/core';
import { MyTableCell, MyTableRow } from '../../UI/Table';
import React, { useEffect, useState } from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { City } from '../../../model/city.interface';
import Paper from '@material-ui/core/Paper';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PriceRangeCell from '../priceRangeCell';
import { PropertyLead } from '../../../model/propertyLead.interface';
import PropertyLeadStatusButton from '../utility/PropertyLeadStatusButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import { parseAndShowOnlyDate } from '../../../utils/render';
import { useHistory } from 'react-router-dom';

// import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

interface IMyPostedLeadsTable {
	loading: boolean;
	leads: PropertyLead[];
}

const PropertyLeadsTable: React.FC<IMyPostedLeadsTable> = ({
	loading,
	leads,
}) => {
	const classes = useStyles();
	const history = useHistory();

	// State

	const [data, setData] = useState<Array<PropertyLead>>([]);

	const onRedirect = (path: string) => () => {
		history.push(path);
	};

	// Effects
	useEffect(() => {
		setData(leads);
	}, [leads]);

	const Loader = (
		<MyTableRow>
			{Array.from({ length: 11 }, (_, i) => i + 1).map((c) => (
				<MyTableCell key={c}>
					<CircularProgress size={15} color="inherit" />
				</MyTableCell>
			))}
		</MyTableRow>
	);

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<MyTableCell>SL Num.</MyTableCell>
							<MyTableCell>For</MyTableCell>
							<MyTableCell>Client Details</MyTableCell>
							<MyTableCell>City</MyTableCell>
							<MyTableCell>Location</MyTableCell>
							<MyTableCell>Price Range</MyTableCell>
							<MyTableCell>Details</MyTableCell>
							<MyTableCell>Posted On</MyTableCell>
							<MyTableCell>Posted By</MyTableCell>
							<MyTableCell>Is Possesed</MyTableCell>
							<MyTableCell>View Details</MyTableCell>
							<MyTableCell>Publish Property</MyTableCell>

							{/* <MyTableCell align="center">
									Actions
								</MyTableCell> */}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading
							? Loader
							: data.map((row, i) => (
									<MyTableRow key={row.id}>
										<MyTableCell>{i + 1}</MyTableCell>

										<MyTableCell>
											{row.for ? row.for : '-'}
										</MyTableCell>
										<MyTableCell>
											Name -{' '}
											<b>{row.name ? row.name : 'N/A'}</b>{' '}
											<br />
											Email -{' '}
											<b>
												{row.email ? row.email : 'N/A'}
											</b>{' '}
											<br />
											Phone -{' '}
											<b>
												{row.number ? row.number : '-'}
											</b>
										</MyTableCell>

										<MyTableCell>
											{row.city
												? (row.city as City).name
												: '-'}
										</MyTableCell>
										<MyTableCell>
											{row.location
												? row.location.name
												: '-'}
										</MyTableCell>
										<PriceRangeCell
											minPrice={row.minPrice as number}
											maxPrice={row.maxPrice as number}
										/>
										<MyTableCell>
											{row.propertyRequirements.map(
												(c) => (
													<Chip label={c} key={c} />
												)
											)}
										</MyTableCell>
										<MyTableCell>
											{parseAndShowOnlyDate(
												row.createdAt as Date
											)}
										</MyTableCell>
										<MyTableCell>
											{row.createdBy.name}
										</MyTableCell>
										<MyTableCell>
											<PropertyLeadStatusButton
												id={row.id}
												initialStatus={row.isPossessed}
											/>
										</MyTableCell>
										<MyTableCell>
											<IconButton
												onClick={onRedirect(
													`/property-leads/${row.id}`
												)}
											>
												<VisibilityIcon color="primary" />
											</IconButton>
										</MyTableCell>
										<MyTableCell>
											{row.isPosted ? (
												<IconButton>
													<CheckCircleIcon color="primary" />
												</IconButton>
											) : (
												<IconButton
													onClick={onRedirect(
														`/post-from-leads/${row.id}`
													)}
												>
													<PostAddIcon color="primary" />
												</IconButton>
											)}
										</MyTableCell>
									</MyTableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default PropertyLeadsTable;
