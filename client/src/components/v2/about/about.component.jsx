import { Box, Grid } from '@material-ui/core';

import React from 'react';
import app from '../../../assets/app.png';
import store from '../../../assets/store.png';
import useStyles from './about.style';

const About = () => {
	const classes = useStyles();
	return (
		<div>
			<Box>
				<span className={classes.text}>
					<i>
						Homesearch18.com is the fastest growing India&#39;s most
						innovative real estate advertising platform for
						homebuyers, landlords, developers, and real estate
						brokers with world extending services to all property
						hunters. The webvsite offers listings for new homes,
						resale homes, rentals, plots and residential projects in
						pan India.But often he misses some critical pieces of
						the puzzle. If you are fed up with the countless online
						options and fake listings, your search for the perfect
						property and a great success of real estate investing
						lies in finding out the best property and tenants ends
						here.
					</i>
				</span>
			</Box>
			<Box className={classes.spacer}>
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<img src={app} alt="App" className={classes.appImage} />
					</Grid>
					<Grid item xs={12} md={6}>
						<h1 className={classes.title}>
							Find A New Home In Some Clicks
						</h1>
						<h2>
							Download our app <br /> (Coming soon ...){' '}
						</h2>
						<img
							src={store}
							alt="Store"
							className={classes.storeImage}
						/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default About;
