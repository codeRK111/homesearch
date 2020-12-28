import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const CustomizedSnackbars = ({ status, handleClose, message, severity }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Snackbar
				open={status}
				autoHideDuration={2000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

CustomizedSnackbars.propTypes = {
	status: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	severity: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default CustomizedSnackbars;
