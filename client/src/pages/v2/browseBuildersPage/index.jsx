import { Box, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Card from '../../../components/v2/builderCard/builderCard.component';
import ErrorCard from '../../../components/errorCard/errorCard.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import Pagination from '@material-ui/lab/Pagination';
import SearchComponent from '../../../components/v2/searchCity';
import SimilarPropertiesSkeleton from '../../../components/skeleton/similarProperties.component';
import axios from 'axios';
import { searchBuilder } from '../../../utils/asyncBuilder';
import useStyles from './browseBuilder.style';

const BrowseBuilderPage = () => {
	const style = useStyles();
	const cancelToken = useRef(null);
	const [page, setPage] = React.useState(1);
	const [noResults, setNoResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState({
		totalDocs: 0,
		builders: [],
	});
	const [selectedCity, setSelectedCity] = useState({
		id: null,
		name: null,
	});

	const handleChangePage = (event, value) => {
		setPage(value);
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor'
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	// Fetch builders
	const fetchRequests = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page,
				limit: 10,
				city: selectedCity.id,
			};

			const resp = await searchBuilder(
				filter,
				cancelToken.current,
				setLoading
			);
			if (resp.builders.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
			// setData([]);
		}
	}, [page, selectedCity]);

	/* Fetch join requests */
	useEffect(() => {
		setPage(1);
	}, [selectedCity]);
	useEffect(() => {
		fetchRequests();

		// Cancel request on unmount
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchRequests]);
	return (
		<>
			<Nav />
			<Box className={style.wrapper}>
				<Box mb="2rem">
					<SearchComponent
						selectedCity={selectedCity}
						setSelectedCity={setSelectedCity}
						placeholder="Search By City Name"
					/>
				</Box>
				{loading && <SimilarPropertiesSkeleton />}
				{error && <ErrorCard message={error} />}
				{noResults && (
					<Typography align="center" variant="h6" gutterBottom>
						No results found
					</Typography>
				)}
				{!loading && (
					<Grid container spacing={3} justify="center">
						{data.builders.map((c) => (
							<Grid item xs={12} md={4} key={c.id}>
								<Card data={c} />
							</Grid>
						))}
					</Grid>
				)}
				{data.builders.length > 0 && (
					<Box mt="2rem" display="flex" justifyContent={'center'}>
						<Pagination
							count={Math.ceil(data.totalDocs / 10)}
							color="primary"
							page={page}
							onChange={handleChangePage}
						/>
					</Box>
				)}
			</Box>
		</>
	);
};

export default BrowseBuilderPage;
