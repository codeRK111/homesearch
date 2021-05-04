import { Box } from '@material-ui/core';
import CustomerCount from '../../../components/v2/customerCount/customerCount.component';
import HeroArea from '../../../components/v2/heroArea/heroArea.component';
import LatestRentProperties from '../../../components/v2/latestRentProperties/rentProperties.component';
import NavBar from '../../../components/v2/nav/nav.component';
import React from 'react';
import RentProperties from '../../../components/v2/rentProperties/rentProperties.component';
import VirtualTour from '../../../components/v2/virtualTour/virtualTour.component';
import clsx from 'clsx';
import useStyles from './homePage.style';

const HomePage = () => {
	const classes = useStyles();
	return (
		<Box className={classes.wrapper}>
			<NavBar />
			<HeroArea />
			<Box className={classes.componentSpacer}>
				<VirtualTour />
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Exclusive Properties For Rent</h2>
				<Box mt="3rem">
					<RentProperties />
				</Box>
			</Box>
			<Box className={classes.componentSpacer}>
				<CustomerCount />
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Latest Properties For Rent</h2>
				<Box mt="3rem">
					<LatestRentProperties />
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;
