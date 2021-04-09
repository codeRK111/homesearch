import { Box, Card, Grid } from '@material-ui/core';

import React from 'react';
import TalkToExpert from '../talkToExpert/talkToExpert.component';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	title: {
		color: theme.fontColor,
	},
	contact: {
		border: `1px solid ${theme.colorOne}`,
		padding: '0.8rem 2rem',
		color: theme.colorOne,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorOne,
			color: '#ffffff',
		},
	},
	image: {
		maxWidth: '100%',
		maxHeight: '400px',
	},
	cardWrapper: {
		width: '30rem',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	bg: {
		backgroundColor: theme.fontColorThree,
	},
}));

const BuilderEnquiery = () => {
	const mobile = useMediaQuery('(max-width:600px)');
	const classes = useStyles();
	return (
		<div className={classes.bg}>
			<Grid container component="main">
				<Grid item xs={false} sm={false} md={7}>
					<Box display="flex" width="100%" justifyContent="center">
						<img
							src={require('../../assets/tr.png')}
							alt=""
							className={classes.image}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={5}>
					<Card className={classes.cardWrapper}>
						<TalkToExpert />
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default BuilderEnquiery;
