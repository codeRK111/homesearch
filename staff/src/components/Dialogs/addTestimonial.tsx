import { IconButton, Typography } from '@material-ui/core';

import AddTestimonial from '../Forms/addTestimonial';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { SpaceBetween } from '../UI/Flex';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface IAddLeadStrategyDialog {
	open: boolean;
	handleClose: () => void;
	fetchLeads?: () => void;
}

const AddLeadStrategyDialog: React.FC<IAddLeadStrategyDialog> = ({
	open,
	handleClose,
	fetchLeads,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	// On Success
	const onSuccess = () => {
		handleClose();
		if (fetchLeads) {
			fetchLeads();
		}
	};

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				maxWidth={'sm'}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<SpaceBetween>
						<Typography variant="h6">Add Testimonial</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</SpaceBetween>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						* All fields are required
					</DialogContentText>

					<AddTestimonial onSuccess={onSuccess} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddLeadStrategyDialog;
