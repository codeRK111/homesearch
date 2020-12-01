import { Avatar, Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderAvailability,
	renderToilets,
} from '../../../utils/render.utils';
import {
	faBed,
	faCouch,
	faHouseDamage,
	faListOl,
	faMap,
	faQuestion,
	faRupeeSign,
	faToilet,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useStyles from '../propertyDetails.style';

const ApartmentHighLights = ({ property }) => {
	const classes = useStyles();
	return (
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
							{property.numberOfBedrooms} Bedroom
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
							<FontAwesomeIcon icon={faCouch} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Furnishing</Box>
						<h4 className={classes.title}>
							{capitalizeFirstLetter(property.furnished)}
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
							<FontAwesomeIcon icon={faListOl} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Units</Box>
						<h4 className={classes.title}>
							{property.numberOfUnits}
						</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={3}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faHouseDamage} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Living areas</Box>
						<h4 className={classes.title}>
							{property.numberOflivingAreas}
						</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={3}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faRupeeSign} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Booking Amount</Box>
						<h4 className={classes.title}>
							{property.bookingAmount / 100000}L
						</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={3}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faQuestion} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Availability</Box>
						<h4 className={classes.title}>
							{renderAvailability(property)}
						</h4>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ApartmentHighLights;
