import { IconButton, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ILeadStrategy } from '../../model/leadStrategy';
import React from 'react';
import { SpaceBetween } from '../UI/Flex';
import UpdateLeadStrategyForm from '../Forms/updateLeadStrategy';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface IAddLeadStrategyDialog {
	open: boolean;
	handleClose: () => void;
	fetchLeads?: () => void;
	strategy: null | ILeadStrategy;
}

const UpdateLeadStrategyDialog: React.FC<IAddLeadStrategyDialog> = ({
	open,
	handleClose,
	fetchLeads,
	strategy,
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
						<Typography variant="h6">Update Strategy</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</SpaceBetween>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						* All fields are required
					</DialogContentText>

					{strategy && (
						<UpdateLeadStrategyForm
							onSuccess={onSuccess}
							strategy={strategy}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UpdateLeadStrategyDialog;
