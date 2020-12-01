import { Box, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import React from 'react';
import useStyles from './propertyDetails.style';

const UnitConfiguration = ({ properties }) => {
	const classes = useStyles();
	return (
		<Box mt="1rem">
			<h3>Unit Configuration</h3>
			<Grid container className={classes.header}>
				<Grid item xs={3} className={classes.cell}>
					Unit Types
				</Grid>
				<Grid item xs={3} className={classes.cell}>
					Plot Area
				</Grid>
				<Grid item xs={3} className={classes.cell}>
					Plot Frontage
				</Grid>
				<Grid item xs={2} className={classes.cell}>
					Price
				</Grid>
				<Grid item xs={1} className={classes.cell}>
					Units
				</Grid>
			</Grid>
			<Box className={classes.itemWrapper}>
				{properties.map((c) => (
					<Grid container className={classes.item} key={c}>
						<Grid item xs={3} className={classes.cell}>
							<Link
								to={`/project-property/${c.id}`}
								target="_blank"
							>
								Land
							</Link>
						</Grid>
						<Grid item xs={3} className={classes.cell}>
							{`${Math.min(...c.plotArea)} - ${Math.max(
								...c.plotArea
							)}`}{' '}
							Sq.Ft
						</Grid>
						<Grid item xs={3} className={classes.cell}>
							{c.plotFrontage} Sq.Ft
						</Grid>
						<Grid item xs={2} className={classes.cell}>
							₹ {`${c.minPrice}Lac - ${c.maxPrice}Lac`}
						</Grid>
						<Grid item xs={1} className={classes.cell}>
							{c.numberOfUnits}
						</Grid>
					</Grid>
				))}
			</Box>
		</Box>
	);
};

export default UnitConfiguration;
