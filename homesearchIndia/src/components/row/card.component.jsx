import { Box, Paper } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

	callIcon: {
		fontSize: '1rem',
	},
	imageWrapper: {
		overflow: 'hidden',
	},
}));

const Card = () => {
	const classes = useStyles();
	return (
		<Paper className={classes.cardWrapper} elevation={5}>
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
						<span className={classes.number}>India</span>
					</b>
				</div>
			</Box>
			<Box p="1rem">
				<Box mr="1rem">
					<b>3 BHK Flat / Aspanartment</b> <br />
					<Box>
						<span className={classes.location}>
							<RoomRoundedIcon className={classes.locationIcon} />{' '}
							Hanspal, Bhubaneswar
						</span>
					</Box>
				</Box>
				<Box mt="1rem" display="flex" justifyContent="space-between">
					<b>Rs. 26.55L to 55.8L</b>
					<b className={classes.number}>Ready to move</b>
				</Box>
				<Box mt="1rem" display="flex" justifyContent="space-between">
					<b>1,2,3 BHK Apartment</b>
					<b>123-345 SF</b>
				</Box>
				<Box mt="1rem" display="flex" justifyContent="space-between">
					<button className={classes.shortlist}>Shortlist</button>
					<button className={classes.details}>Details</button>
				</Box>
			</Box>
		</Paper>
	);
};

export default Card;
