import '../../../components/v2/searchCard2/extra.css';

import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	apiUrl,
	capitalizeFirstLetter,
	renderBool,
} from '../../../utils/render.utils';

import BuilderCard from '../../../components/v2/ownerCard/builderCard.component';
import FlatHeader from '../../../components/v2/searchCard2/projectProperty/flat.component';
import FloorPlanCard from '../../../components/v2/floorplanCard';
import Furnishes from '../../../components/furnishes/propertyFurnishes.component';
import LandHeader from '../../../components/v2/searchCard2/projectProperty/land.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import Skeleton from '../../../components/v2/skeleton/propertyHeader.component';
import TextSkeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import useStyles from '../projectDetailsPage/projectDetailsPage.style';

const initialState = null;

const ProjectPropertyDetailsPage = ({
	match: {
		params: { id },
	},
	setSnackbar,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

	// State
	const [data, setData] = useState(initialState);
	// loading State
	const [loading, setLoading] = useState(false);
	// error state
	const [error, setError] = useState(null);

	// Axios cancel token
	let cancelToken = React.useRef();

	// Cancel API call on unmount
	useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	// Fetch Project property Info
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				cancelToken.current = axios.CancelToken.source();

				const res = await axios.get(
					apiUrl(`/projects/get-project-property-details/${id}`),
					{
						cancelToken: cancelToken.current.token,
					}
				);

				const responseData = res.data;
				setData(responseData.data.property);
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
		switch (info.type) {
			case 'flat':
			case 'independenthouse':
				return <FlatHeader property={info} />;
			case 'land':
				return <LandHeader property={info} />;
			// case 'land':
			// 	return (
			// 		<LandHeader
			// 			project={info.project}
			// 			info={info.projectInfo}
			// 		/>
			// 	);

			default:
				break;
		}
	};

	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					{loading ? (
						<TextSkeleton width={500} />
					) : (
						data && (
							<span>
								Home/ {data.project.title}/{data.title}
							</span>
						)
					)}
				</Box>
				<Box>{loading ? <Skeleton /> : data && renderHeader(data)}</Box>
				{data && (
					<>
						<Grid container spacing={3}>
							<Grid item xs={12} md={9}>
								{data.type === 'land' && (
									<Box mt="2rem">
										<Grid container spacing={3}>
											<Grid item xs={6} md={3}>
												<Grid container spacing={0}>
													<Grid
														item
														xs={5}
														style={{
															position:
																'relative',
															height: '80px',
														}}
													>
														<Box className="projectValueWrapper">
															<h1>
																{renderBool(
																	data.boundaryWallMade
																)}
															</h1>
														</Box>
													</Grid>
													<Grid
														item
														xs={7}
														className={
															globalClasses.alignCenter
														}
													>
														<span
															className={
																classes.smallText
															}
														>
															Boundry wall made
														</span>
													</Grid>
												</Grid>
											</Grid>

											<Grid item xs={6} md={3}>
												<Grid container spacing={0}>
													<Grid
														item
														xs={5}
														style={{
															position:
																'relative',
															height: '80px',
														}}
													>
														<Box className="projectValueWrapper">
															<h1>
																{renderBool(
																	data.constructionDone
																)}
															</h1>
														</Box>
													</Grid>
													<Grid
														item
														xs={7}
														className={
															globalClasses.alignCenter
														}
													>
														<span
															className={
																classes.smallText
															}
														>
															Construction Done
														</span>
													</Grid>
												</Grid>
											</Grid>

											<Grid item xs={6} md={3}>
												<Grid container spacing={0}>
													<Grid
														item
														xs={5}
														style={{
															position:
																'relative',
															height: '80px',
														}}
													>
														<Box className="projectValueWrapper">
															<h1>
																{renderBool(
																	data.gatedCommunity
																)}
															</h1>
														</Box>
													</Grid>
													<Grid
														item
														xs={7}
														className={
															globalClasses.alignCenter
														}
													>
														<span
															className={
																classes.smallText
															}
														>
															Gated Community
														</span>
													</Grid>
												</Grid>
											</Grid>

											<Grid item xs={6} md={3}>
												<Grid container spacing={0}>
													<Grid
														item
														xs={5}
														style={{
															position:
																'relative',
															height: '80px',
														}}
													>
														<Box className="projectValueWrapper">
															<h1>
																{capitalizeFirstLetter(
																	data.facing
																)}
															</h1>
														</Box>
													</Grid>
													<Grid
														item
														xs={7}
														className={
															globalClasses.alignCenter
														}
													>
														<span
															className={
																classes.smallText
															}
														>
															Facing
														</span>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={6} md={3}>
												<Grid container spacing={0}>
													<Grid
														item
														xs={5}
														style={{
															position:
																'relative',
															height: '80px',
														}}
													>
														<Box className="projectValueWrapper">
															<h1>
																{capitalizeFirstLetter(
																	data.landUsingZoning
																)}
															</h1>
														</Box>
													</Grid>
													<Grid
														item
														xs={7}
														className={
															globalClasses.alignCenter
														}
													>
														<span
															className={
																classes.smallText
															}
														>
															Zoning
														</span>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Box>
								)}
								{data.type !== 'land' && (
									<>
										<h2
											className={
												globalClasses.colorPrimary
											}
										>
											Furnishes
										</h2>
										<Furnishes
											ids={data.furnishes}
											loader={<i>Loading...</i>}
										/>
									</>
								)}

								<Box mt="2rem">
									<h2 className={globalClasses.colorPrimary}>
										Amenities
									</h2>
									<Furnishes
										ids={data.project.amenities}
										type="amenities"
										loader={<i>Loading...</i>}
									/>
								</Box>
								<Box mt="2rem">
									<h2 className={globalClasses.colorPrimary}>
										About {data.title}
									</h2>
									<p>
										<i>{data.description}</i>
									</p>
								</Box>
							</Grid>
							<Grid item xs={12} md={3}>
								{data && (
									<Box mb="2rem" mt="2rem">
										<BuilderCard
											owner={data.project.builder}
											property={data}
										/>
									</Box>
								)}
							</Grid>
						</Grid>
						{data && data.floorPlans.length > 0 && (
							<Box mt="2rem">
								<h2 className={globalClasses.colorPrimary}>
									Floor Plans
								</h2>
								<Grid container spacing={3}>
									{data.floorPlans.map((c) => (
										<Grid item xs={12} md={4} key={c.id}>
											<FloorPlanCard
												property={data}
												floorPlan={c}
											/>
										</Grid>
									))}
								</Grid>
							</Box>
						)}
					</>
				)}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(ProjectPropertyDetailsPage);
