import { Box, Grid } from '@material-ui/core';

import Card from '../propertyCard/propertyCard.component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '../chip/chip.component';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './rentProperties.style';

const cities = [
	'Banglore',
	'Navi Mumbai',
	'Mumbai',
	'Delhi NCR',
	'Chennai',
	'Hyderabad',
	'Pune',
	'Kolkata',
	'Bhubaneswar',
	'Chandigarh',
];

const RentProperties = () => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	return (
		<div>
			<div className={classes.listWrapper}>
				{cities.map((c, i) => (
					<Box className={classes.chipWrapper}>
						<Chip title={c} key={i} />
					</Box>
				))}
			</div>
			<Box mt="3rem">
				<div className={classes.propertiesWrapper}>
					<div className={clsx(classes.scrollbar, gClasses.smHide)}>
						<div className={classes.scrollWrapper}>
							<ChevronLeftIcon style={{ fontSize: 40 }} />
						</div>
					</div>
					<div className={classes.content}>
						<Grid container spacing={3}>
							{Array.from(
								{ length: 8 },
								(_, idx) => `${++idx}`
							).map((c) => (
								<Grid item xs={12} md={3}>
									<Card key={c} />
								</Grid>
							))}
						</Grid>
					</div>
					<div
						className={clsx(
							classes.scrollbarRight,
							gClasses.smHide
						)}
					>
						<div className={classes.scrollWrapper}>
							<ChevronRightIcon style={{ fontSize: 40 }} />
						</div>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default RentProperties;
