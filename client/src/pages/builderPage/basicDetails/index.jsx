import React from 'react';
import { useStyles } from '../project.style';
import {
	capitalizeFirstLetter,
	renderLandArea,
	renderProjectTypes,
	renderTypes,
} from '../../../utils/render.utils';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

export default ({ project, info }) => {
	const classes = useStyles();

	const apartment = (
		<div className={classes.gridContainer}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>
					Unit Type
				</p>
				<h3 className={classes.noSpace}>
					{renderProjectTypes(project, info)}
				</h3>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>
					Total Units
				</p>
				<h3 className={classes.noSpace}>{info.totalUnits}</h3>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>Area</p>
				<h3 className={classes.noSpace}>
					{renderLandArea(project, info)} Sq.ft
				</h3>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>
					Price Range
				</p>
				<h3 className={classes.noSpace}>
					{info.minPrice / 100000} L - {info.maxPrice / 100000} L
				</h3>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>
					Status
				</p>
				<h3 className={classes.noSpace}>
					{capitalizeFirstLetter(project.complitionStatus)}
				</h3>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<p className={clsx(classes.noSpace, classes.garyColor)}>
					Property Type
				</p>
				<h3 className={classes.noSpace}>
					{renderTypes(project.projectType)}
				</h3>
			</Box>
		</div>
	);

	return apartment;
};
