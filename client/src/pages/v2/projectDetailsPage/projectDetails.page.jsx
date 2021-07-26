import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Amenity from '../../../components/v2/amenity/amenity.component';
import BuilderCard from '../../../components/v2/ownerCard/builderCard.component';
import FlatHeader from '../../../components/v2/searchCard2/project/flatDetails.component';
import FlatUnit from '../../../components/v2/searchCard2/project/unitConfig/flat.unit';
import LandHeader from '../../../components/v2/searchCard2/project/landDetails.component';
import LandUnit from '../../../components/v2/searchCard2/project/unitConfig/land.unit';
import LegalClearance from '../propertyDetails/legalClearance.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import SimilarProperties from '../../../components/v2/similarProperties/project.component';
import Skeleton from '../../../components/v2/skeleton/propertyHeader.component';
import TextSkeleton from '@material-ui/lab/Skeleton';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import useStyles from './projectDetailsPage.style';

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
	const renderUnits = (info) => {
		switch (info.project.projectType) {
			case 'flat':
			case 'independenthouse':
				return <FlatUnit properties={info.properties} />;
			case 'land':
				return <LandUnit properties={info.properties} />;

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
										Unit Configuration
									</h2>
								</Box>
								{renderUnits(data)}
							</>
						)}
					</Grid>
					<Grid item xs={12} md={3}>
						{data.project && (
							<Box mb="2rem" mt="2rem">
								<BuilderCard
									owner={data.project.builder}
									property={data.project}
								/>
							</Box>
						)}
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
