import { Box, Divider, Grid, Paper, Tooltip } from '@material-ui/core';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Center } from '../../components/flexContainer/flexContainer.component';
import ContactDialogue from '../../components/contactOwner/contactOwner.component';
import ContactDialogueWithMessage from '../../components/contactOwner/contactOwnerProject.component';
import FlagIcon from '@material-ui/icons/Flag';
import FloorPlans from '../../components/floorPlans/floorPlans.component';
import Furnishes from '../detailsPageNew/furnishes.component';
import Header from './header/projectPropertyWrapper.component';
import HighLights from './highlights/projectPropertyHighlightsWrapper.component';
import HomeIcon from '@material-ui/icons/Home';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PersonIcon from '@material-ui/icons/Person';
import PropertyImages from '../../components/propertyImages/propertyImages.component';
import PropertyShare from '../../components/query/whatsappQuery.component';
import React from 'react';
import SearchFeedbackForm from '../../components/searchFeedbackForm/searchFeedBackForm.component';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { parseDate } from '../../utils/render.utils';
import useStyles from './propertyDetails.style';

// import BedroomIcon from '@material-ui/icons/Hotel';

const PropertyDetails = ({ property }) => {
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
		<Box className={classes.pageWrapper}>
			<PropertyShare
				open={propertyShareOpen}
				handleClose={handlePropertyShareClose}
				id={property.id}
				propertyFor={null}
				type={'projectProperty'}
				title={property.title}
				whatsAppNumber={property['project']['builder']['phoneNumber']}
				role={null}
				url={`https://${window.location.hostname}/#/project-property/${property.id}`}
				projectTitle={property['project']['title']}
			/>
			<ContactDialogueWithMessage
				status={open}
				handleClose={handleClose}
				title={'Get offer'}
				property={property}
				type="projectproperty"
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
				<Header property={property} />
				<Box mt="1rem">
					<Paper className={classes.p1}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<PropertyImages
									photos={[
										property.image1,
										property.image2,
										property.image3,
										property.image4,
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
											Property Details
										</h3>
									</Box>
									<Box flexGrow={1}>
										<Divider />
									</Box>
								</Box>
								<HighLights property={property} />

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
														property.createdAt
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
							{property.description}
						</Box>
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
										propertyType="projectproperty"
										propertyId={property.id}
									/>
								</Box>
							)}
						</Box>
						<Box mt="2rem">
							<Grid container>
								<Grid item xs={12}>
									<Grid container>
										<Grid item xs={12} md={12}>
											<Furnishes property={property} />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<FloorPlans property={property} />
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default PropertyDetails;
