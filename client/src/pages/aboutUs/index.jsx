import { Box, Container, Typography } from '@material-ui/core';
import { capitalizeFirstLetter, getHostName } from '../../utils/render.utils';

import Nav from '../../components/v2/pageNav/nav.component';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		'& > p': {
			lineHeight: 1.5,
			fontWeight: 500,
			textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
			letterSpacing: 0.5,
		},
	},
}));

const AboutUs = () => {
	const { wrapper } = useStyles();
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem" className={wrapper}>
					<Typography variant="h4" component="h1" gutterBottom>
						About Us
					</Typography>
					<p>
						{capitalizeFirstLetter(getHostName())} is the fastest
						growing India&#39;s most innovative real estate
						advertising platform for homebuyers, landlords,
						developers, and real estate brokers with world extending
						services to all property hunters. The webvsite offers
						listings for new homes, resale homes, rentals, plots and
						residential projects in pan India.But often he misses
						some critical pieces of the puzzle. If you are fed up
						with the countless online options and fake listings,
						your search for the perfect property and a great success
						of real estate investing lies in finding out the best
						property and tenants ends here.
					</p>
				</Box>
			</Container>
		</div>
	);
};

export default AboutUs;
