import React from 'react';
import { Paper, Box, Grid, Divider } from '@material-ui/core';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import useStyles from './searchResultCard.styles';

const ResultCard = ({ independent }) => {
	const classes = useStyles();
	return (
		<Paper>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={
							independent
								? require('../../assets/house-cover.jfif')
								: require('../../assets/flat.jpeg')
						}
						alt="property"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box p="1rem">
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box display="flex" alignItems="center">
									<b>
										{independent
											? 'House for sale in Patia'
											: '3 BHK Aspanartment'}
									</b>
									<VerifiedUserIcon
										className={classes.verified}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<span className={classes.location}>
										<RoomRoundedIcon
											className={classes.locationIcon}
										/>{' '}
										Hanspal, Bhubaneswar
									</span>
								</Box>
							</Grid>
						</Grid>

						<p className={classes.description}>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Cum dolor quae, aliquid quo debitis vitae
							laborum nostrum corrupti beatae ea hic ratione optio
							ut impedit a dolorem recusandae error. Aspernatur
							autem non voluptate rem odio magnam culpa,
							laudantium ratione distinctio sapiente sint voluptas
							sunt totam deserunt est nulla debitis earum?
						</p>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<b>Rs. 26.55L </b>
							<Box className={classes.status}>Ready to move</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Total Area</span>

								<b>1000 Sq.ft</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Carpet Area
								</span>

								<b>900 Sq.ft</b>
							</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Toilet Indian
								</span>

								<b>2</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Toilet Western
								</span>

								<b>2</b>
							</Box>
						</Box>

						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Box mt="1rem">
									<span className={classes.info}>
										Amenities
									</span>
									<Box mt="0.5rem">
										<Grid container spacing={1}>
											{Array.from(Array(12).keys()).map(
												(c) => (
													<Grid item key={c}>
														<Box
															className={
																c !== 2
																	? classes.amenitiesWrapper
																	: classes.amenitiesWrapperActive
															}
														>
															Amenity-{c + 1}
														</Box>
													</Grid>
												)
											)}
										</Grid>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box mt="1rem">
									<span className={classes.info}>
										Furnishes
									</span>
									<Box mt="0.5rem">
										<Grid container spacing={1}>
											{Array.from(Array(12).keys()).map(
												(c) => (
													<Grid item key={c}>
														<Box
															className={
																c !== 3
																	? classes.amenitiesWrapper
																	: classes.amenitiesWrapperActive
															}
														>
															Furnish-{c + 1}
														</Box>
													</Grid>
												)
											)}
										</Grid>
									</Box>
								</Box>
							</Grid>
						</Grid>

						<Box mt="1rem">
							<Divider />
						</Box>
						<Box mt="1rem" display="flex" justifyContent="flex-end">
							<button className={classes.shortlist}>
								Shortlist
							</button>
							<button className={classes.details}>Details</button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ResultCard;
