import { IconButton, Typography } from '@material-ui/core';
import {
	Theme,
	WithStyles,
	createStyles,
	useTheme,
	withStyles,
} from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import UpdateLeadPage from '../../pages/updateLead';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IAddLeadDialog {
	open: boolean;
	setOpen: (open: boolean) => void;
	onSuccess?: () => void;
	id: string;
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

export const UpdateLeadDialog: React.FC<IAddLeadDialog> = ({
	open,
	setOpen,
	onSuccess,
	id,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClose = () => {
		setOpen(false);
	};

	const onPostSuccess = () => {
		if (onSuccess) {
			onSuccess();
		}
		handleClose();
	};

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
				scroll="paper"
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Update Lead
				</DialogTitle>
				<DialogContent>
					<UpdateLeadPage id={id} onSuccess={onPostSuccess} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
