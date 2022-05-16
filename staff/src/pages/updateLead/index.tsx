import { Box, FormControlLabel, Switch } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { asyncGetLeadDetails, asyncRescheduleLead } from '../../API/lead';

import DateTimePickerComponent from '../../components/Pickers/dateTime';
import { ILead } from '../../model/lead.interface';
import Loader from '../../components/Loader';
import Typography from '@material-ui/core/Typography';
import UpdateLeadForm from './form';

export interface IParam {
	id: string;
}
interface IUpdateLeadPage extends IParam {
	onSuccess?: (data?: any) => void;
}
const UpdateLeadPage: React.FC<IUpdateLeadPage> = ({ id, onSuccess }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	// State
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState<null | Date>(null);
	const [error, setError] = useState('');
	const [showReschedule, setShowReschedule] = useState(false);
	const [data, setData] = useState<ILead | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowReschedule(event.target.checked);
	};

	const manageDate = (value: Date | null) => {
		setDate(value);
	};

	// Fetch leads
	const fetchLeadDetails = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await asyncGetLeadDetails(id);
			setLoading(false);
			setData(resp);
			setError('');
		} catch (error: any) {
			setLoading(false);
			setData(null);
			setLoading(false);
			setError(error.message);
		}
	}, [id]);

	useEffect(() => {
		fetchLeadDetails();
	}, [fetchLeadDetails]);
	useEffect(() => {
		if (date && data) {
			console.log('first');
			(async () => {
				try {
					setLoading(true);
					const updatedLead = await asyncRescheduleLead(
						data.id as string,
						date
					);
					setLoading(false);
					setSnackbar({
						open: true,
						message: 'Reschedules successfully',
						severity: 'success',
					});
					setShowReschedule(false);
					setDate(null);
					if (onSuccess) {
						onSuccess(updatedLead);
					}
				} catch (error: any) {
					setLoading(false);
					setError(error.message);
				}
			})();
		}
	}, [date, data]);
	return (
		<Box>
			<Loader open={loading} />

			{error && <Typography color="error">{error}</Typography>}
			{data && (
				<>
					<FormControlLabel
						control={
							<Switch
								checked={showReschedule}
								onChange={handleChange}
								name="checkedB"
								color="primary"
							/>
						}
						label="Reschedule"
					/>
					{showReschedule && (
						<Box p="1rem">
							<DateTimePickerComponent
								label="Choose reschedule date and time"
								handleDateChange={manageDate}
								date={date}
							/>
						</Box>
					)}
					<UpdateLeadForm
						initialValues={data}
						id={id}
						onSuccess={onSuccess}
					/>
				</>
			)}
		</Box>
	);
};

export default UpdateLeadPage;
