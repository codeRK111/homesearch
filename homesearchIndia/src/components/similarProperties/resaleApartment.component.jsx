import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import useStyles from './similarProperty.styles';

// Custom Components

const Row = ({ title }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<Box>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<h3>Similar Properties</h3>
				</Box>
				<Grid container spacing={5}>
					{[1, 2, 3, 4].map((_, i) => (
						<Grid item xs={12} md={3} key={i}>
							<Paper
								className={classes.cardWrapper}
								elevation={5}
							>
								<Box
									height="100px"
									position="relative"
									className={classes.imageWrapper}
								>
									<img
										src={require(`../../assets/${
											i % 2 === 0 ? 'flat' : 'home'
										}.jpeg`)}
										alt=""
										className={classes.image}
									/>

									<div className={classes.companyWrapper}>
										<b>
											Homesearch
											<span className={classes.number}>
												India
											</span>
										</b>
									</div>
								</Box>
								<Box p="1rem">
									<Box mr="1rem">
										<b>{title}</b> <br />
										<Box>
											<span className={classes.location}>
												<RoomRoundedIcon
													className={
														classes.locationIcon
													}
												/>{' '}
												Hanspal, Bhubaneswar
											</span>
										</Box>
									</Box>
									<Box
										mt="1rem"
										display="flex"
										justifyContent="space-between"
									>
										<b>Rs. 10L</b>
										<b className={classes.number}>
											NEW BOOKING
										</b>
									</Box>
									<Box
										mt="1rem"
										display="flex"
										justifyContent="space-between"
									>
										<Box>
											<span>Bedrooms: </span>
											<b>2</b>
										</Box>
										<Box>
											<span>Status: </span>
											<b>Redy to move</b>
										</Box>
									</Box>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
			<Box mt="2rem" display="flex" justifyContent="center">
				<button className={classes.shortlist}>View all &#8594;</button>
			</Box>
		</div>
	);
};

export default Row;
