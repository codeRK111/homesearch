import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import BackdropLoader from '../../../components/v2/backdrop/loader';
import Nav from '../../../components/v2/pageNav/nav.component';
import { asyncGetMyPackages } from '../../../utils/asyncPackage';

const MySubscriptions = () => {
	const [packageState, setPackageState] = useState({
		loading: false,
		data: [],
		error: '',
	});

	const fetchPackages = useCallback(async () => {
		try {
			setPackageState((prevState) => ({
				...prevState,
				error: '',
				loading: true,
			}));
			const resp = await asyncGetMyPackages();
			setPackageState((prevState) => ({
				...prevState,
				data: resp,
				loading: false,
			}));
		} catch (error) {
			setPackageState((prevState) => ({
				...prevState,
				loading: false,
				error: error.message,
			}));
		}
	}, []);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	const { loading, data, error } = packageState;

	return (
		<>
			<BackdropLoader open={loading} />
			<Nav />
			<Container>
				<Box p="1rem">
					<Typography variant="h5" gutterBottom>
						My Packages
					</Typography>
					<Typography gutterBottom color="error">
						{error}
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default MySubscriptions;
