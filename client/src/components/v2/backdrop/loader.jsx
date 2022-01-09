import { createStyles, makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	})
);

const BackdropLoader = ({ open, text = 'Loading ...' }) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={open}>
			<Paper elevation={5}>
				<Box
					display="flex"
					height={100}
					width={400}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Typography>{text}</Typography>
					<CircularProgress color="inherit" size={15} />
				</Box>
			</Paper>
		</Backdrop>
	);
};

export default BackdropLoader;
