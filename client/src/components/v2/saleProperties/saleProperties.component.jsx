import { Box, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Card from '../salePropertyCard/propertyCard.component';
import Carousel from '../../carousel';
import Chip from '../chip/chip.component';
import SimilarPropertiesSkeleton from '../../skeleton/similarProperties.component';
import axios from 'axios';
import { searchProperty } from '../../../utils/asyncProperty';
import useStyles from './saleProperties.style';
import { withAsync } from '../../../hoc/withAsync';

// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const SaleProperties = ({ cities, loading, setLoading, error, setError }) => {
	const classes = useStyles();
	const [selected, setSelected] = React.useState(null);
	const [data, setData] = useState({
		totalDocs: 0,
		properties: [],
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
				for: 'sale',
				type: ['flat', 'independenthouse'],
			};

			if (selected) {
				filter.city = selected;
			}

			const resp = await searchProperty(
				filter,
				cancelToken.current,
				setLoading
			);
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
			setData([]);
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
				) : (
					<Carousel
						docs={data.properties}
						Card={Card}
						defaultSlide={4}
					/>
				)}
			</Box>
		</div>
	);
};

export default withAsync(SaleProperties);
