import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

interface ILoader {
	open: boolean;
}

const Loader: React.FC<ILoader> = ({ open }) => {
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
export default Loader;
