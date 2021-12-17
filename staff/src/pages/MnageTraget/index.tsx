import {
	Box,
	Container,
	FormControl,
	InputLabel,
	Select,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { FetchAdminResponse } from '../../model/staff.interface';
import Loader from '../../components/Loader';
import { asyncFetchAdmins } from '../../API/auth';

const ManageTraget = () => {
	const [fetchLoading, setFetchLoading] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState('');
	const [adminsData, setAdminsData] = useState<FetchAdminResponse>({
		admins: [],
		totalDocs: 0,
	});

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedAdmin(event.target.value as string);
	};
	const fetchAdmins = useCallback(async () => {
		try {
			setFetchLoading(true);
			const resp = await asyncFetchAdmins({
				status: 'active',
				page: 1,
				limit: 100,
			});
			setFetchLoading(false);
			setAdminsData(resp);
		} catch (error) {
			setFetchLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAdmins();
	}, [fetchAdmins]);
	return (
		<Container>
			<Loader open={fetchLoading} />
			<Box mt="2rem">
				<Typography variant="h5" gutterBottom>
					Manage Target
				</Typography>
				<Box>
					<FormControl variant="filled" fullWidth>
						<InputLabel htmlFor="filled-age-native-simple">
							Select A Staff
						</InputLabel>
						<Select
							native
							value={selectedAdmin}
							onChange={handleChange}
						>
							{adminsData.admins.map((c) => (
								<option value={c.id}>{c.name}</option>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
		</Container>
	);
};

export default ManageTraget;
