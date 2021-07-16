import { Box, Button, Paper, Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalClasses from '../../../common.style';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	paper: {
		padding: '1rem',
		width: 500,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	successIcon: {
		fontSize: '4rem',
	},
}));

export default function LoadingAnimation({ open, handleClose }) {
	const classes = useStyles();
	const history = useHistory();
	const { justifyCenter, colorUtil } = useGlobalClasses();

	const redirect = (path) => () => {
		history.push(path);
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={open}>
				<Paper className={classes.paper}>
					<Box className={justifyCenter}>
						<CheckCircleOutlineIcon
							className={clsx(colorUtil, classes.successIcon)}
						/>
					</Box>
					<Box mt="1rem">
						<Typography variant="h5" align="center">
							Your property is under screening.It will be lived
							very soon
						</Typography>
					</Box>
					<Box mt="1rem" className={justifyCenter}>
						<Button
							variant="contained"
							startIcon={<HomeIcon />}
							onClick={redirect('/')}
						>
							Home
						</Button>
						<Button
							variant="contained"
							startIcon={<AccountCircleIcon />}
							onClick={redirect('/profile')}
						>
							Profile
						</Button>
					</Box>
				</Paper>
			</Backdrop>
		</div>
	);
}
