import { Backdrop, Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { blue } from '@material-ui/core/colors';

const CBackdrop = withStyles({
	root: {
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
})(Backdrop);

const useStyles = makeStyles({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
	wrapper: {
		width: 600,
		height: 400,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const classes = useStyles();

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			BackdropComponent={CBackdrop}
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography>Virtual Tour</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<Box className={classes.wrapper}>
				{
					<iframe
						width="100%"
						height="100%"
						src="https://www.youtube.com/embed/6JYCAyaUIqQ"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						frameBorder="0"
						marginHeight="0"
						marginWidth="0"
					></iframe>
				}
			</Box>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default function VirtualModal({ open, handleClose }) {
	return (
		<div>
			<SimpleDialog open={open} onClose={handleClose} />
		</div>
	);
}

VirtualModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};
