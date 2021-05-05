import About from '../../../components/v2/about/about.component';
import { Box } from '@material-ui/core';
import CustomerCount from '../../../components/v2/customerCount/customerCount.component';
import Enquiry from '../../../components/v2/enquiryComponent/enquiry.component';
import HeroArea from '../../../components/v2/heroArea/heroArea.component';
import LatestRentProperties from '../../../components/v2/latestRentProperties/rentProperties.component';
import NavBar from '../../../components/v2/nav/nav.component';
import React from 'react';
import RecentBlogs from '../../../components/v2/recentBlogs/recentBlogs.component';
import RentProperties from '../../../components/v2/rentProperties/rentProperties.component';
import TopBuilders from '../../../components/v2/topBuilders/topBuilders.component';
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
			<Box className={classes.componentSpacer}>
				<Enquiry />
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Top Builders of India</h2>
				<Box mt="3rem">
					<TopBuilders />
				</Box>
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h1 className={classes.primaryHeading}>Recent Blog</h1>
				<Box mt="3rem">
					<RecentBlogs />
				</Box>
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h1 className={classes.secondaryHeading}>About Us</h1>
				<Box mt="3rem">
					<About />
				</Box>
			</Box>
		</Box>
	);
};

export default HomePage;
