import React from 'react';
import AppBar from '../../components/appBar/appBar.component';
import { useStyles } from './project.style';
import axios from 'axios';
import { apiUrl } from '../../utils/render.utils';
import ErrorCard from '../../components/errorCard/errorCard.component';
import BackDrop from '../../components/backdrop/backdrop.component';
import useGlobalStyles from '../../common.style';
// import './project.style.css';
import DetailsTab from './detailsTab.component';
import {
	Grid,
	Box,
	Card,
	Paper,
	CardActions,
	Button,
	Avatar,
	Chip,
} from '@material-ui/core';
import clsx from 'clsx';
import ViewImage from './viewImage.component';
import TalkToOurExpert from '../../components/talkToExpert/talkToExpert.component';
import Footer from '../../components/footer/footer.component';
import ContactDialog from './contactModal.component';
import {
	renderPriceRange,
	renderImage,
	capitalizeFirstLetter,
	parseDate,
	returnValidImage,
} from '../../utils/render.utils';
import BasicDetails from './basicDetails';
import UnitConfig from './unitConfig/unitConfig.component';

const ProjectPage = ({
	match: {
		params: { slug },
	},
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	let cancelToken;
	// const rera = handleRERA(project.legalClearance);

	// States
	const [asyncState, setAsyncState] = React.useState({
		error: null,
		loading: false,
	});
	const [data, setData] = React.useState({
		builder: null,
		projects: [],
	});
	const [open, setOpen] = React.useState(false);
	const [contactDialogopen, setContactDialogOpen] = React.useState(false);

	const [src, setSrc] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleContactDialogClickOpen = () => {
		setContactDialogOpen(true);
	};

	const handleContactDialogClose = () => {
		setContactDialogOpen(false);
	};

	const onView = (src) => () => {
		setSrc(src);
		handleClickOpen();
	};

	React.useEffect(() => {
		(async () => {
			try {
				setAsyncState({
					error: null,
					loading: true,
				});
				cancelToken = axios.CancelToken.source();
				const res = await axios.get(
					apiUrl(`/builders/get-details-by-slug/${slug}`),
					{
						cancelToken: cancelToken.token,
					}
				);
				setData(res.data.data);
				setAsyncState({
					error: null,
					loading: false,
				});
			} catch (error) {
				if (error.response) {
					setAsyncState({
						error: error.response.data.message,
						loading: false,
					});
				} else {
					setAsyncState({
						error:
							'We are having some issues, please try again later',
						loading: false,
					});
				}
			}
		})();

		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, [slug]);
	return (
		<div>
			<AppBar />

			{/* Page Wrapper  */}
			<div className={classes.wrapper}>
				<BackDrop open={asyncState.loading} />

				<ViewImage src={src} open={open} handleClose={handleClose} />
				{!!asyncState.error && <ErrorCard message={asyncState.error} />}
				{!!data.builder && (
					<>
						<Box mb="1rem">
							<div className={classes.detailsContainer}>
								<div>
									<Box display="flex" alignItems="center">
										<Avatar
											alt="Remy Sharp"
											src={renderImage(
												data.builder.logo,
												'builders'
											)}
										/>
										<h1 className={classes.noSpace}>
											{data.builder.developerName}
										</h1>
									</Box>
								</div>
								<div>
									<span className={classes.garyColor}>
										{`${data.builder.officeAddress}`}
									</span>

									<p
										className={clsx(
											classes.garyColor,
											classes.noSpace
										)}
									>
										Operating Since{' '}
										<b>
											{parseDate(
												data.builder.operatingSince
											)}
										</b>{' '}
									</p>
								</div>
							</div>
						</Box>
						<div className={classes.container}>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image1 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image1,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image1,
										'builders'
									)}
								/>
							</div>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image2 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image2,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image2,
										'builders'
									)}
								/>
							</div>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image3 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image3,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image3,
										'builders'
									)}
								/>
							</div>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image4 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image4,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image4,
										'builders'
									)}
								/>
							</div>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image5 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image5,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image5,
										'builders'
									)}
								/>
							</div>
							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.builder.image6 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(
													data.builder.image6,
													'builders'
												)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img
									src={renderImage(
										data.builder.image6,
										'builders'
									)}
								/>
							</div>
						</div>
						<Box mt="2rem">
							<Box mb="1rem">
								<h3 className={classes.noSpace}>
									Basic Details
								</h3>
							</Box>
							<Grid container spacing={3}>
								<Grid item xs={12} md={9}>
									<Card variant="outlined">
										<Box padding={'1rem'}>
											<div
												className={
													classes.gridContainer
												}
											>
												<Box
													display="flex"
													flexDirection="column"
													alignItems="center"
												>
													<p
														className={clsx(
															classes.noSpace,
															classes.garyColor
														)}
													>
														Phone Number
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														{
															data.builder
																.phoneNumber
														}
													</h3>
												</Box>
												<Box
													display="flex"
													flexDirection="column"
													alignItems="center"
												>
													<p
														className={clsx(
															classes.noSpace,
															classes.garyColor
														)}
													>
														Email
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														{data.builder.email}
													</h3>
												</Box>
											</div>
											<Box mt="1rem">
												<span
													className={
														classes.garyColor
													}
												>
													{data.builder.description}
												</span>
											</Box>
										</Box>
									</Card>
									<Box mt="1rem">
										<h3 className={classes.noSpace}>
											Projects
										</h3>
									</Box>
									<Box mt="2rem">
										<Card variant="outlined">
											<Box padding="1rem">
												<Grid container spacing={3}>
													{data.projects.map((c) => (
														<Grid
															item
															xs={12}
															md={4}
															key={c.id}
														>
															<Card variant="outlined">
																<Grid
																	container
																	spacing={1}
																>
																	<Grid
																		item
																		xs={12}
																	>
																		<Box
																			className={
																				classes.unitImageWrapper
																			}
																		>
																			<img
																				src={renderImage(
																					returnValidImage(
																						c
																					)
																				)}
																				alt="Property"
																				className={
																					classes.unitImage
																				}
																			/>
																		</Box>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																	>
																		<Box
																			p="0.5rem"
																			display="flex"
																			alignItems="center"
																			justifyContent="space-between"
																		>
																			<Box
																				display="flex"
																				flexDirection="column"
																			>
																				<h4
																					className={
																						classes.noSpace
																					}
																				>
																					{
																						c.title
																					}
																				</h4>
																				<p
																					className={
																						classes.noSpace
																					}
																				>
																					{
																						c
																							.location
																							.name
																					}

																					,
																					{
																						c
																							.city
																							.name
																					}
																				</p>
																			</Box>
																			<Chip
																				label={capitalizeFirstLetter(
																					c.projectType
																				)}
																			/>
																		</Box>
																	</Grid>
																</Grid>
																<Box
																	mt="1rem"
																	className={
																		globalClasses.flexCenter
																	}
																>
																	<Button
																		size="small"
																		color="primary"
																		fullWidth
																		href={`/#/${c.slug}`}
																	>
																		View
																		Details
																	</Button>
																</Box>
															</Card>
														</Grid>
													))}
												</Grid>
											</Box>
										</Card>
									</Box>
								</Grid>
								<Grid item xs={12} md={3}>
									<Card>
										<Box padding="1rem">
											<h3
												className={clsx(
													globalClasses.flexCenter,
													classes.noSpace
												)}
											>
												Available In
											</h3>
											<Box display="flex">
												{data.builder.cities.map(
													(c) => (
														<Box p="0.3rem">
															<Chip
																label={`${c.name}`}
															/>
														</Box>
													)
												)}
											</Box>
										</Box>
									</Card>
									<Box mt="1rem">
										<Paper>
											<TalkToOurExpert />
										</Paper>
									</Box>
								</Grid>
							</Grid>
						</Box>

						{/* <DetailsTab /> */}

						{/* <Box mt="2rem">
							<Grid container spacing={3}>
								<Grid item xs={12} md={9}>
									<Box mb="1rem">
										<h3 className={classes.noSpace}>
											Basic Details
										</h3>
									</Box>
									<Card variant="outlined">
										<Box padding={'1rem'}>
											<BasicDetails
												project={data.project}
												info={data.projectInfo[0]}
											/>
											<Box mt="1rem">
												<span
													className={
														classes.garyColor
													}
												>
													{data.project.description}
												</span>
											</Box>
										</Box>
									</Card>
									<Box mb="1rem" mt="2rem">
										<h3 className={classes.noSpace}>
											Unit Configuration
										</h3>
									</Box>
									<UnitConfig
										project={data.project}
										properties={data.properties}
									/>
									<Box mb="1rem" mt="2rem">
										<h3 className={classes.noSpace}>
											Other Details
										</h3>
									</Box>
									<Card variant="outlined">
										<Box p="1rem">
											<DetailsTab
												property={data.project}
											/>
										</Box>
									</Card>
								</Grid>
								<Grid item xs={12} md={3}>
									<Card>
										<Box
											width="100%"
											padding="1rem"
											className={globalClasses.flexCenter}
										>
											<Box
												display="flex"
												flexDirection="column"
												alignItems="center"
											>
												<h1 className={classes.noSpace}>
													{capitalizeFirstLetter(
														data.project
															.complitionStatus
													)}
												</h1>
												<Box mt="1rem">
													<button
														className={
															classes.contactButton
														}
													>
														Book a tour guide
													</button>
												</Box>
											</Box>
										</Box>
									</Card>
									<Box mt="1rem">
										<Paper>
											<TalkToOurExpert />
										</Paper>
									</Box>
								</Grid>
							</Grid>
						</Box> */}
						{/* <Box mt="2rem">
							<Grid container spacing={3}>
								<Grid item xs={6} md={9}>
								</Grid>
								<Grid item xs={6} md={3}></Grid>
							</Grid>
						</Box> */}
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ProjectPage;
