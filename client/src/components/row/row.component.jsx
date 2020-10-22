import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

// Custom Components
import ProjectType from '../projectTypesTab/projectTypesTab.component';

const useStyles = makeStyles((theme) => ({
	seeAll: {
		color: theme.colorTwo,
	},
	image: {
		maxHeight: '100%',
		width: '100%',
		objectFit: 'cover',
		transition: '0.5s all ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.3)',
		},
	},
	priceWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.57)',
		color: '#ffffff',
		padding: '0.4rem',
		fontSize: '12px',
		fontWeight: 600,
	},
	companyWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.77)',
		color: '#ffffff',
		fontWeight: 'bold',
		padding: '0.2rem',
	},
	number: {
		color: theme.colorTwo,
	},
	shortlist: {
		border: `1px solid ${theme.colorTwo}`,
		padding: '0.8rem 2rem',
		color: theme.colorTwo,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorTwo,
			color: '#ffffff',
		},
	},
	details: {
		border: `1px solid ${theme.colorOne}`,
		padding: '0.8rem 2rem',
		cursor: 'pointer',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
	},
	location: {
		color: theme.fontColor,
	},
	locationIcon: {
		color: theme.colorTwo,
		fontSize: '14px',
	},
	avatar: {
		backgroundColor: theme.colorTwo,
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	title: {
		textAlign: 'center',
	},
	callIcon: {
		fontSize: '1rem',
	},
	imageWrapper: {
		overflow: 'hidden',
	},
	wrapper: {
		backgroundColor: theme.fontColorThree,
		padding: '2rem',
	},
}));

const Row = ({ title }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<Box mb="4rem">
				<h2 className={classes.title}>{title}</h2>
			</Box>
			<Box>
				<ProjectType />
			</Box>
			<Box mt="1rem">
				<Grid container spacing={5}>
					{[1, 2, 3, 4].map((_, i) => (
						<Grid item xs={12} md={3} key={i}>
							<Paper
								className={classes.cardWrapper}
								elevation={5}
							>
								<Box
									height="150px"
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
												18
											</span>
										</b>
									</div>
								</Box>
								<Box p="1rem">
									<Box mr="1rem">
										<b>3 BHK Flat / Aspanartment</b> <br />
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
										<b>Rs. 26.55L to 55.8L</b>
										<b className={classes.number}>
											Ready to move
										</b>
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
										<button className={classes.details}>
											Details
										</button>
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
