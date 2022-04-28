import './loading.css';

import { Box, Paper } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import React from 'react';
import { logo } from '../../../utils/statc';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	paper: {
		padding: '1rem',
		background: 'transparent',
		borderRadius: '50%',
	},
	wrapper: {
		height: '100vh',
		width: '100vw',
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
	},
}));

export function LoadingAnimationNormal({ open }) {
	const classes = useStyles();

	return (
		<div>
			<Box className={classes.wrapper}>
				<Paper className={classes.paper} elevation={0}>
					<div id="loading">
						<div id="image-wrapper">Homesearchindia</div>
						<div id="animate"></div>
					</div>
				</Paper>
			</Box>
		</div>
	);
}

export default function LoadingAnimation({ open }) {
	const classes = useStyles();

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Paper className={classes.paper} elevation={0}>
					<div id="loading">
						<div id="image-wrapper">
							<img src={logo} alt="Logo" />
						</div>
						<div id="animate"></div>
					</div>
				</Paper>
			</Backdrop>
		</div>
	);
}
