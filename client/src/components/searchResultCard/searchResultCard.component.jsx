import React from 'react';
import { Paper, Box, Grid } from '@material-ui/core';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

import useStyles from './searchResultCard.styles';

const ResultCard = () => {
	const classes = useStyles();
	return (
		<Paper>
			<Grid container spacing={1}>
				<Grid item xs={4}>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="property"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={8}>
					<Box p="1rem">
						<Box
							mr="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<b>3 BHK Flat / Aspanartment</b> <br />
							<Box>
								<span className={classes.location}>
									<RoomRoundedIcon
										className={classes.locationIcon}
									/>{' '}
									Hanspal, Bhubaneswar
								</span>
							</Box>
						</Box>
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
							<b>Rs. 26.55L to 55.8L</b>
							<b className={classes.number}>Ready to move</b>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<b>1,2,3 BHK Apartment</b>
							<b>123-345 SF</b>
						</Box>
						<Box
							mt="1rem"
							display="flex"
							justifyContent="space-between"
						>
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
