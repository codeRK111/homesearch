import { Avatar, Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderLandArea,
	renderProjectTypes,
	renderTypes,
} from '../../../utils/render.utils';
import {
	faBed,
	faBuilding,
	faDoorOpen,
	faRupeeSign,
	faSquare,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useStyles from '../propertyDetails.style';

const ApartmentHighLights = ({ project, info }) => {
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
						<Box>Unit Types</Box>
						<h4 className={classes.title}>
							{renderProjectTypes(project, info)}
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
						<Box>Total Units</Box>
						<h4 className={classes.title}>{info.totalUnits}</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={3}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faSquare} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Area</Box>
						<h4 className={classes.title}>
							{renderLandArea(project, info)} Sq.ft
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
						<Box>Price Range</Box>
						<h4 className={classes.title}>
							{info.minPrice / 100000} L -{' '}
							{info.maxPrice / 100000} L
						</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={3}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faDoorOpen} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Status</Box>
						<h4 className={classes.title}>
							{capitalizeFirstLetter(project.complitionStatus)}
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
						<Box>Property Type</Box>
						<h4 className={classes.title}>
							{renderTypes(project.projectType)}
						</h4>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ApartmentHighLights;
