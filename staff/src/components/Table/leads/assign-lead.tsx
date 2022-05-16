import {
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import { IStaff } from '../../../model/staff.interface';
import { asyncManageAssignLead } from '../../../API/lead';

interface IAssignStaff {
	id: string;
	onSuccess: (val?: any) => void;
	staffs: IStaff[];
}

const AssignStaff: React.FC<IAssignStaff> = ({ id, onSuccess, staffs }) => {
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);

	useEffect(() => {
		if (status) {
			console.log('first');
			(async () => {
				try {
					setLoading(true);
					const updatedLead = await asyncManageAssignLead(id, status);
					setLoading(false);
					setSnackbar({
						open: true,
						message: 'status added successfully',
						severity: 'success',
					});

					if (onSuccess) {
						onSuccess(updatedLead);
					}
				} catch (error: any) {
					setLoading(false);
					setSnackbar({
						open: true,
						message: error.message,
						severity: 'error',
					});
				}
			})();
		}
	}, [status]);

	return (
		<div>
			{!loading ? (
				<FormControl>
					<InputLabel htmlFor="age-native-simple">Assign</InputLabel>
					<Select
						native
						value={status}
						onChange={(e) => setStatus(e.target.value as string)}
					>
						<option value={''} />
						{staffs.map((c, i) => (
							<option value={c.id} key={i}>
								{c.name}
							</option>
						))}
					</Select>
				</FormControl>
			) : (
				<CircularProgress color="inherit" size={15} />
			)}
		</div>
	);
};

export default AssignStaff;
