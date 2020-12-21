import { Box, Divider, Grid, Paper, Tooltip } from '@material-ui/core';

import Amenities from '../detailsPageNew/amenities.component';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Center } from '../../components/flexContainer/flexContainer.component';
import ContactDialogue from '../../components/contactOwner/contactOwner.component';
import ContactDialogueWithMessage from '../../components/contactOwner/contactOwnerProject.component';
import FlagIcon from '@material-ui/icons/Flag';
import Header from './header/header.component';
import HighLights from './highlightsWrapper.component';
import HomeIcon from '@material-ui/icons/Home';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LegalClearance from '../detailsPageNew/legalClearance.component';
import NearByPlaces from '../detailsPageNew/nearByPlaces.component';
import PersonIcon from '@material-ui/icons/Person';
import PropertyImages from '../../components/propertyImages/propertyImages.component';
import PropertyShare from '../../components/propertyShare/propertyShare.component';
import React from 'react';
import SearchFeedbackForm from '../../components/searchFeedbackForm/searchFeedBackForm.component';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SimilarProjects from '../../components/similarProjects/project.component';
import Unit from './unitWrapper.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { parseDate } from '../../utils/render.utils';
import { renderProjectAmenities } from '../../utils/render.utils';
import useStyles from './propertyDetails.style';

// import SimilarProperties from '../../components/similarProperties/projectApartment.component';

// import Furnishes from '../detailsPageNew/furnishes.component';

const PropertyDetails = ({ project, properties, info }) => {
	const classes = useStyles();
	const [feedback, setFeedBack] = React.useState({
		status: false,
		positive: true,
	});
	const [propertyActions, setPropertyActions] = React.useState(null);
	const [propertyShareOpen, setPropertyShareOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const closePropertyActions = (name) => {
		setPropertyActions(null);
	};

	const handlePropertyActions = (name) => (_) => {
		setPropertyActions(name);
	};

	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = (_) => {
		setOpen(false);
	};
	const handlPropertyShareOpen = (_) => {
		setPropertyShareOpen(true);
	};

	const handlePropertyShareClose = () => {
		setPropertyShareOpen(false);
	};

	const onFeedback = (status) => (_) =>
		setFeedBack({ status: true, positive: status });

	return (
		<Box>
			<PropertyShare
				status={propertyShareOpen}
				handleClose={handlePropertyShareClose}
				data={project}
				project={true}
			/>
			<ContactDialogueWithMessage
				status={open}
				handleClose={handleClose}
				title={'Get offer'}
				property={project}
				type="project"
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
			<Box>
				<Header project={project} />
				<Box mt="1rem">
					<Paper className={classes.p1}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<PropertyImages
									photos={[
										project.image1,
										project.image2,
										project.image3,
										project.image4,
									]}
									dir="projects"
								/>
							</Grid>
							<Grid item xs={12} md={8}>
								<Box
									display="flex"
									width="100%"
									alignItems="center"
									mb="1rem"
									mt="1rem"
								>
									<Box flexGrow={1}>
										<Divider />
									</Box>
									<Box pl="0.3rem" pr="0.3rem">
										<h3 className={classes.title}>
											Project Details
										</h3>
									</Box>
									<Box flexGrow={1}>
										<Divider />
									</Box>
								</Box>

								<HighLights project={project} info={info} />
								<Box mt="1rem">
									<Grid container>
										<Grid
											item
											xs={12}
											md={4}
											className={classes.p1Details}
										>
											<Grid container>
												<Grid item xs={4} md={3}>
													<Tooltip
														title="Request photo"
														aria-label="add"
													>
														<button
															onClick={handlePropertyActions(
																'photo',
																true
															)}
															className={
																classes.iconButton
															}
														>
															<CameraAltIcon />
														</button>
													</Tooltip>
												</Grid>

												<Grid item xs={4} md={3}>
													<Tooltip
														title="Report Abuse"
														aria-label="add"
													>
														<button
															onClick={handlePropertyActions(
																'abuse',
																true
															)}
															className={
																classes.iconButton
															}
														>
															<FlagIcon />
														</button>
													</Tooltip>
												</Grid>
												<Grid item xs={4} md={3}>
													<Tooltip
														title="Report Sold out"
														aria-label="add"
													>
														<button
															onClick={handlePropertyActions(
																'soldOut',
																true
															)}
															className={
																classes.iconButton
															}
														>
															<HomeIcon />
														</button>
													</Tooltip>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12} md={8}>
											<Box
												display="flex"
												justifyContent="flex-end"
												className={
													classes.chatButtonWrapper
												}
											>
												<Box display="flex">
													<button
														onClick={
															handlPropertyShareOpen
														}
														className={
															classes.chatButton
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
															Chat now
														</Box>
													</button>

													<Box ml="1rem">
														<button
															onClick={handleOpen}
															className={
																classes.contactButton
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
																Get offer
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
														project.createdAt
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
							{project.description}
						</Box>
						<Unit project={project} properties={properties} />
						<Box
							mt="2rem"
							p="1rem"
							className={classes.feedbackWrapper}
						>
							<h3>Search feedback</h3>
							<Box>Did you find what you were looking for?</Box>
							<Box display="flex" mt="1rem">
								<Box>
									<button
										className={classes.feedbackButton}
										onClick={onFeedback(true)}
									>
										<Center>
											<InsertEmoticonIcon
												className={classes.emoji}
											/>
											Yes
										</Center>
									</button>
								</Box>
								<Box ml="1rem">
									<button
										className={classes.feedbackButton}
										onClick={onFeedback(false)}
									>
										<Center>
											<SentimentVeryDissatisfiedIcon
												className={classes.emoji}
											/>
											No
										</Center>
									</button>
								</Box>
							</Box>

							{feedback.status && (
								<Box
									mt="1rem"
									className={classes.searchWrapper}
								>
									<Box mb="1rem">
										{feedback.positive
											? 'Leave us some comments about your search; your comments can help make our site better for everyone'
											: 'Choose a category that best describes the issue that you are having with the search:'}
									</Box>
									<SearchFeedbackForm
										feedback={feedback.positive}
										propertyType="project"
										propertyId={project.id}
									/>
								</Box>
							)}
						</Box>
						<Box mt="2rem">
							<Grid container>
								<Grid item xs={12} md={8}>
									<Grid container>
										{renderProjectAmenities(project) && (
											<Grid item xs={12} md={12}>
												<Amenities property={project} />
											</Grid>
										)}
										{/* <Grid item xs={12} md={6}>
											<Furnishes property={project} />
										</Grid> */}
										<Grid item xs={12} md={12}>
											<LegalClearance
												property={project}
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} md={4}>
									<NearByPlaces property={project} />
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<h3>Similar Properties</h3>
							{project && (
								<SimilarProjects
									city={project.city}
									type={project.projectType}
									exclude={project.id}
								/>
							)}
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default PropertyDetails;
