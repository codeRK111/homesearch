import { Box, Grid } from '@material-ui/core';

import Amenity from '../../../components/v2/amenity/amenity.component';
import Chip from '../../../components/v2/chip/chip.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import SearchCard from '../../../components/v2/searchCard/searchCard.component';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyDetailsPage.style';

const amenities = [
	'Clubhouse',
	'Jacuzzi',
	'Squash Court',
	'Gym',
	'Lounge',
	'Lap Pool',
	'Tennis Court',
	'Playground',
];
const nearByAreas = [
	'Highlights',
	'Shopping',
	'Groceries',
	'Restaurant',
	'Cafe',
	'Nightlife',
	'TGym',
	'School',
	'College',
	'Petrol Pump',
];

const SearchPage = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					<span>Home/ Project/ Bhubaneswar/ Patia</span>
				</Box>
				<SearchCard />
				<Box mt="2rem">
					<Grid container spacing={3}>
						<Grid item xs={12} md={9}>
							<h2 className={globalClasses.colorPrimary}>
								Amenities
							</h2>
							<Grid container spacing={3}>
								{amenities.map((c, i) => (
									<Grid item xs={6} md={3} key={i}>
										<Amenity text={c} />
									</Grid>
								))}
							</Grid>
							<Box mt="3rem">
								<h2 className={globalClasses.colorPrimary}>
									About The Property
								</h2>
							</Box>
							<p>
								<i>
									Since the days of its inception Z Estates
									has focused on some essential core values-
									Quality, Excellency and Customer
									Satisfaction. Z Estates have been recognized
									as a top Real Estate Developer in Odisha. We
									have established a culture of creating a
									customer friendly environment and ensure a
									long lasting relationship by practicing the
									highest quality and genuine standards.
								</i>
							</p>
							<Box mt="3rem">
								<h2 className={globalClasses.colorPrimary}>
									Explore Nearby Area
								</h2>
								<Box className={globalClasses.alignCenter}>
									{nearByAreas.map((c, i) => (
										<Box ml="0.5rem" key={i}>
											<Chip
												title={c}
												selected={i === 0}
											/>
										</Box>
									))}
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} md={3}></Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
};

export default SearchPage;
