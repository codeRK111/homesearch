import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';

import ErrorBackdrop from '../../components/v2/backdropMessage';
import Nav from '../../components/v2/pageNav/nav.component';
import RealtorCard from './card';
import RealtorLoader from './loader';
import SearchComponent from '../../components/v2/searchCity';
import axios from 'axios';
import { getRealtors } from '../../utils/asyncUser';
import { withAsync } from '../../hoc/withAsync';

const arr = Array.from({ length: 12 }, (_, i) => i++);

const RealtorsPage = ({ loading, setLoading, error, setError }) => {
	const cancelToken = useRef();

	// State
	const [data, setData] = useState({
		totalDocs: 0,
		realtors: [],
	});
	const [selectedCity, setSelectedCity] = useState({
		id: null,
		name: null,
	});

	const fetchRealtors = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page: 1,
				limit: 12,
			};
			if (selectedCity.id) {
				filter.city = selectedCity.id;
			}
			const resp = await getRealtors(
				filter,
				cancelToken.current,
				setLoading
			);
			setError(null);
			setData(resp);
		} catch (error) {
			setData(null);
			setError(error);
		}
	}, [setLoading, setError, selectedCity]);

	React.useEffect(() => {
		fetchRealtors();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchRealtors]);

	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				<Container>
					<ErrorBackdrop open={!!error} message={error} />
					<Typography variant="h5">Find Realtors</Typography>
					<SearchComponent
						selectedCity={selectedCity}
						setSelectedCity={setSelectedCity}
						placeholder="Search By City Name"
					/>
					{loading && (
						<Box mt="1rem">
							<RealtorLoader />
						</Box>
					)}
					<Box mt="1rem">
						<Grid container spacing={5}>
							{data.realtors.map((c, i) => (
								<Grid item xs={12} md={6} key={i}>
									<RealtorCard realtor={c} />
								</Grid>
							))}
						</Grid>
					</Box>
				</Container>
			</Box>
		</div>
	);
};

export default withAsync(RealtorsPage);
