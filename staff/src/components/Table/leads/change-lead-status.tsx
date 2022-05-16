import {
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import { asyncManageStatusLead } from '../../../API/lead';

const statuses = [
	'SWITCH OFF',
	'Not IN SERVICE',
	'NOT CONNECTED',
	'BUSY',
	'RESCHEDULE',
	'NOT INTERESTED',
	'INTERESTED',
	'SITE VISIT',
	'MEETING',
	'ZOOM MEETING',
	'INTERESTED FOR PACKAGE',
	'BROKERAGE CONFIRMED',
	'INTERESTED TO BUY',
	'FOLLOWUP',
	'READY TO BUY',
	'BOOKING CONFIRMED',
	'INTERESTED TO SALE',
	'BROKERAGE PAID',
];

interface IChangeLeadStatus {
	id: string;
	onSuccess: (val?: any) => void;
}

const ChangeLeadStatus: React.FC<IChangeLeadStatus> = ({ id, onSuccess }) => {
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);

	useEffect(() => {
		if (status) {
			console.log('first');
			(async () => {
				try {
					setLoading(true);
					const updatedLead = await asyncManageStatusLead(id, status);
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
					<InputLabel htmlFor="age-native-simple">
						Choose Status
					</InputLabel>
					<Select
						native
						value={status}
						onChange={(e) => setStatus(e.target.value as string)}
					>
						<option aria-label="None" value="" />
						{statuses.map((c, i) => (
							<option value={c} key={i}>
								{c}
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

export default ChangeLeadStatus;
