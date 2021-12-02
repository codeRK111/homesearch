import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { City } from '../../model/city.interface';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ILead } from '../../model/lead.interface';
import { asyncsendProposal } from '../../API/payment';
import { toHumanReadable } from '../../utils/render';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface SendQueryDialogProps {
	open: boolean;
	toggleOpen: (value: boolean) => void;
	lead: ILead;
}

type PackageType = 'b' | 'oc' | 'custom';

const SendQueryDialog: React.FC<SendQueryDialogProps> = ({
	open,
	toggleOpen,
	lead,
}) => {
	const theme = useTheme();
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [packageName, setPackageName] = useState<PackageType>('b');
	const [proposalPrice, setProposalPrice] = useState(2999);
	const [propertyToBeShown, setPropertyToBeShown] = useState(5);
	const [disabledInput, setDisableInput] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleChangePackage = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setPackageName(event.target.value as PackageType);
	};
	const handleChangePrice = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setProposalPrice(event.target.value as number);
	};
	const handleChangePropertyToBeshown = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setPropertyToBeShown(event.target.value as number);
	};

	const handleClose = () => {
		toggleOpen(false);
	};

	const sendProposal = async () => {
		if (lead) {
			try {
				setLoading(true);
				const res = await asyncsendProposal({
					leadId: lead.id as string,
					propertyToBeShown,
					proposalPackage: packageName,
					proposalPrice: proposalPrice,
				});
				console.log(res);
				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				console.log(error);
				setSnackbar({
					open: true,
					message: error.message,
					severity: 'error',
				});
			}
		}
	};

	useEffect(() => {
		if (packageName === 'oc') {
			setProposalPrice(999);
		}
		if (packageName === 'b') {
			setProposalPrice(2999);
		}
		if (packageName === 'custom') {
			setDisableInput(false);
		}

		switch (packageName) {
			case 'b':
				setProposalPrice(2999);
				setDisableInput(true);
				break;
			case 'oc':
				setProposalPrice(999);
				setDisableInput(true);
				break;
			case 'custom':
				setDisableInput(false);
				break;

			default:
				break;
		}
	}, [packageName]);

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					<Box
						display="flex"
						width="100%"
						justifyContent="space-between"
					>
						{'Send Proposal Query'}
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Package</TableCell>
								<TableCell>
									<FormControl variant="filled" fullWidth>
										<InputLabel id="demo-simple-select-filled-label">
											Select Package
										</InputLabel>
										<Select
											labelId="demo-simple-select-filled-label"
											id="demo-simple-select-filled"
											value={packageName}
											onChange={handleChangePackage}
										>
											<MenuItem value={'b'}>
												Bhubaneswar
											</MenuItem>
											<MenuItem value={'oc'}>
												Other City
											</MenuItem>
											<MenuItem value={'custom'}>
												Custom
											</MenuItem>
										</Select>
									</FormControl>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Package Price</TableCell>
								<TableCell>
									<TextField
										variant="filled"
										fullWidth
										onChange={handleChangePrice}
										value={proposalPrice}
										disabled={disabledInput}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Property to be shown</TableCell>
								<TableCell>
									<TextField
										variant="filled"
										fullWidth
										onChange={handleChangePropertyToBeshown}
										value={propertyToBeShown}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>
									<Typography>{lead.name}</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Email</TableCell>
								<TableCell>
									<Typography>{lead.email}</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Phone</TableCell>
								<TableCell>
									<Typography>{lead.number}</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>City</TableCell>
								<TableCell>
									<Typography>
										{lead.city
											? (lead.city as City).name
											: '-'}
									</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Location</TableCell>
								<TableCell>
									<Typography>
										{lead.preferedLocation}
									</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Requirements</TableCell>
								<TableCell>
									<Typography>
										{lead.propertyRequirements
											? lead.propertyRequirements.map(
													(c, i) => `${c},`
											  )
											: ''}
									</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Price</TableCell>
								<TableCell>
									<Typography>
										{lead.minPrice ? (
											<span>
												{toHumanReadable(
													lead.minPrice as number
												)}{' '}
												to{' '}
											</span>
										) : (
											'-'
										)}
										{lead.maxPrice ? (
											<span>
												{toHumanReadable(
													lead.maxPrice as number
												)}{' '}
											</span>
										) : (
											'-'
										)}
									</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Button
						variant="contained"
						fullWidth
						color="primary"
						size="large"
						onClick={sendProposal}
						endIcon={
							loading ? (
								<CircularProgress size={20} color="inherit" />
							) : (
								<></>
							)
						}
						disabled={loading}
					>
						Send Proposal
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SendQueryDialog;
