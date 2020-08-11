import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({
	open,
	handleClickOpen,
	handleClose,
	onSubmit,
}) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Are you sure ?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This item will delete permanently
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="secondary"
						variant="contained"
					>
						No
					</Button>
					<Button
						onClick={onSubmit}
						color="primary"
						autoFocus
						variant="contained"
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
