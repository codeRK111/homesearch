import { IconButton, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ILeadStrategy } from '../../model/leadStrategy';
import React from 'react';
import { SpaceBetween } from '../UI/Flex';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface ISharePackageLink {
	open: boolean;
	handleClose: () => void;
	fetchLeads?: () => void;
	strategy: null | ILeadStrategy;
	number: string;
}

const SharePackageLink: React.FC<ISharePackageLink> = ({
	open,
	handleClose,
	number,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
				<DialogContent></DialogContent>
			</Dialog>
		</div>
	);
};

export default SharePackageLink;
