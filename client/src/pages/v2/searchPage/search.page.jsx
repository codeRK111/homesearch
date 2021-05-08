import { Box, Grid } from '@material-ui/core';

import Filter from './filter.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import SearchCard from '../../../components/v2/searchCard/searchCard.component';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './searchPage.style';

const SearchPage = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					<Filter />
				</Box>
				<Grid container>
					<Grid items xs={12} md={8}>
						<Box
							p="1rem"
							className={clsx(
								globalClasses.justifySpaceBetween,
								globalClasses.alignCenter
							)}
						>
							<span>Home/ Project/ Bhubaneswar/ Patia</span>
							<h3
								className={clsx(
									globalClasses.colorPrimary,
									globalClasses.noSpace
								)}
							>
								Projects Near Patia Area In Bhubaneswar
							</h3>
						</Box>
						{Array.from({ length: 3 }, (_, idx) => `${++idx}`).map(
							(c) => (
								<Box mt="1rem" key={c}>
									<SearchCard />
								</Box>
							)
						)}
					</Grid>
					<Grid items xs={12} md={4}></Grid>
				</Grid>
			</div>
		</div>
	);
};

export default SearchPage;
