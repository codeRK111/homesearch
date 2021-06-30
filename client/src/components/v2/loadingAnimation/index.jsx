import './loading.css';

import Backdrop from '@material-ui/core/Backdrop';
import { Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	paper: {
		padding: '1rem',
	},
}));

export default function LoadingAnimation({ open }) {
	const classes = useStyles();

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Paper className={classes.paper}>
					<div id="loading">
						<p>Loading...</p>
						<div></div>
					</div>
				</Paper>
			</Backdrop>
		</div>
	);
}
