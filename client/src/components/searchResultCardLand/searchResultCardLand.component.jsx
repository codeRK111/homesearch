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
						src={require('../../assets/land-cover.jfif')}
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
										145 Sq.Yd. Plot in Patia, Bhubaneswar, ₹
										10.44 Lac
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
							<b>Rs.10.44L </b>
							<Box className={classes.status}>
								Construction Done
							</Box>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Length</span>

								<b>1000 ft</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Width</span>

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
									Plot frontage
								</span>

								<b>1000 ft</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Plot Area</span>

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
									Width of road
								</span>

								<b>10 ft</b>
							</Box>
							<Box className={classes.infoWrapper}>
								<span className={classes.info}>Facing</span>

								<b>East</b>
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
