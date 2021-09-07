import About from '../../../components/v2/about/about.component';
import { Box } from '@material-ui/core';
import Carousel from '../../../components/carousel';
import Enquiry from '../../../components/v2/enquiryComponent/enquiry.component';
import EnquiryAgent from '../../../components/v2/enquiryComponent/enquiryAgent.component';
import HeroArea from '../../../components/v2/heroArea/v2';
import NavBar from '../../../components/v2/nav/nav.component';
import React from 'react';
import RecentBlogs from '../../../components/v2/recentBlogs/recentBlogs.component';
import RentProperties from '../../../components/v2/rentProperties/rentProperties.component';
import SaleProperties from '../../../components/v2/saleProperties/saleProperties.component';
import VirtualTour from '../../../components/v2/virtualTour/virtualTour.component';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import useStyles from './homePage.style';

// import TopBuilders from '../../../components/v2/topBuilders/topBuilders.component';




// import CustomerCount from '../../../components/v2/customerCount/customerCount.component';

// import LatestRentProperties from '../../../components/v2/latestRentProperties/rentProperties.component';

const HomePage = () => {
	const classes = useStyles();
	let cancelToken = React.useRef();

	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	React.useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				cancelToken.current = axios.CancelToken.source();

				const res = await axios.get(apiUrl('/page/homePage'), {
					cancelToken: cancelToken.current.token,
				});

				console.log(res.data.data);
				setData(res.data.data);
				setLoading(false);
			} catch (error) {
				setData(null);
				console.log(error);
				setLoading(false);
			}
		})();
	}, []);
	return (
		<Box className={classes.wrapper}>
			<NavBar />
			<HeroArea
				topCities={data ? data.cities : []}
				initialLoading={loading}
			/>
			<Box className={classes.componentSpacer}>
				<VirtualTour />
			</Box>
			<Box>
				<Carousel />
			</Box>
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Exclusive Properties For Rent</h2>
				<Box mt="3rem">
					{<RentProperties cities={data ? data.cities : []} />}
				</Box>
			</Box>
			<Box className={classes.componentSpacer}>
				<Enquiry />
			</Box>
			{/* <Box className={classes.componentSpacer}>
				{data && <CustomerCount counts={data.counts} />}
			</Box> */}
			<Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Latest Properties For Sale</h2>
				<Box mt="3rem">
					<SaleProperties cities={data ? data.cities : []} />
				</Box>
			</Box>
			<Box className={classes.componentSpacer}>
				<EnquiryAgent />
			</Box>
			{/* <Box
				className={clsx(
					classes.componentSpacer,
					classes.componentPadding
				)}
			>
				<h2>Top Builders of India</h2>
				<Box mt="3rem">
					<TopBuilders cities={data ? data.cities : []} />
				</Box>
			</Box> */}
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
