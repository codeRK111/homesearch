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
import { Grid, Box, Card, Paper, CardActions, Button } from '@material-ui/core';
import clsx from 'clsx';
import ViewImage from './viewImage.component';
import TalkToOurExpert from '../../components/talkToExpert/talkToExpert.component';
import Footer from '../../components/footer/footer.component';
import ContactDialog from '../../components/query/projectQuery.component';
import {
	renderPriceRange,
	renderImage,
	capitalizeFirstLetter,
	handleRERA,
} from '../../utils/render.utils';
import BasicDetails from './basicDetails';
import UnitConfig from './unitConfig/unitConfig.component';
import { Link } from 'react-router-dom';

const ProjectPage = ({
	match: {
		params: { projectId },
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
		project: null,
		properties: [],
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
					apiUrl(`/projects/get-details-by-slug/${projectId}`),
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
	}, [projectId]);
	return (
		<div>
			<AppBar />

			{/* Page Wrapper  */}
			<div className={classes.wrapper}>
				<BackDrop open={asyncState.loading} />

				<ViewImage src={src} open={open} handleClose={handleClose} />
				{!!asyncState.error && <ErrorCard message={asyncState.error} />}
				{!!data.project && (
					<>
						<ContactDialog
							open={contactDialogopen}
							handleClose={handleContactDialogClose}
							id={data.project.id}
							type="project"
						/>
						<Box mb="1rem">
							<div className={classes.detailsContainer}>
								<div>
									<h1 className={classes.noSpace}>
										{data.project.title}
									</h1>
									<span className={classes.garyColor}>
										{`${data.project.location.name}, ${data.project.city.name}`}
									</span>

									<p
										className={clsx(
											classes.garyColor,
											classes.noSpace
										)}
									>
										By{' '}
										<b>
											<Link
												to={`/builder/${data.project.builder.slug}`}
											>
												{
													data.project.builder
														.developerName
												}
											</Link>
										</b>{' '}
									</p>
								</div>

								<div>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
									>
										{/* {rera['show'] && (
											<Box mt="0.3rem">
												<span>
													{rera['show'] && (
														<Box>
															<span>
																RERA ID:
															</span>{' '}
															<a
																href={
																	rera[
																		'value'
																	]
																}
															>
																{rera['value']}
															</a>
														</Box>
													)}
												</span>
											</Box>
										)} */}
										<h3 className={classes.noSpace}>
											Price{' '}
											{renderPriceRange(
												{
													min:
														data.projectInfo[0]
															.minPrice,
													max:
														data.projectInfo[0]
															.maxPrice,
												},
												100000
											)}
										</h3>
										<Box mt="1rem">
											<button
												className={
													classes.contactButton
												}
												onClick={
													handleContactDialogClickOpen
												}
											>
												Contact Now
											</button>
										</Box>
									</Box>
								</div>
							</div>
						</Box>
						<div className={classes.container}>
							<div
								data-lightbox="homePortfolio"
								className={classes.horizontal}
							>
								<div className="absolute">
									{data.project.image1 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(data.project.image1)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img src={renderImage(data.project.image1)} />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.project.image2 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(data.project.image2)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img src={renderImage(data.project.image2)} />
							</div>

							<div
								data-lightbox="homePortfolio"
								className={classes.horizontal}
							>
								<div className="absolute">
									{data.project.image3 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(data.project.image3)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img src={renderImage(data.project.image3)} />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									{data.project.image4 ? (
										<button
											className={classes.viewButton}
											onClick={onView(
												renderImage(data.project.image4)
											)}
										>
											View Image
										</button>
									) : (
										'No Image'
									)}
								</div>
								<img src={renderImage(data.project.image3)} />
							</div>
						</div>
						{/* <DetailsTab /> */}

						<Box mt="2rem">
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
						</Box>
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
