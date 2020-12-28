import { Avatar, Box, Grid } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderBool,
	renderMinAndMax,
} from '../../../utils/render.utils';
import {
	faBuilding,
	faCarSide,
	faMap,
	faQuestionCircle,
	faRupeeSign,
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
							<FontAwesomeIcon icon={faMap} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Plot Area</Box>
						<h4 className={classes.title}>
							{renderMinAndMax(property.plotArea)} Sq.ft
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
						<Box>Plot Frontage</Box>
						<h4 className={classes.title}>
							{property.plotFrontage} Sq.Ft
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
						<Box>Length</Box>
						<h4 className={classes.title}>{property.length} Ft</h4>
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
						<Box>Width</Box>
						<h4 className={classes.title}>{property.width} ft</h4>
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
						<Box>Width of road</Box>
						<h4 className={classes.title}>
							{property.widthOfRoad} ft
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
						<Box>Is construction done</Box>
						<h4 className={classes.title}>
							{renderBool(property.constructionDone)}
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
						<Box>Is boundary wall made</Box>
						<h4 className={classes.title}>
							{renderBool(property.boundaryWallMade)}
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
						<Box>Is gated community</Box>
						<h4 className={classes.title}>
							{renderBool(property.gatedCommunity)}
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
						<Box>Land using zoning</Box>
						<h4 className={classes.title}>
							{capitalizeFirstLetter(property.landUsingZoning)}{' '}
							Zone
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
						<Box>Facing</Box>
						<h4 className={classes.title}>
							{capitalizeFirstLetter(property.facing)}
						</h4>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6} md={4}>
				<Box className={classes.p1Details} display="flex">
					<Box pl="0.5rem" pr="0.5rem">
						<Avatar>
							<FontAwesomeIcon icon={faRupeeSign} />
						</Avatar>
					</Box>
					<Box display="flex" flexDirection="column">
						<Box>Government Valuation</Box>
						<h4 className={classes.title}>
							{property.govermentValuation / 100000}L
						</h4>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ApartmentHighLights;
