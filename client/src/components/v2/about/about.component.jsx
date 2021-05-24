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
						Since the days of its inception Z Estates has focused on
						some essential core values- Quality, Excellency and
						Customer Satisfaction. Z Estates have been recognized as
						a top Real Estate Developer in Odisha. We have
						established a culture of creating a customer friendly
						environment and ensure a long lasting relationship by
						practicing the highest quality and genuine standards.
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
						<h2>Download our app</h2>
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
