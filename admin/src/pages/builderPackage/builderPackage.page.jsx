import React from 'react';
import useStyles from './builderPackage.style';
import { Box, Typography } from '@material-ui/core';
import AddBuilder from './addBuilderPackage.component';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import Packages from './packages.component';

const BuilderPackage = () => {
	const classes = useStyles();
	let cancelToken = React.useRef();

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});
	const [packages, setPackages] = React.useState([]);
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	const fetchPackages = React.useCallback(async () => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();

			const res = await axios.get(
				apiUrl('/utility/builder-package', 'v2'),
				{
					cancelToken: cancelToken.current.token,
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			console.log(res.data.data.packages);
			setPackages(res.data.data.packages);
		} catch (error) {
			console.log(error);
			setAsyncState({
				error: error.response.data.message,
				loading: false,
			});
		}
	}, []);

	React.useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	return (
		<Box className={classes.pageWrapper}>
			<Typography variant="h6">Add Builder Package</Typography>
			<AddBuilder fetchPackages={fetchPackages} />
			<Box p="1rem">
				<Typography variant="h6">{`All Packages ${
					asyncState.loading ? '(Loading...)' : ''
				}`}</Typography>
			</Box>
			<Packages
				data={packages}
				error={asyncState.error}
				loading={asyncState.loading}
			/>
		</Box>
	);
};

export default BuilderPackage;
