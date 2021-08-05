import { Paper, Typography } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	paper: {
		padding: '1rem',
		display: 'flex',
		width: 300,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

export default function AddProjectLoader({
	addProjectLoading = false,
	addImageLoading = false,
}) {
	const classes = useStyles();

	return (
		<div>
			<Backdrop
				className={classes.backdrop}
				open={addProjectLoading || addImageLoading}
			>
				<Paper className={classes.paper}>
					<Typography>
						{addProjectLoading
							? 'Uploading Project Information...'
							: 'Uploading project images...'}
					</Typography>
					<CircularProgress color="primary" />
				</Paper>
			</Backdrop>
		</div>
	);
}
