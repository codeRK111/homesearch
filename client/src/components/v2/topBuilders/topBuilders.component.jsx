import { Box, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Card from '../builderCard/builderCard.component';
import Carousel from '../../carousel';
import Chip from '../chip/chip.component';
import SimilarPropertiesSkeleton from '../../skeleton/similarProperties.component';
import axios from 'axios';
import { searchBuilder } from '../../../utils/asyncBuilder';
import useGlobalStyles from '../../../common.style';
import useStyles from './topBuilders.style';
import { withAsync } from '../../../hoc/withAsync';

const RentProperties = ({ cities, loading, setLoading, error, setError }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();

	const [selected, setSelected] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);
	const [data, setData] = useState({
		totalDocs: 0,
		builders: [],
	});

	// Cancel Token
	const cancelToken = useRef(null);

	//Callbacks

	const onClick = (c) => {
		setSelected(c);
	};

	// Fetch properties
	const fetchRequests = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page: 1,
				limit: 20,
			};

			if (selected) {
				filter.city = selected;
			}

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
	}, [setError, setLoading, selected]);

	/* Fetch join requests */
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
		<div>
			{!!data && (
				<div className={classes.listWrapper}>
					<Grid container spacing={1}>
						{cities.map((c, i) => (
							<Grid item xs={4} md={1}>
								<Chip
									title={c.name}
									key={c._id}
									onClick={() => onClick(c._id)}
									selected={!!selected && c._id === selected}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)}
			<Box mt="3rem">
				{loading ? (
					<SimilarPropertiesSkeleton />
				) : noResults ? (
					<Typography variant="h6" align="center">
						No results found
					</Typography>
				) : (
					<Carousel
						docs={data.builders}
						Card={Card}
						defaultSlide={3}
					/>
				)}
			</Box>
		</div>
	);
};

export default withAsync(RentProperties);
