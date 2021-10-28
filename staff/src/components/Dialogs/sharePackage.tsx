import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SpaceBetween } from '../UI/Flex';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface ISharePackageLink {
	open: boolean;
	handleClose: () => void;
}

const SharePackageLinkModal: React.FC<ISharePackageLink> = ({
	open,
	handleClose,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { user } = useTypedSelector((state) => state.auth);
	const [text, setText] = useState('');
	const [value, setValue] = React.useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const onShare = () => {
		if (!text || !value) {
			return;
		}
		let url = '';
		switch (value) {
			case 'b':
				url = `https://homesearch18.com/confirm-package/b?hs=${user?.id}`;
				break;
			case 'oc':
				url = `https://homesearch18.com/confirm-package/oc?hs=${user?.id}`;
				break;

			default:
				url = `https://homesearch18.com/tenant-packages?hs=${user?.id}`;
				break;
		}

		alert(url);

		// window.open(
		// 	`https://wa.me/91${text}?text=${encodeURI(
		// 		`Homesearch18 Packages\n${url}`
		// 	)}`,
		// 	'_blank'
		// );
	};

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				maxWidth={'sm'}
				fullWidth
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<SpaceBetween>
						<Typography variant="h6">Share Package Link</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</SpaceBetween>
				</DialogTitle>
				<DialogContent>
					<TextField
						variant="filled"
						fullWidth
						label="Client Number"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<Box mt="1rem">
						<FormControl component="fieldset">
							<FormLabel component="legend">Link Type</FormLabel>
							<RadioGroup
								row
								value={value}
								onChange={handleChange}
							>
								<FormControlLabel
									value="b"
									control={<Radio />}
									label="Bhubaneswar (2999)"
								/>
								<FormControlLabel
									value="oc"
									control={<Radio />}
									label="Other City (999)"
								/>
								<FormControlLabel
									value="home"
									control={<Radio />}
									label="Package Home Page"
								/>
							</RadioGroup>
						</FormControl>
					</Box>
					<Box mt="1rem">
						<Button
							variant="contained"
							fullWidth
							color="primary"
							onClick={onShare}
							startIcon={<WhatsAppIcon />}
						>
							Share Link
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SharePackageLinkModal;
