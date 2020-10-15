import React from 'react';
import { Box, Grid, Paper, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';

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
		padding: 0,
		margin: 0,
	},
	callIcon: {
		fontSize: '1rem',
	},
	imageWrapper: {
		overflow: 'hidden',
	},
}));

const Row = ({ title }) => {
	const classes = useStyles();
	return (
		<div>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<h3 className={classes.title}>{title}</h3>
				<Link className={classes.seeAll} to="/">
					See all
				</Link>
			</Box>
			<Box mt="1rem">
				<Grid container spacing={2}>
					{[1, 2, 3, 4].map((_, i) => (
						<Grid item xs={12} md={3} key={i}>
							<Paper className={classes.cardWrapper}>
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
										srcset=""
										className={classes.image}
									/>
									<div className={classes.priceWrapper}>
										<span>72000</span>
										<br />
										<span>1650 sq. ft</span>
									</div>
								</Box>
								<Box
									p="1rem"
									display="flex"
									justifyContent="space-between"
									alignItems="center"
								>
									<Box mr="1rem">
										<span>3 BHK Flat / Aspanartment</span>{' '}
										<br />
										<span className={classes.location}>
											<RoomRoundedIcon
												className={classes.locationIcon}
											/>{' '}
											Hanspal, Bhubaneswar
										</span>
									</Box>
									<Avatar
										className={classes.avatar}
										sizes="small"
									>
										<CallRoundedIcon
											className={classes.callIcon}
										/>
									</Avatar>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
};

export default Row;
