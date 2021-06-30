import { Box, Paper } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import ErrorIcon from '@material-ui/icons/Error';
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
	red: {
		color: 'red',
	},
	messageWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
}));

export default function SimpleBackdrop({ open, message }) {
	const classes = useStyles();

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Paper className={classes.paper}>
					<div className={classes.messageWrapper}>
						<Box mr="1rem">
							<ErrorIcon className={classes.red} />
						</Box>
						<span className={classes.red}>{message}</span>
					</div>
				</Paper>
			</Backdrop>
		</div>
	);
}
