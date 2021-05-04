import { Grid } from '@material-ui/core';
import React from 'react';
import fullViewImage from '../../../assets/360.png';
import manWithMobile from '../../../assets/manWithMobile.png';
import useStyles from './virtualTour.style';

const VirtualTour = () => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<Grid container spacing={5}>
				<Grid item xs={12} md={7}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<p className={classes.tourHeading}>
								Enjoy Virtual Tour From The Comfort & Safety Of
								Your Home.{' '}
							</p>
							<a href="/" className={classes.link}>
								See all 360' Listings
							</a>
						</Grid>
						<Grid item xs={12} md={6}>
							<img
								src={fullViewImage}
								alt="Full View"
								className={classes.image}
							/>
						</Grid>
					</Grid>
					<p className={classes.bottomLink}>
						Create virtual tour of your house or project.{' '}
						<a href="/">Download the app.</a>
					</p>
				</Grid>
				<Grid item xs={12} md={5}>
					<img
						src={manWithMobile}
						alt="Man With Mobile"
						className={classes.image}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default VirtualTour;
