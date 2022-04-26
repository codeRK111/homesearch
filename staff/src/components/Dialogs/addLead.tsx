import { IconButton, Typography } from '@material-ui/core';
import {
	Theme,
	WithStyles,
	createStyles,
	useTheme,
	withStyles,
} from '@material-ui/core/styles';

import { AddLeadForm } from '../Forms/addLead';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ILead } from '../../model/lead.interface';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IAddLeadDialog {
	open: boolean;
	setOpen: (open: boolean) => void;
	onSuccess?: (lead: ILead) => void;
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

export const AddLeadDialog: React.FC<IAddLeadDialog> = ({
	open,
	setOpen,
	onSuccess,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClose = () => {
		setOpen(false);
	};

	const onPostSuccess = (lead: ILead) => {
		if (onSuccess) {
			onSuccess(lead);
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
					Add Lead
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You can post any lead related to any thing like builder,
						realtor, owner, tenant
					</DialogContentText>
					<AddLeadForm onSuccess={onPostSuccess} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
