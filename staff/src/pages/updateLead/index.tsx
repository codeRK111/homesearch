import React, { useCallback, useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import { ILead } from '../../model/lead.interface';
import Loader from '../../components/Loader';
import { RouteComponentProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import UpdateLeadForm from './form';
import { asyncGetLeadDetails } from '../../API/lead';

export interface IParam {
	id: string;
}
const UpdateLeadPage: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
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
		<Container>
			<Loader open={loading} />

			{error && <Typography color="error">{error}</Typography>}
			{data && <UpdateLeadForm initialValues={data} id={id} />}
		</Container>
	);
};

export default UpdateLeadPage;
