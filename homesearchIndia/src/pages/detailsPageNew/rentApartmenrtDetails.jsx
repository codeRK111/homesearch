import { Avatar, Box, Divider, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	parseDate,
	renderInfo,
	renderToilets,
} from '../../utils/render.utils';
import {
	faBed,
	faBuilding,
	faCalendarAlt,
	faCarSide,
	faCouch,
	faMap,
	faPersonBooth,
	faQuestionCircle,
	faToilet,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from './detailsPage.styles';

const ResaleApartmentDetails = ({ property }) => {
	const classes = useStyles();
	return (
		<div>
			<Box
				display="flex"
				width="100%"
				alignItems="center"
				mb="1rem"
				mt="1rem"
			>
				<Box flexGrow={1}>
					<Divider />
				</Box>
				<Box pl="0.5rem" pr="0.5rem">
					<h3 className={classes.title}>Property Details</h3>
				</Box>
				<Box flexGrow={1}>
					<Divider />
				</Box>
			</Box>
			<Grid container>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faBed} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Bedrooms</Box>
							<h4 className={classes.title}>
								{property.numberOfBedRooms} Bedroom
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faBed} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Balconies</Box>
							<h4 className={classes.title}>
								{property.numberOfBalconies}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faPersonBooth} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Available For</Box>
							<ul className="ul">
								{property.availableFor.map((c, i) => (
									<li key={i}>
										<h4 className={classes.title}>{c}</h4>
									</li>
								))}
							</ul>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faMap} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Super builtup area</Box>
							<h4 className={classes.title}>
								{property.superBuiltupArea} Sq.Ft
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faMap} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Carpet Area</Box>
							<h4 className={classes.title}>
								{property.carpetArea} Sq.Ft
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faQuestionCircle} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Availability</Box>
							<h4 className={classes.title}>
								{property.availability === 'immediately'
									? 'Ready to move'
									: parseDate(property.availableDate)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faCarSide} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Car Parking</Box>
							<h4 className={classes.title}>
								{capitalizeFirstLetter(
									renderInfo(property.carParking)
								)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faCouch} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Furnishing</Box>
							<h4 className={classes.title}>
								{capitalizeFirstLetter(
									renderInfo(property.furnished)
								)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faToilet} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Toilets</Box>
							<h4 className={classes.title}>
								{renderToilets(property.toiletTypes)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faBuilding} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Number of floors</Box>
							<h4 className={classes.title}>
								{renderInfo(property.noOfFloors)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faBuilding} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Property on floor</Box>
							<h4 className={classes.title}>
								{renderInfo(property.floor)}
							</h4>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<Box className={classes.p1Details} display="flex">
						<Box pl="0.5rem" pr="0.5rem">
							<Avatar>
								<FontAwesomeIcon icon={faCalendarAlt} />
							</Avatar>
						</Box>
						<Box display="flex" flexDirection="column">
							<Box>Notice Period</Box>
							<h4 className={classes.title}>
								{property.noticePeriod} days
							</h4>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

ResaleApartmentDetails.propTypes = {
	property: PropTypes.object.isRequired,
};

export default ResaleApartmentDetails;
