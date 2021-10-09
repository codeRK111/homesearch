import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	Typography,
} from '@material-ui/core';
import { IStaff, StaffType } from '../../model/staff.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import ActionTypeRadio from './actionCategory';
import CloseDealForm from '../../components/Forms/closeDeal';
import { asyncAssignSupport } from '../../API/lead';
import { asyncFetchAdmins } from '../../API/auth';

interface IASMManageLead {
	id: string;
}

export enum ActionType {
	Forward = 'forward',
	Close = 'close',
}

const ASMManageLead = ({ id }: IASMManageLead) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// State
	const [actionType, setActionType] = useState<null | ActionType>(null);
	const [staffLoading, setStaffLoading] = useState(false);
	const [staffs, setStaffs] = useState<IStaff[]>([]);
	const [selectedStaff, setSelectedStaff] = useState('');
	const [assignLoading, setAssignLoading] = useState(false);

	const onAssign = async () => {
		try {
			setAssignLoading(true);
			const staffType = staffs.find((c) => c.id === selectedStaff);
			if (!staffType) return;
			await asyncAssignSupport([id], selectedStaff, staffType.type);
			setAssignLoading(false);

			setSelectedStaff('');

			setSnackbar({
				open: true,
				message: 'Forwarded successfully',
				severity: 'success',
			});
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
		if (actionType === ActionType.Forward) {
			fetchStaffs();
		}
	}, [actionType, fetchStaffs]);

	return (
		<div>
			<ActionTypeRadio value={actionType} setValue={setActionType} />
			<Box mt="1rem">
				{actionType === ActionType.Forward && (
					<Box>
						<Typography
							variant="caption"
							display="block"
							gutterBottom
						>
							Select Staff
						</Typography>
						{staffLoading && (
							<CircularProgress size={20} color="inherit" />
						)}
						{!staffLoading && (
							<Grid container spacing={1}>
								{staffs.map((c) => (
									<Grid item key={c.id}>
										<Chip
											variant={
												selectedStaff === c.id
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
				{actionType === ActionType.Close && (
					<Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<CloseDealForm id={id} />
							</Grid>
						</Grid>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default ASMManageLead;
