import { AppBar, Box, CardMedia, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AgentCard from '../../../components/v2/ownerCard/agentCard.component';
import Amenity from '../../../components/v2/amenity/amenity.component';
import BuilderCard from '../../../components/v2/ownerCard/builderCard.component';
import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';
import FlatHeader from '../../../components/v2/searchCard2/project/flatDetails.component';
import LandHeader from '../../../components/v2/searchCard2/project/landDetails.component';
import LegalClearance from '../propertyDetails/legalClearance.component';
import { Link } from 'react-router-dom';
import Nav from '../../../components/v2/pageNav/nav.component';
import Properties from './properties.component';
import SimilarProperties from '../../../components/v2/similarProperties/project.component';
import Skeleton from '../../../components/v2/skeleton/propertyHeader.component';
import TextSkeleton from '@material-ui/lab/Skeleton';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getProjectAgents } from '../../../utils/asyncProject';
import { getProjectProperty } from '../../../utils/async';
import likeIcon from '../../../assets/icons/like.svg';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import threeSixty from '../../../assets/360.png';
import useGlobalStyles from '../../../common.style';
import useStyles from './projectDetailsPage.style';

const locals = [
	'Parking is easy',
	'Walkable distance from market',
	"It's a student area",
	"It's dog friendly",
	"It's a family area",
	"It's a safe area",
];

const initialState = {
	project: null,
	properties: [],
	projectInfo: null,
};

const ProjectDetailsPage = ({
	match: {
		params: { id },
	},
	setSnackbar,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

	// State
	const [data, setData] = useState(initialState);
	const [agents, setAgents] = useState([]);
	// loading State
	const [loading, setLoading] = useState(false);
	// error state
	const [error, setError] = useState(null);

	// Axios cancel token
	let cancelToken = React.useRef();
	let cancelTokenFindAgents = React.useRef(undefined);

	// Cancel API call on unmount
	useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	// Fetch Project Info
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				cancelToken.current = axios.CancelToken.source();

				const res = await axios.get(
					apiUrl(`/projects/get-all-details/${id}`),
					{
						cancelToken: cancelToken.current.token,
					}
				);

				const responseData = res.data;
				setData({
					project: responseData.data.project,
					properties: responseData.data.properties,
					projectInfo: responseData.data.projectInfo[0],
				});
				setLoading(false);
				setError(null);
			} catch (error) {
				setData(initialState);
				setLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setError(message);
			}
		})();
	}, [id]);
	useEffect(() => {
		(async () => {
			try {
				cancelTokenFindAgents.current = axios.CancelToken.source();
				const resp = await getProjectAgents(
					id,
					cancelTokenFindAgents.current,
					setLoading
				);
				setAgents(resp.agents);
			} catch (error) {
				setError(error);
			}
		})();

		return () => {
			if (typeof cancelTokenFindAgents.current !== undefined) {
				cancelTokenFindAgents.current.cancel();
			}
		};
	}, [id]);

	// Throw Error On Screen
	useEffect(() => {
		if (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	}, [error, setSnackbar]);

	const renderHeader = (info) => {
		switch (info.project.projectType) {
			case 'flat':
			case 'independenthouse':
				return (
					<FlatHeader
						project={info.project}
						info={info.projectInfo}
					/>
				);
			case 'land':
				return (
					<LandHeader
						project={info.project}
						info={info.projectInfo}
					/>
				);

			default:
				break;
		}
	};

	React.useEffect(() => {
		if (data.project) {
			cancelToken.current = axios.CancelToken.source();
			getProjectProperty(
				{
					project: data.project.id,
					type: 'type',
				},
				cancelToken.current,
				(t) => {}
			)
				.then((resp) => {
					console.log(resp);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [data.project]);

	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					{loading ? (
						<TextSkeleton width={300} />
					) : (
						data.project && (
							<span>
								Home/ Project/ {data.project.city.name}/{' '}
								{data.project.location.name}
							</span>
						)
					)}
				</Box>
				<Box>
					{loading ? (
						<Skeleton />
					) : (
						data.project && renderHeader(data)
					)}
				</Box>

				<Grid container spacing={3}>
					<Grid item xs={12} md={9}>
						{data.project && data.project.projectType !== 'land' && (
							<>
								<h2 className={globalClasses.colorPrimary}>
									Amenities
								</h2>
								<Grid container spacing={3}>
									{data.project.allAmenities
										.filter((c) =>
											data.project.amenities.includes(
												c.id
											)
										)
										.map((b) => {
											return (
												<Grid
													item
													xs={6}
													md={3}
													key={b.id}
												>
													<Amenity text={b.name} />
												</Grid>
											);
										})}
								</Grid>
							</>
						)}

						{data.project && (
							<>
								<Box mt="2rem">
									<LegalClearance
										property={data.project}
										project
									/>
								</Box>
								<Box mt="3rem">
									<h2 className={globalClasses.colorPrimary}>
										About The Project
									</h2>
								</Box>
								<p>
									<i>{data.project.description}</i>
								</p>

								<Box mt="2rem">
									<h2 className={globalClasses.colorPrimary}>
										Virtual Tour
									</h2>
								</Box>
								<Box>
									<Grid container spacing={5}>
										<Grid item xs={12} md={4}>
											<Typography
												variant="h5"
												gutterBottom
												className={clsx(
													globalClasses.colorUtil,
													globalClasses.bold
												)}
											>
												Enjoy Virtual Tour From The
												Comfort & Safety Of Your Home.
											</Typography>
											<Box>
												<CardMedia
													image={threeSixty}
													className={
														classes.cardMediaMediun
													}
												/>
											</Box>
										</Grid>
										<Grid item xs={12} md={8}>
											<Grid container spacing={3}>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={6} md={4}>
													<Box>
														<CardMedia
															image={threeSixty}
															className={
																classes.cardMedia
															}
														/>
														<Typography align="center">
															VT4464
														</Typography>
													</Box>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
								<Box mt="3rem">
									<h2 className={globalClasses.colorPrimary}>
										{data.project.title} Floor Plan
									</h2>
								</Box>
								<Properties project={data.project} />

								<Box mt="3rem" mb="2rem">
									<h2 className={globalClasses.colorPrimary}>
										What Locals Say About The Area
									</h2>
								</Box>
								<Grid container spacing={3}>
									{locals.map((c, i) => (
										<Grid key={i} item xs={12} md={4}>
											<div
												className={
													globalClasses.alignCenter
												}
											>
												<ChipWrapper>
													<div
														className={clsx(
															globalClasses.alignCenter,
															globalClasses.justifyCenter
														)}
													>
														<img
															src={likeIcon}
															alt="Like"
															className={
																classes.likeIcon
															}
														/>
														<Box ml="0.5rem">
															<h4
																className={clsx(
																	globalClasses.colorPrimary,
																	globalClasses.noSpace,
																	classes.likeValue
																)}
															>
																92%
															</h4>
														</Box>
													</div>
												</ChipWrapper>
												<Box ml="1rem">
													<h4
														className={clsx(
															globalClasses.colorPrimary,
															globalClasses.noSpace
														)}
													>
														{c}
													</h4>
												</Box>
											</div>
										</Grid>
									))}
									<Grid item xs={12} md={4}>
										<div
											className={
												globalClasses.alignCenter
											}
										>
											<ChipWrapper>
												<div
													className={clsx(
														globalClasses.justifyCenter
													)}
												>
													<h4
														className={clsx(
															globalClasses.colorPrimary,
															globalClasses.noSpace
														)}
													>
														See All
													</h4>
												</div>
											</ChipWrapper>
											<Box ml="1rem">
												<Link
													className={clsx(
														globalClasses.colorPrimary,
														globalClasses.bold,
														globalClasses.xsText
													)}
												>
													Take Part In The Survey
												</Link>
											</Box>
										</div>
									</Grid>
								</Grid>
							</>
						)}
					</Grid>
					<Grid item xs={12} md={3}>
						<AppBar
							position="sticky"
							color="transparent"
							elevation={0}
						>
							{data.project && (
								<Box mt="2rem">
									<BuilderCard
										owner={data.project.builder}
										property={data.project}
										type="project"
										pFor="project"
										pType={data.project.projectType}
									/>
								</Box>
							)}
							{data &&
								data.project &&
								agents.map((c) => (
									<Box key={c.id} mt="2rem">
										<AgentCard
											owner={c}
											property={data.project}
											type="project"
											pFor="project"
											pType={data.project.projectType}
										/>
									</Box>
								))}
						</AppBar>
					</Grid>
				</Grid>
				{data.project && (
					<>
						<Box mt="2rem">
							<h2>Similar Projects</h2>
						</Box>
						<SimilarProperties
							pFor={'project'}
							type={data.project.projectType}
							city={data.project.city.id}
							location={data.project.location.id}
							exclude={data.project.id}
						/>
					</>
				)}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(ProjectDetailsPage);
