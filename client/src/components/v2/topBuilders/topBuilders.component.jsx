import { Box, Grid } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useGlobalStyles from '../../../common.style';
import { searchBuilder } from '../../../utils/asyncBuilder';
import Card from '../builderCard/builderCard.component';
import Chip from '../chip/chip.component';
import useStyles from './topBuilders.style';

const RentProperties = ({ cities, loading, setLoading, error, setError }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();

	const [selected, setSelected] = React.useState(null);
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
				{!!data && (
					<div className={classes.propertiesWrapper}>
						{/* <div className={clsx(classes.scrollbar, gClasses.smHide)}>
						<div className={classes.scrollWrapper}>
							<ChevronLeftIcon style={{ fontSize: 40 }} />
						</div>
					</div> */}
						<div className={classes.content}>
							<Grid container spacing={5}>
								{data.builders.map((c) => (
									<Grid item xs={12} md={4} key={c.id}>
										<Card data={c} />
									</Grid>
								))}
							</Grid>
						</div>
						{data.builders.length > 3 && (
							<div
								className={clsx(
									classes.scrollbarRight,
									gClasses.smHide
								)}
							>
								<div className={classes.scrollWrapper}>
									<ChevronRightIcon
										style={{ fontSize: 40 }}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</Box>
		</div>
	);
};

export default RentProperties;
