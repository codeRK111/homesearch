import { Box, Grid, Paper, Tooltip } from '@material-ui/core';
import {
	renderFurnishAndAmenities,
	renderLegalClearance,
} from '../../utils/render.utils';

import Amenities from './amenities.component';
import AppBar from '../../components/appBar/appBar.component';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Center } from '../../components/flexContainer/flexContainer.component';
import ContactDialogue from '../../components/contactOwner/contactOwner.component';
import ContactDialogueWithMessage from '../../components/contactOwner/contactOwnerWithMessage.component';
import ErrorCard from '../../components/errorCard/errorCard.component';
import FlagIcon from '@material-ui/icons/Flag';
import Footer from '../../components/footer/footer.component';
import Furnishes from './furnishes.component';
import Header from './headerWrapper.component';
import Highlights from './highlightsWrapper.component';
import HomeIcon from '@material-ui/icons/Home';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LegalClearance from './legalClearance.component';
import NearByPlaces from './nearByPlaces.component';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import PropertyImages from '../../components/propertyImages/propertyImages.component';
import PropertyShare from '../../components/propertyShare/propertyShare.component';
import React from 'react';
import SearchFeedbackForm from '../../components/searchFeedbackForm/searchFeedBackForm.component';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Skeleton from '../../components/propertyDetailsSkeleton/propertyDetailsSkeleton.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { capitalizeFirstLetter } from '../../utils/render.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyDetails } from '../../redux/property/property.actions';
import { parseDate } from '../../utils/render.utils';
import { selectGetPropertyDetailsLoading } from '../../redux/property/property.selectors';
import useStyles from './detailsPage.styles';

// import SimilarProperties from '../../components/similarProperties/resaleApartment.component';











const DetailsPage = ({
	getPropertyDetails,
	propertyDetailsLoading,
	match: { params },
}) => {
	const classes = useStyles();
	const [feedback, setFeedBack] = React.useState({
		status: false,
		positive: true,
	});
	const [propertyActions, setPropertyActions] = React.useState(null);

	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState(null);
	const [asyncError, setAsyncError] = React.useState(null);
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [propertyShareOpen, setPropertyShareOpen] = React.useState(false);
	const handlePropertyActions = (name) => (_) => {
		setPropertyActions(name);
	};
	const closePropertyActions = (name) => {
		setPropertyActions(null);
	};
	const handlPropertyShareOpen = (_) => {
		setPropertyShareOpen(true);
	};

	const handlePropertyShareClose = () => {
		setPropertyShareOpen(false);
	};

	const showSnackbar = (message) => () => {
		setSnackbarMessage(message);
		setOpenSnackBar(true);
	};

	const closeSnackbar = (_, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};
	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = (_) => {
		setOpen(false);
	};
	const handleFetchPropertyDetails = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data);
			setData(data);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (params.id) {
			getPropertyDetails(params.id, handleFetchPropertyDetails);
		}
	}, [params.id, getPropertyDetails]);

	const onFeedback = (status) => (_) =>
		setFeedBack({ status: true, positive: status });
	return (
		<div>
			<AppBar />
			<Snackbar
				status={openSnackBar}
				handleClose={closeSnackbar}
				severity="success"
				message={snackbarMessage}
			/>
			<Box className={classes.contentWrapper}>
				{asyncError && <ErrorCard message={asyncError} />}
				{propertyDetailsLoading ? (
					<Box className={classes.detailsWrapper}>
						<Skeleton />
					</Box>
				) : (
					!asyncError &&
					data && (
						<Box className={classes.pageWrapper}>
							<AppBar />
							<PropertyShare
								status={propertyShareOpen}
								handleClose={handlePropertyShareClose}
								data={data}
							/>
							<ContactDialogueWithMessage
								status={open}
								handleClose={handleClose}
								title={`Contact ${capitalizeFirstLetter(
									data.userId.role
								)}`}
								property={data}
							/>
							<ContactDialogue
								status={propertyActions === 'photo'}
								handleClose={closePropertyActions}
								title="Request photo"
								name="photo"
							/>
							<ContactDialogue
								status={propertyActions === 'abuse'}
								handleClose={closePropertyActions}
								title="Report Abuse"
								name="abuse"
							/>
							<ContactDialogue
								status={propertyActions === 'soldOut'}
								handleClose={closePropertyActions}
								title="Report Sold Out"
								name="soldOut"
							/>

							<Box className={classes.detailsWrapper}>
								<Header property={data} />
								<Box mt="1rem">
									<Paper className={classes.p1}>
										<Grid container spacing={3}>
											<Grid item xs={12} md={4}>
												<PropertyImages
													photos={[
														data.image1,
														data.image2,
														data.image3,
														data.image4,
													]}
												/>
											</Grid>
											<Grid item xs={12} md={8}>
												<Highlights property={data} />
												<Box mt="1rem">
													<Grid container>
														<Grid
															item
															xs={12}
															md={4}
															className={
																classes.p1Details
															}
														>
															<Grid container>
																<Grid
																	item
																	xs={4}
																	md={3}
																>
																	<Tooltip
																		title="Request photo"
																		aria-label="add"
																	>
																		<button
																			className={
																				classes.iconButton
																			}
																			onClick={handlePropertyActions(
																				'photo',
																				true
																			)}
																		>
																			<CameraAltIcon />
																		</button>
																	</Tooltip>
																</Grid>

																<Grid
																	item
																	xs={4}
																	md={3}
																>
																	<Tooltip
																		title="Report Abuse"
																		aria-label="add"
																	>
																		<button
																			className={
																				classes.iconButton
																			}
																			onClick={handlePropertyActions(
																				'abuse',
																				true
																			)}
																		>
																			<FlagIcon />
																		</button>
																	</Tooltip>
																</Grid>
																<Grid
																	item
																	xs={4}
																	md={3}
																>
																	<Tooltip
																		title="Report Sold out"
																		aria-label="add"
																	>
																		<button
																			className={
																				classes.iconButton
																			}
																			onClick={handlePropertyActions(
																				'soldOut',
																				true
																			)}
																		>
																			<HomeIcon />
																		</button>
																	</Tooltip>
																</Grid>
															</Grid>
														</Grid>
														<Grid
															item
															xs={12}
															md={8}
														>
															<Box
																display="flex"
																justifyContent="flex-end"
																className={
																	classes.chatButtonWrapper
																}
															>
																<Box display="flex">
																	<button
																		className={
																			classes.chatButton
																		}
																		onClick={
																			handlPropertyShareOpen
																		}
																	>
																		<Box
																			display="flex"
																			alignItems="center"
																		>
																			<WhatsAppIcon
																				className={
																					classes.whIcon
																				}
																			/>
																			Chat
																			now
																		</Box>
																	</button>

																	<Box ml="1rem">
																		<button
																			className={
																				classes.contactButton
																			}
																			onClick={
																				handleOpen
																			}
																		>
																			<Box
																				display="flex"
																				alignItems="center"
																			>
																				<PersonIcon
																					className={
																						classes.cWhite
																					}
																				/>
																				Contact
																				{` ${capitalizeFirstLetter(
																					data.postedBy
																				)}`}
																			</Box>
																		</button>
																	</Box>
																</Box>
															</Box>
															<Box
																mt="0.5rem"
																display="flex"
																justifyContent="flex-end"
																className={
																	classes.chatButtonWrapper
																}
															>
																Posted on:{' '}
																<b>
																	{parseDate(
																		data.createdAt
																	)}
																</b>
															</Box>
														</Grid>
													</Grid>
												</Box>
											</Grid>
										</Grid>
										<Box mt="2rem">
											<h3>Brief Description</h3>
											{data.description}
										</Box>
										{data.restrictions && (
											<Box mt="2rem">
												<h3>Restrictions</h3>
												{data.restrictions}
											</Box>
										)}
										<Box
											mt="2rem"
											p="1rem"
											className={classes.feedbackWrapper}
										>
											<h3>Search feedback</h3>
											<Box>
												Did you find what you were
												looking for?
											</Box>
											<Box display="flex" mt="1rem">
												<Box>
													<button
														className={
															classes.feedbackButton
														}
														onClick={onFeedback(
															true
														)}
													>
														<Center>
															<InsertEmoticonIcon
																className={
																	classes.emoji
																}
															/>
															Yes
														</Center>
													</button>
												</Box>
												<Box ml="1rem">
													<button
														className={
															classes.feedbackButton
														}
														onClick={onFeedback(
															false
														)}
													>
														<Center>
															<SentimentVeryDissatisfiedIcon
																className={
																	classes.emoji
																}
															/>
															No
														</Center>
													</button>
												</Box>
											</Box>

											{feedback.status && (
												<Box
													mt="1rem"
													className={
														classes.searchWrapper
													}
												>
													<Box mb="1rem">
														{feedback.positive
															? 'Leave us some comments about your search; your comments can help make our site better for everyone'
															: 'Choose a category that best describes the issue that you are having with the search:'}
													</Box>
													<SearchFeedbackForm
														feedback={
															feedback.positive
														}
														onSubmit={showSnackbar(
															'Feedback submitted'
														)}
													/>
												</Box>
											)}
										</Box>
										<Box mt="2rem">
											<Grid container>
												<Grid item xs={12} md={9}>
													<Grid container>
														{renderFurnishAndAmenities(
															data
														) && (
															<Grid
																item
																xs={12}
																md={6}
															>
																<Amenities
																	property={
																		data
																	}
																/>
															</Grid>
														)}
														{renderFurnishAndAmenities(
															data
														) && (
															<Grid
																item
																xs={12}
																md={6}
															>
																<Furnishes
																	property={
																		data
																	}
																/>
															</Grid>
														)}
														{renderLegalClearance(
															data
														) && (
															<Grid
																item
																xs={12}
																md={12}
															>
																<LegalClearance
																	property={
																		data
																	}
																/>
															</Grid>
														)}
													</Grid>
												</Grid>

												<Grid item xs={12} md={3}>
													<NearByPlaces
														property={data}
													/>
												</Grid>
											</Grid>
										</Box>
										{/* <Box mt="1rem">
											<SimilarProperties
												title={
													'2 BHK Apartment for sale'
												}
											/>
										</Box> */}
									</Paper>
								</Box>
							</Box>
							<Footer />
						</Box>
					)
				)}
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyDetailsLoading: selectGetPropertyDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	getPropertyDetails: (id, callback) =>
		dispatch(getPropertyDetails({ id, callback })),
});

DetailsPage.propTypes = {
	propertyDetailsLoading: PropTypes.bool.isRequired,
	getPropertyDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
