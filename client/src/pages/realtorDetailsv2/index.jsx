import { Box, Chip, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	capitalizeFirstLetter,
	renderProfileImage,
} from '../../utils/render.utils';

import Breadcumb from './Breadcumb';
import LoaderBackdrop from '../../components/LoaderBackdrop';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Nav from '../../components/v2/pageNav/nav.component';
import Photo from './Photo';
import Properties from './Properties';
import axios from 'axios';
import { getRealtorDetails } from '../../utils/asyncUser';
import useStyles from './details.style';
import { withAsync } from '../../hoc/withAsync';

const RealtorsPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { id },
	},
}) => {
	const cancelToken = useRef();
	const {
		main,
		bgOverlay,
		mainInfoWrapper,
		ownerType,
		ownerName,
		ownerAddress,
		ownerSpecialist,
		ownerFooterWrapper,
		chipBorder,
		colorYellow,
		numberWrapper,
		animContainer,
	} = useStyles();

	// State
	const [data, setData] = useState(null);

	const renderInfo = (type) => {
		if (data[type]) {
			return `${Number(data[type]) / 1000}K`;
		} else {
			return '0';
		}
	};

	const fetchRealtors = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();

			const resp = await getRealtorDetails(
				id,
				cancelToken.current,
				setLoading
			);
			setError(null);
			setData(resp);
		} catch (error) {
			setData(null);
			setError(error);
		}
	}, [setLoading, setError, id]);

	useEffect(() => {
		fetchRealtors();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchRealtors]);

	return (
		<div>
			<LoaderBackdrop open={loading} />
			<Nav />
			{data && (
				<Box mt="2rem" mb="2rem">
					<Container maxWidth="lg">
						<Breadcumb name={data.name} />
					</Container>
					<Box mt="1rem" className={main}>
						<div className={bgOverlay}></div>
						<Container className={mainInfoWrapper}>
							<Grid container spacing={3}>
								<Grid item xs={12} md={2}>
									<Photo
										photo={renderProfileImage(data.photo)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Typography
										className={ownerType}
										gutterBottom
									>
										Realtor
									</Typography>
									<h2 className={ownerName}>{data.name}</h2>
									<p className={ownerAddress}>
										{data.city && `${data.city.name},`}India
										&nbsp;&nbsp; <b>ID : {data.hsID}</b>{' '}
									</p>
									<Box className={ownerFooterWrapper}>
										<Typography className={ownerSpecialist}>
											Realtor I Property Valuation Expert
											I Market Analyst
										</Typography>
										<Box mt="1rem">
											{data.managedPTypes.map((c, i) => (
												<Chip
													label={capitalizeFirstLetter(
														c
													)}
													size="small"
													key={i}
													variant="outlined"
													classes={{
														outlined: chipBorder,
													}}
												/>
											))}
										</Box>
										<Box display="flex">
											{data.cities.map((c, i) => (
												<Box
													key={c.id}
													mr="0.5rem"
													mt="1rem"
												>
													<Chip
														icon={
															<LocationCityIcon
																className={
																	colorYellow
																}
															/>
														}
														label={capitalizeFirstLetter(
															c.name
														)}
														size="medium"
														variant="outlined"
														classes={{
															outlined:
																chipBorder,
														}}
													/>
												</Box>
											))}
										</Box>
										<Box
											mt="1rem"
											// width="100%"
											display="flex"
										>
											<Box
												className={numberWrapper}
												mr="2rem"
											>
												<h2>
													{renderInfo('connection')}
												</h2>
												<span>Connections</span>
											</Box>
											<Box
												className={numberWrapper}
												mr="2rem"
											>
												<h2>
													{' '}
													{renderInfo('network')}
												</h2>
												<span>Network</span>
											</Box>
											<Box className={numberWrapper}>
												<h2> {renderInfo('deals')}</h2>
												<span>Deals</span>
											</Box>
										</Box>
									</Box>
									<Box mt="2rem">
										<Grid container spacing={3}>
											<Grid item xs={12} md={4}>
												<Box className={animContainer}>
													<div>
														<h3>98</h3>
													</div>
													<Typography variant="caption">
														Customers visited
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} md={4}>
												<Box className={animContainer}>
													<div>
														<h3>98</h3>
													</div>
													<Typography variant="caption">
														Properties Leashed Out
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} md={4}>
												<Box className={animContainer}>
													<div>
														<h3>98</h3>
													</div>
													<Typography variant="caption">
														Customers Been Served
													</Typography>
												</Box>
											</Grid>
										</Grid>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Box mt="1rem">{data.description}</Box>
								</Grid>
							</Grid>
						</Container>
					</Box>
					{data && (
						<Box mt="2rem">
							<Properties id={id} name={data.name} />
						</Box>
					)}
				</Box>
			)}
		</div>
	);
};

export default withAsync(RealtorsPage);
