import React, { useState } from 'react';

import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';
import QueryForm from './form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	exampleWrapper: {
		position: 'fixed',
		zIndex: 1000,
		marginTop: theme.spacing(3),
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},

	secondary: {
		background: theme.utilColor,
		'&:hover': {
			background: theme.yellowColor,
		},
	},
}));

export default function SpeedDials() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const toggleOpen = (status) => () => {
		setOpen(status);
	};

	return (
		<React.Fragment>
			<QueryForm open={open} handleClose={toggleOpen(false)} />
			<Fab
				color="secondary"
				aria-label="scroll back to top"
				className={classes.exampleWrapper}
				classes={{
					secondary: classes.secondary,
				}}
				onClick={toggleOpen(true)}
			>
				<ChatIcon />
			</Fab>
		</React.Fragment>
	);
}
