import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { ILead } from '../../model/lead.interface';
import Loader from '../../components/Loader';
import Typography from '@material-ui/core/Typography';
import UpdateLeadForm from './form';
import { asyncGetLeadDetails } from '../../API/lead';

export interface IParam {
	id: string;
}
interface IUpdateLeadPage extends IParam {
	onSuccess?: () => void;
}
const UpdateLeadPage: React.FC<IUpdateLeadPage> = ({ id, onSuccess }) => {
	// State
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<ILead | null>(null);

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
	return (
		<Box>
			<Loader open={loading} />

			{error && <Typography color="error">{error}</Typography>}
			{data && (
				<UpdateLeadForm
					initialValues={data}
					id={id}
					onSuccess={onSuccess}
				/>
			)}
		</Box>
	);
};

export default UpdateLeadPage;
