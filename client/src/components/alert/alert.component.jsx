import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function TransitionAlerts({
	open,
	message,
	showAction,
	handleClose,
}) {
	const classes = useStyles();

	const alertProps = {};
	if (showAction) {
		alertProps.action = (
			<IconButton
				aria-label="close"
				color="inherit"
				size="small"
				onClick={handleClose}
			>
				<CloseIcon fontSize="inherit" />
			</IconButton>
		);
	}
	return (
		<div className={classes.root}>
			<Collapse in={open}>
				<Alert {...alertProps}>{message}</Alert>
			</Collapse>
		</div>
	);
}

TransitionAlerts.prototypes = {
	open: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	showAction: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};
