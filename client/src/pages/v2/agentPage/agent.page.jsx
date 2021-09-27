import { Avatar, Badge, Box, Chip, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import {
	capitalizeFirstLetter,
	renderProfileImage,
} from '../../../utils/render.utils';

import ErrorBackdrop from '../../../components/v2/backdropMessage';
import { Link } from 'react-router-dom';
import LoaderBackdrop from '../../../components/LoaderBackdrop';
import MailIcon from '@material-ui/icons/Mail';
import Nav from '../../../components/v2/pageNav/nav.component';
import axios from 'axios';
import badgeIcon from '../../../assets/icons/badge.svg';
import clsx from 'clsx';
import { getRealtorDetails } from '../../../utils/asyncUser';
import useGlobalStyles from '../../../common.style';
import useStyles from './agentPage.style';
import { withAsync } from '../../../hoc/withAsync';

const AgentPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { id },
	},
}) => {
	const cancelToken = useRef();
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

	// State
	const [data, setData] = useState(null);

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

	const renderInfo = (type) => {
		if (data[type]) {
			return `${Number(data[type]) / 1000}K`;
		} else {
			return '0';
		}
	};

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
			<ErrorBackdrop open={!!error} message={error} />
			<LoaderBackdrop open={loading} />
			{data && (
				<>
					<div className={classes.wrapper}>
						<Box>
							<span className={globalClasses.smXsText}>
								Realtors / {data.name}
							</span>
						</Box>
					</div>
					<div className={classes.profileWrapper}>
						<div className={classes.overlay}>
							<Box className={classes.heroWrapper}>
								<Grid container spacing={3}>
									<Grid item xs={12} md={2}>
										<Box
											className={
												globalClasses.justifyCenter
											}
										>
											<div
												className={
													classes.avatarWrapper
												}
											>
												<Avatar
													variant="square"
													alt="Remy Sharp"
													src={renderProfileImage(
														data.photo
													)}
													className={classes.avatar}
												/>
												<img
													src={badgeIcon}
													alt="Badge"
													className={
														classes.commentIcon
													}
												/>
											</div>
										</Box>
									</Grid>
									<Grid item xs={12} md={5}>
										<div
											className={clsx(
												globalClasses.alignCenter,
												globalClasses.justifySpaceBetween
											)}
										>
											<div className={classes.ownerType}>
												Realtor
											</div>
											<Link to="/update-profile/basic">
												<Typography>
													Manage Profile
												</Typography>
											</Link>
										</div>
										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
										>
											<h1
												className={
													globalClasses.colorPrimary
												}
											>
												{data.name}
											</h1>
											<Box ml="2rem">
												<Badge
													badgeContent={4}
													color="error"
												>
													<MailIcon />
												</Badge>
											</Box>
										</Box>
										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
										>
											<span
												className={
													globalClasses.colorPrimary
												}
											>
												{data.address}
											</span>
											<Box ml="2rem">
												<span
													className={clsx(
														globalClasses.bold,
														globalClasses.colorPrimary
													)}
												>
													ID : {data.hsID}
												</span>
											</Box>
										</Box>
										<Box mt="1rem">
											{data.cities.map((c) => (
												<Chip
													label={c.name}
													key={c._id}
												/>
											))}
										</Box>
										<Box mt="1rem">{data.description}</Box>
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
														outlined:
															classes.chipBorder,
													}}
												/>
											))}
										</Box>

										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
											mt="1rem"
										>
											<Box
												className={
													classes.numberWrapper
												}
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													{renderInfo('connection')}
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Connection
												</span>
											</Box>
											<Box
												className={
													classes.numberWrapper
												}
												ml="2rem"
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													{renderInfo('network')}
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Network
												</span>
											</Box>
											<Box
												className={
													classes.numberWrapper
												}
												ml="2rem"
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													{renderInfo('deals')}
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Deals
												</span>
											</Box>
										</Box>

										<Grid
											container
											spacing={0}
											justify="center"
											component={Box}
											mt="1rem"
										>
											<Grid item xs={12} md={4}>
												<Grid
													container
													spacing={1}
													className={
														classes.numberHeighLigftWrapper
													}
													justify="center"
												>
													<Grid item md={6}>
														<Box
															className={
																classes.numberHiglight2
															}
															mr="1rem"
														>
															<h1>10</h1>
														</Box>
													</Grid>
													<Grid
														item
														md={6}
														className={
															classes.numberHeighLightText
														}
													>
														<span
															className={clsx(
																globalClasses.smText
															)}
														>
															Customers visited
														</span>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} md={4}>
												<Grid
													container
													spacing={1}
													className={
														classes.numberHeighLigftWrapper
													}
													justify="center"
												>
													<Grid item md={6}>
														<Box
															className={
																classes.numberHiglight2
															}
															mr="1rem"
														>
															<h1>10</h1>
														</Box>
													</Grid>
													<Grid
														item
														md={6}
														className={
															classes.numberHeighLightText
														}
													>
														<span
															className={clsx(
																globalClasses.smText
															)}
														>
															Properties Leashed
															Out
														</span>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} md={4}>
												<Grid
													container
													spacing={1}
													className={
														classes.numberHeighLigftWrapper
													}
													justify="center"
												>
													<Grid item md={6}>
														<Box
															className={
																classes.numberHiglight2
															}
															mr="1rem"
														>
															<h1>10</h1>
														</Box>
													</Grid>
													<Grid
														item
														md={6}
														className={
															classes.numberHeighLightText
														}
													>
														<span
															className={clsx(
																globalClasses.smText
															)}
														>
															Customers Been
															Served
														</span>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>

									<Grid item xs={false} md={1}></Grid>
								</Grid>
							</Box>
						</div>
					</div>
					<Box className={classes.pagePadding}>
						<Box
							className={clsx(
								globalClasses.alignCenter,
								globalClasses.justifySpaceBetween
							)}
						>
							<h2>Properties Posted By {data.name}</h2>
						</Box>
					</Box>
				</>
			)}
		</div>
	);
};

export default withAsync(AgentPage);
