import React from 'react';
import { Paper, Box, Grid, Divider } from '@material-ui/core';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import useStyles from './searchResultCardLand.styles';

const ResultCard = () => {
	const classes = useStyles();
	return (
		<Paper>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="property"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box p="1rem">
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box display="flex" alignItems="center">
									<b>Hostel for rent</b>
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
										Patia, Bhubaneswar
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
							<b>Rs.5K </b>
							<Box className={classes.status}>Redy To move</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Available for
								</span>

								<b>Working Men</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Roommates</span>

								<b>3</b>
							</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Fooding</span>

								<b>Non-veg</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Food Schedule
								</span>

								<b>Breakfast,Lunch,Dinner</b>
							</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Furnishing Status
								</span>

								<b>Furnished</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>
									Security Deposit
								</span>

								<b>5K</b>
							</Box>
						</Box>

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
