import { IconButton, Typography } from '@material-ui/core';
import {
	Theme,
	WithStyles,
	createStyles,
	useTheme,
	withStyles,
} from '@material-ui/core/styles';

import { AddGSTForm } from '../Forms/addGST';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IAddGSTDialog {
	open: boolean;
	setOpen: (open: boolean) => void;
	onSuccess?: (lead: any) => void;
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
		closeButton: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

export const AddGSTDialog: React.FC<IAddGSTDialog> = ({
	open,
	setOpen,
	onSuccess,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				scroll="paper"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Add GST
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You can post different types of GST numbers here
					</DialogContentText>
					<AddGSTForm onSuccess={onSuccess} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
