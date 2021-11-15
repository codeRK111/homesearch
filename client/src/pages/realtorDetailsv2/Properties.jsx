import { Container, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Scroll from './scroller';
import ScrollSale from './scrollerSale';
import Skeleton from '@material-ui/lab/Skeleton';
import { asyncGetPropertyOfAUser } from '../../utils/asyncProperty';
import axios from 'axios';
import { withAsync } from '../../hoc/withAsync';

const Loader = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={3}>
				<Skeleton variant="rect" width={'100%'} height={200} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Skeleton variant="rect" width={'100%'} height={200} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Skeleton variant="rect" width={'100%'} height={200} />
			</Grid>
			<Grid item xs={12} md={3}>
				<Skeleton variant="rect" width={'100%'} height={200} />
			</Grid>
		</Grid>
	);
};

const Properties = ({ loading, setLoading, error, setError, id, name }) => {
	const cancelToken = useRef();

	// State
	const [rentData, setRentData] = useState([]);
	const [saleData, setSaleData] = useState([]);

	const fetchProperties = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();

			const resp = await asyncGetPropertyOfAUser(
				id,
				cancelToken.current,
				setLoading
			);
			setError(null);
			setRentData(resp.filter((c) => c['for'] === 'rent'));
			setSaleData(resp.filter((c) => c['for'] === 'sale'));
		} catch (error) {
			setRentData([]);
			setSaleData([]);
			setError(error);
		}
	}, [setLoading, setError, id]);

	useEffect(() => {
		fetchProperties();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchProperties]);
	return (
		<Container>
			{loading && <Loader />}
			{rentData.length > 0 && (
				<>
					<h2>Properties Posted By {name} For Rent</h2>
					<Scroll properties={rentData} />
				</>
			)}
			{saleData.length > 0 && (
				<>
					<h2>Properties Posted By {name} For Sale</h2>
					<ScrollSale properties={saleData} />
				</>
			)}
		</Container>
	);
};

export default withAsync(Properties);
