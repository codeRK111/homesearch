import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, handleClose }) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						An otp sent to the admin number
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						autoFocus
						variant="contained"
						size="small"
					>
						Okay
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
