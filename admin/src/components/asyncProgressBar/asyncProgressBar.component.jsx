import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: 10,
		borderRadius: 5,
	},
});

export default function LinearDeterminate({ progress }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<LinearProgress
				className={classes.root}
				variant="determinate"
				value={progress}
			/>
		</div>
	);
}
