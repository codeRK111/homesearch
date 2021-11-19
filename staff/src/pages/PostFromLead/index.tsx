import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import GoBack from '../../components/GoBack';
import { IParam } from '../updateLead';
import LoadingBackdrop from '../../components/Backdrop';
import { PropertyLead } from '../../model/propertyLead.interface';
import { RouteComponentProps } from 'react-router';
import { getPropertyLeadDetails } from '../../API/lead';

const PostFromLead: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);

	// State
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<null | PropertyLead>(null);

	const fetchDetails = useCallback(async () => {
		try {
			setLoading(true);
			const lead = await getPropertyLeadDetails(id);
			setData(lead);
			setLoading(false);
		} catch (error: any) {
			setData(null);
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		fetchDetails();
	}, [fetchDetails]);
	return (
		<Container>
			<LoadingBackdrop open={loading} />
			<Box mt="2rem">
				<GoBack />
				<Box mt="1rem">
					<Typography variant="h5" gutterBottom>
						{' '}
						Post from lead
					</Typography>
					<Box>
						<pre>{JSON.stringify(data, null, 4)}</pre>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default PostFromLead;
