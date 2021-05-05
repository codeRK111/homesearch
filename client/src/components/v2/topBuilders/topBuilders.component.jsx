import { Box, Grid } from '@material-ui/core';

import Card from '../builderCard/builderCard.component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '../chip/chip.component';
import React from 'react';
import useStyles from './topBuilders.style';

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
	return (
		<div>
			<div className={classes.listWrapper}>
				{cities.map((c, i) => (
					<Box mr="1.5rem">
						<Chip title={c} key={i} />
					</Box>
				))}
			</div>
			<Box mt="3rem">
				<div className={classes.propertiesWrapper}>
					<div className={classes.scrollbar}>
						<div className={classes.scrollWrapper}>
							<ChevronLeftIcon style={{ fontSize: 40 }} />
						</div>
					</div>
					<div className={classes.content}>
						<Grid container spacing={3}>
							{Array.from(
								{ length: 3 },
								(_, idx) => `${++idx}`
							).map((c) => (
								<Grid item xs={12} md={4}>
									<Card key={c} />
								</Grid>
							))}
						</Grid>
					</div>
					<div className={classes.scrollbarRight}>
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
