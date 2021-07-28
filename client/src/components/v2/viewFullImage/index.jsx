import {
	Backdrop,
	Box,
	DialogTitle,
	IconButton,
	Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import useStyles from './viewFullImage.style';
import { withStyles } from '@material-ui/styles';

// import Divider from '@material-ui/core/Divider';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		background: theme.utilColor,
		boxShadow: '0px 0px 2px 1px #c1c1c1',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CDialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="body1">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
});

const CBackdrop = withStyles({
	root: {
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
})(Backdrop);

export default function FullScreenDialog({ title, open, handleClose, image }) {
	const classes = useStyles({ img: image });

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				BackdropComponent={CBackdrop}
				fullWidth
				maxWidth="lg"
				classes={{
					paper: classes.radius,
				}}
			>
				<CDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					Homesearch18
				</CDialogTitle>
				<Box className={classes.imageWrapper}>
					<img
						src={image}
						alt="PropertyImage"
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'contain',
						}}
					/>
				</Box>
			</Dialog>
		</div>
	);
}
