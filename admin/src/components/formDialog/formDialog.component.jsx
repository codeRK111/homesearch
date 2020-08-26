import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const FormDialog = ({ button, children, open, handleClose }) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					{button.map((c, i) => (
						<Button
							key={i}
							onClick={c.onClick}
							color={c.color}
							variant={c.variant ? c.variant : 'contained'}
						>
							{c.label}
						</Button>
					))}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default FormDialog;
