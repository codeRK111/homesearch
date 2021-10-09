import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import CloseDealForm from '../Forms/closeDeal';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ManageLeadsTab from '../Tab/manageLead';
import { SpaceBetween } from '../UI/Flex';
import { asyncAssignSupport } from '../../API/lead';
import { asyncFetchAdmins } from '../../API/auth';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IAddLeadStrategyDialog {
	open: boolean;
	handleClose: () => void;
	id?: string;
	fetchLeads: () => void;
}

const ManageLeadDialog: React.FC<IAddLeadStrategyDialog> = ({
	open,
	handleClose,
	id,
	fetchLeads,
}) => {
	const { user } = useTypedSelector((state) => state.auth);
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	// State
	const [action, setAction] = useState(0);
	const [staffLoading, setStaffLoading] = useState(false);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [selectedStaff, setSelectedStaff] = useState('');
	const [assignLoading, setAssignLoading] = useState(false);

	// On Success
	const onSuccess = () => {
		handleClose();
		fetchLeads();
	};

	const onAssign = async () => {
		try {
			setAssignLoading(true);
			const staffType = staffs.find((c) => c.id === selectedStaff);
			if (!staffType || !id) return;
			await asyncAssignSupport([id], selectedStaff, staffType.type);
			setAssignLoading(false);

			setSelectedStaff('');

			setSnackbar({
				open: true,
				message: 'Forwarded successfully',
				severity: 'success',
			});
			onSuccess();
		} catch (error: any) {
			setAssignLoading(false);
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	};

	const fetchStaffs = useCallback(async () => {
		try {
			setStaffLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				types: [StaffType.SalesExecutive],
			});
			setStaffLoading(false);
			setStaffs(resp.admins);
		} catch (error) {
			setStaffLoading(false);
			setStaffs([]);
		}
	}, []);

	useEffect(() => {
		if (action === 0) {
			fetchStaffs();
		}
	}, [action, fetchStaffs]);

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
						<Typography variant="h5">Manaage Lead</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</SpaceBetween>
				</DialogTitle>
				{id &&
					(user?.type === StaffType.SalesExecutive ? (
						<DialogContent>
							<Typography variant="h6" gutterBottom>
								Close Deal
							</Typography>
							<CloseDealForm id={id} onSuccess={onSuccess} />
						</DialogContent>
					) : (
						<DialogContent>
							<Box mb="1rem">
								<ManageLeadsTab
									action={action}
									setAction={setAction}
								/>
							</Box>
							{action === 0 && (
								<Box>
									<Typography
										variant="caption"
										display="block"
										gutterBottom
									>
										Select Staff
									</Typography>
									{staffLoading && (
										<CircularProgress
											size={20}
											color="inherit"
										/>
									)}
									{!staffLoading && (
										<Grid container spacing={1}>
											{staffs.map((c) => (
												<Grid item key={c.id}>
													<Chip
														variant={
															selectedStaff ===
															c.id
																? 'default'
																: 'outlined'
														}
														size="medium"
														label={c.name}
														onClick={() => {
															setSelectedStaff(
																c.id as string
															);
														}}
													/>
												</Grid>
											))}
										</Grid>
									)}
									{selectedStaff && (
										<Box mt="1rem">
											<Button
												variant="contained"
												size="small"
												color="primary"
												onClick={onAssign}
												disabled={assignLoading}
												endIcon={
													assignLoading ? (
														<CircularProgress
															size={20}
															color={'inherit'}
														/>
													) : (
														<></>
													)
												}
											>
												Assign
											</Button>
										</Box>
									)}
								</Box>
							)}
							{action === 1 && (
								<CloseDealForm id={id} onSuccess={onSuccess} />
							)}
						</DialogContent>
					))}
			</Dialog>
		</div>
	);
};

export default ManageLeadDialog;
