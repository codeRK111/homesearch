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

const ProjectPage = ({
	match: {
		params: { projectId },
	},
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	let cancelToken;

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
	const [src, setSrc] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
						<Box mb="1rem">
							<div className={classes.detailsContainer}>
								<div>
									<h1 className={classes.noSpace}>
										BK Projects
									</h1>
									<span className={classes.garyColor}>
										Jaydev Bihar Bhubaneswar
									</span>

									<p
										className={clsx(
											classes.garyColor,
											classes.noSpace
										)}
									>
										By <b>BK Builders</b>{' '}
									</p>
								</div>

								<div>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
									>
										<h3 className={classes.noSpace}>
											Price 50L - 70L
										</h3>
										<Box mt="1rem">
											<button
												className={
													classes.contactButton
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
									<button
										className={classes.viewButton}
										onClick={onView(
											'https://source.unsplash.com/600x600/?sig=1'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x600/?sig=1" />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									<button
										className={classes.viewButton}
										onClick={onView(
											'https://source.unsplash.com/600x800/?sig=12'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x800/?sig=12" />
							</div>

							<div
								data-lightbox="homePortfolio"
								className={classes.horizontal}
							>
								<div className="absolute">
									<button
										className={classes.viewButton}
										onClick={onView(
											'https://source.unsplash.com/800x600/?sig=71'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/800x600/?sig=71" />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									<button
										className={classes.viewButton}
										onClick={onView(
											'https://source.unsplash.com/600x600/?sig=40'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x600/?sig=40" />
							</div>
						</div>
						{/* <DetailsTab /> */}

						<Box mt="2rem">
							<Grid container spacing={3}>
								<Grid item xs={12} md={9}>
									<h2>About BK Projects</h2>
									<span className={classes.textBlock}>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Sequi, maiores
										temporibus nisi cum corporis, laudantium
										consequatur quas nostrum reiciendis
										aspernatur enim! Placeat pariatur ab eos
										iste animi quod rerum. Nobis libero
										architecto laudantium numquam explicabo
										ipsa saepe nesciunt maxime accusantium
										ratione, voluptatem molestiae autem esse
										nostrum enim maiores accusamus inventore
										quod consequuntur aperiam animi, vero
										voluptates aut laboriosam! Expedita
										pariatur repudiandae voluptatem laborum
										dolore, quod at ratione dolorum quae
										provident fuga? Itaque excepturi nihil
										ducimus earum, nobis maxime! Maiores est
										itaque nemo. Maxime sequi iure fugiat
										cumque quos aut est, amet facilis odit
										optio ea perspiciatis nesciunt,
										similique, a neque?
									</span>
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
													Ongoing
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
								</Grid>
							</Grid>
						</Box>
						<Box mt="2rem">
							<Grid container spacing={3}>
								<Grid item xs={12} md={9}>
									<Box mb="1rem">
										<h3 className={classes.noSpace}>
											Basic Details
										</h3>
									</Box>
									<Card variant="outlined">
										<Box width="100%" padding="1rem">
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
														Total Units
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														500
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
														Area(Sq. FT)
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														1000 - 2000
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
														Price Range
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														40L - 50L
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
														Status
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														Ongoing
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
														Property Type
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														Apartment
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
														Unit Types
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														Apartment
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
														Unit Types
													</p>
													<h3
														className={
															classes.noSpace
														}
													>
														Apartment
													</h3>
												</Box>
											</div>
										</Box>
									</Card>
									<Box mb="1rem" mt="2rem">
										<h3 className={classes.noSpace}>
											Unit Configuration
										</h3>
									</Box>
									<Card variant="outlined">
										<Box padding="1rem">
											<Grid container spacing={3}>
												<Grid item xs={12} md={4}>
													<Card variant="outlined">
														<Grid
															container
															spacing={1}
														>
															<Grid item xs={12}>
																<Box
																	className={
																		classes.unitImageWrapper
																	}
																>
																	<img
																		src="https://source.unsplash.com/600x600/?sig=1"
																		alt="Property"
																		className={
																			classes.unitImage
																		}
																	/>
																</Box>
															</Grid>
															<Grid item xs={12}>
																<div
																	className={
																		classes.gridContainerSmallGap
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
																			Total
																			Units
																		</p>
																		<h3
																			className={
																				classes.noSpace
																			}
																		>
																			500
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
																			Area(Sq.
																			FT)
																		</p>
																		<h3
																			className={
																				classes.noSpace
																			}
																		>
																			1000
																			-
																			2000
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
																			Price
																			Range
																		</p>
																		<h3
																			className={
																				classes.noSpace
																			}
																		>
																			40L
																			-
																			50L
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
																			Status
																		</p>
																		<h3
																			className={
																				classes.noSpace
																			}
																		>
																			Ongoing
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
																			Property
																			Type
																		</p>
																		<h3
																			className={
																				classes.noSpace
																			}
																		>
																			Apartment
																		</h3>
																	</Box>
																</div>
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
															>
																View Details
															</Button>
														</Box>
													</Card>
												</Grid>
											</Grid>
										</Box>
									</Card>
									<Box mb="1rem" mt="2rem">
										<h3 className={classes.noSpace}>
											Other Details
										</h3>
									</Box>
									<Card variant="outlined">
										<Box p="1rem">
											<DetailsTab />
										</Box>
									</Card>
								</Grid>
								<Grid item xs={12} md={3}>
									<Paper>
										<TalkToOurExpert />
									</Paper>
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
