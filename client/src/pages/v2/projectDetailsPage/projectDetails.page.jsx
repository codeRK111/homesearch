import {
	AppBar,
	Avatar,
	Box,
	CardMedia, 
	Grid,
	Typography
} from '@material-ui/core';

import Amenity from '../../../components/v2/amenity/amenity.component';
import Card from '../../../components/v2/nearByCard/nearByCard.component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '../../../components/v2/chip/chip.component';
import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';
import {Link} from 'react-router-dom';
import Nav from '../../../components/v2/pageNav/nav.component';
import PropertyCard from '../../../components/v2/propertyCard/propertyCard.component';
import React from 'react';
import SearchCard from '../../../components/v2/searchCardProject/searchCard.component';
import badgeIcon from '../../../assets/icons/badge.svg';
import bookmarkIcon from '../../../assets/icons/bookmark.svg';
import byBHK from '../../../assets/icons/byBHK.svg';
import byType from '../../../assets/icons/byType.svg';
import byUnit from '../../../assets/icons/byUnit.svg';
import callIcon from '../../../assets/icons/call.svg';
import clsx from 'clsx';
import commentIcon from '../../../assets/icons/comment.svg';
import fPlan from '../../../assets/fPlan.png';
import fingerLikeIcon from '../../../assets/icons/fingerLike.svg';
import likeIcon from '../../../assets/icons/like.svg';
import rocketIcon from '../../../assets/icons/rocket.svg';
import threeSixty from '../../../assets/360.png';
import useGlobalStyles from '../../../common.style';
import useStyles from './projectDetailsPage.style';
import whatsappDefaultIcon from '../../../assets/icons/whatsapp.svg';
import whatsappIcon from '../../../assets/icons/whatsappOutline.svg';

const amenities = [
	'Clubhouse',
	'Jacuzzi',
	'Squash Court',
	'Gym',
	'Lounge',
	'Lap Pool',
	'Tennis Court',
	'Playground'
];
const locals = [
	'Parking is easy',
	'Walkable distance from market',
	"It's a student area",
	"It's dog friendly",
	"It's a family area",
	"It's a safe area"
];
const nearByAreas = [
	'Highlights',
	'Shopping',
	'Groceries',
	'Restaurant',
	'Cafe',
	'Nightlife',
	'TGym',
	'School',
	'College',
	'Petrol Pump'
];

const SearchPage = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div>
			<Nav/>
			<div className={classes.wrapper}>
				<Box mb="1rem">
					<span>Home/ Project/ Bhubaneswar/ Patia</span>
				</Box>
				<SearchCard/>
				<Box mt="2rem">
					<Grid container spacing={3}>
						<Grid item xs={12} md={9}>
							<h2 className={globalClasses.colorPrimary}>
								Amenities
							</h2>
							<Grid container spacing={3}>
								{amenities.map((c, i) => (
									<Grid item xs={6} md={3} key={i}>
										<Amenity text={c}/>
									</Grid>
								))}
							</Grid>
							<Box mt="3rem">
								<h2 className={globalClasses.colorPrimary}>
									About The Property
								</h2>
							</Box>
							<p>
								<i>
									Since the days of its inception Z Estates
									has focused on some essential core values-
									Quality, Excellency and Customer
									Satisfaction. Z Estates have been recognized
									as a top Real Estate Developer in Odisha. We
									have established a culture of creating a
									customer friendly environment and ensure a
									long lasting relationship by practicing the
									highest quality and genuine standards.
								</i>
							</p>
							<Box mt="2rem">
								<Typography
									variant="h5"
									gutterBottom
									className={clsx(
										globalClasses.colorPrimary,
										globalClasses.bold
									)}
								>
									Virtual Tour
								</Typography>
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
											Enjoy Virtual Tour From The Comfort
											& Safety Of Your Home.
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
								<Typography
									variant="h5"
									gutterBottom
									className={clsx(
										globalClasses.colorPrimary,
										globalClasses.bold
									)}
								>
									z1 Vyom Floor Plan
								</Typography>
							</Box>
							<Box mt="2rem" className={classes.floorPlanWrapper}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={5}>
										<Box
											className={
												globalClasses.justifySpaceAround
											}
										>
											<Box
												className={
													classes.planTypeWrapper
												}
											>
												<img src={byType} alt="Unit"/>
												<Typography
													variant="caption"
													className={
														globalClasses.bold
													}
												>
													By Type
												</Typography>
											</Box>
											<Box
												className={
													classes.planTypeWrapper
												}
											>
												<img src={byUnit} alt="Unit"/>
												<Typography
													variant="caption"
													className={
														globalClasses.bold
													}
												>
													By Unit
												</Typography>
											</Box>
											<Box
												className={
													classes.planTypeWrapper
												}
											>
												<img src={byBHK} alt="Unit"/>
												<Typography
													variant="caption"
													className={
														globalClasses.bold
													}
												>
													By BHK
												</Typography>
											</Box>
										</Box>
										<Box mt="2rem">
											<Box
												className={
													classes.floorPlanNameWrapper
												}
											>
												<Box mb="1rem">
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.bold,
															globalClasses.colorPrimary
														)}
													>
														z1A210
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														1435 sqft/ 133 sqm
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														3Bed-3 Bath
													</Typography>
												</Box>
												<Box mb="1rem">
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.bold,
															globalClasses.colorPrimary
														)}
													>
														z1A210
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														1435 sqft/ 133 sqm
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														3Bed-3 Bath
													</Typography>
												</Box>
												<Box mb="1rem">
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.bold,
															globalClasses.colorPrimary
														)}
													>
														z1A210
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														1435 sqft/ 133 sqm
													</Typography>
													<Typography
														variant="caption"
														display="block"
														className={clsx(
															globalClasses.colorUtil
														)}
													>
														3Bed-3 Bath
													</Typography>
												</Box>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={false} md={1}></Grid>
									<Grid item xs={12} md={5}>
										<CardMedia
											image={fPlan}
											className={classes.fPlan}
										/>
									</Grid>
								</Grid>
							</Box>
							<Box mt="3rem">
								<h2 className={clsx(globalClasses.colorPrimary)}>
									Explore Nearby Area
								</h2>
							</Box>
							<Box className={clsx(globalClasses.alignCenter, globalClasses.smWrap)}>
								{nearByAreas.map((c, i) => (
									<Box ml="0.5rem" key={i} className={globalClasses.smTopMargin}>
										<Chip title={c} selected={i === 0}/>
									</Box>
								))}
							</Box>
							<div className={classes.mapWrapper}></div>
							<Box mt="3rem">
								<div className={classes.propertiesWrapper}>
									<div className={clsx(classes.scrollbar,globalClasses.smHide)}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{fontSize: 40}}
											/>
										</div>
									</div>
									<div className={classes.content}>
										<Grid container spacing={3}>
											{Array.from(
												{length: 4},
												(_, idx) => `${++idx}`
											).map((c) => (
												<Grid item xs={12} md={3}>
													<Card key={c}/>
												</Grid>
											))}
										</Grid>
									</div>
									<div className={clsx(classes.scrollbarRight,globalClasses.smHide)}>
										<div className={classes.scrollWrapper}>
											<ChevronRightIcon
												style={{fontSize: 40}}
											/>
										</div>
									</div>
								</div>
							</Box>
							<Box mt="3rem" mb="3rem">
								<h2 className={globalClasses.colorPrimary}>
									Schools & Colleges Near By
								</h2>
							</Box>
							<Grid container spacing={3}>
								{Array.from(
									{length: 6},
									(_, idx) => `${++idx}`
								).map((c) => (
									<Grid item xs={12} md={2}>
										<Card key={c}/>
									</Grid>
								))}
							</Grid>
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
									<div className={globalClasses.alignCenter}>
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
							<div className={classes.divider}></div>
							<div className={classes.utilsWrapper}>
								<div className={globalClasses.alignCenter}>
									<span className={globalClasses.smText}>
										0.1K
									</span>
									<Box ml="0.5rem">
										<img
											src={fingerLikeIcon}
											alt="Like"
											className={classes.utilsIcon}
										/>
									</Box>
								</div>
								<div className={globalClasses.alignCenter}>
									<span className={globalClasses.smText}>
										0.1K
									</span>
									<Box ml="0.5rem">
										<img
											src={rocketIcon}
											alt="Rocket"
											className={classes.utilsIcon}
										/>
									</Box>
								</div>
								<div className={globalClasses.justifyCenter}>
									<img
										src={whatsappIcon}
										alt="WhatsApp"
										className={classes.utilsIcon}
									/>
								</div>
								<div className={globalClasses.justifyCenter}>
									<img
										src={bookmarkIcon}
										alt="BookMark"
										className={classes.utilsIcon}
									/>
								</div>
							</div>
							<Box mt="3rem">
								<input
									type="text"
									className={classes.comment}
									placeholder="Leave A Comment !"
								/>
							</Box>
							<Box mt="3rem">
								<Grid container spacing={1}>
									<Grid item xs={12} md={1} justify="center">
										<div className={classes.avatarWrapper}>
											<Avatar
												alt="Remy Sharp"
												src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
												className={classes.avatar}
											/>
											<div className={classes.commentIcon}>
												<span>&#8220;</span>
											</div>
										</div>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography variant={"caption"}>
											Z1 is a very beautiful and peaceful
											society. The place is really amazing.
											Gardens are well maintained and roads
											are really cleaned all the time. The
											management has always ,maintained the
											decorum.
										</Typography>
									</Grid>
								</Grid>
							</Box>
							<Box mt="1rem">
								<Grid container spacing={1}>
									<Grid item xs={12} md={1}>
										<div className={classes.avatarWrapper}>
											<Avatar
												alt="Remy Sharp"
												src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
												className={classes.avatar}
											/>
											<div className={classes.commentIcon}>
												<span>&#8220;</span>
											</div>
										</div>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography variant={"caption"}>
											Z1 is a very beautiful and peaceful
											society. The place is really amazing.
											Gardens are well maintained and roads
											are really cleaned all the time. The
											management has always ,maintained the
											decorum.
										</Typography>
									</Grid>
								</Grid>

							</Box>
							<Box mt="2rem" mb="2rem">
								<h2>Similar Properties For Rent</h2>
							</Box>
							<Box mt="1rem">
								<div className={classes.propertiesWrapper}>
									{/* <div className={classes.scrollbar}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{ fontSize: 40 }}
											/>
										</div>
									</div> */}
									<div className={classes.content}>
										<Grid container spacing={3}>
											{Array.from(
												{length: 8},
												(_, idx) => `${++idx}`
											).map((c) => (
												<Grid item xs={12} md={3}>
													<PropertyCard key={c}/>
												</Grid>
											))}
										</Grid>
									</div>
									<div className={clsx(classes.scrollbarRight,globalClasses.smHide)}>
										<div className={classes.scrollWrapper}>
											<ChevronRightIcon
												style={{fontSize: 40}}
											/>
										</div>
									</div>
								</div>
							</Box>
							<Box mt="3rem" mb="2rem">
								<h2>Recently Viewed Properties For Rent</h2>
							</Box>
							<Box mt="1rem">
								<div className={classes.propertiesWrapper}>
									{/* <div className={classes.scrollbar}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{ fontSize: 40 }}
											/>
										</div>
									</div> */}
									<div className={classes.content}>
										<Grid container spacing={1}>
											{Array.from(
												{length: 4},
												(_, idx) => `${++idx}`
											).map((c) => (
												<Grid item xs={12} md={3}>
													<PropertyCard key={c}/>
												</Grid>
											))}
										</Grid>
									</div>
									<div className={clsx(classes.scrollbarRight,globalClasses.smHide)}>
										<div className={classes.scrollWrapper}>
											<ChevronRightIcon
												style={{fontSize: 40}}
											/>
										</div>
									</div>
								</div>
							</Box>
						</Grid>
						<Grid item xs={12} md={3}>
							<AppBar
								position="sticky"
								color="transparent"
								elevation={0}
							>
								<div className={classes.rightWrapper}>
									<Grid container spacing={3}>
										<Grid item xs={3}>
											<div
												className={
													classes.avatarWrapper
												}
											>
												<Avatar
													alt="Remy Sharp"
													src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
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
										</Grid>
										<Grid item xs={9}>
											<div
												className={
													globalClasses.justifyCenter
												}
											>
												<div
													className={
														classes.ownerInfo
													}
												>
													<div
														className={
															classes.ownerType
														}
													>
														Property Owner
													</div>
													<h2>PRIYANKARI JENA</h2>
													<Box
														className={clsx(
															globalClasses.justifySpaceBetween,
															globalClasses.alignCenter
														)}
													>
														<span
															className={clsx(
																classes.ownerId,
																globalClasses.xsText,
																globalClasses.bold
															)}
														>
															ID : R04913231c
														</span>
														<Link
															className={clsx(
																globalClasses.colorWarning,
																globalClasses.xsText,
																globalClasses.bold
															)}
														>
															{' '}
															View Listing
														</Link>
													</Box>
													<Box
														p="0.4rem"
														className={clsx(
															globalClasses.alignCenter
														)}
													>
														<Box
															className={
																classes.borderRight
															}
														>
															<img
																src={callIcon}
																alt="Call"
																className={
																	classes.ownerIcon
																}
															/>
														</Box>
														<Box
															className={
																classes.borderRight
															}
														>
															<img
																src={
																	commentIcon
																}
																alt="Comment"
																className={
																	classes.ownerIcon
																}
															/>
														</Box>
														<Box>
															<img
																src={
																	whatsappDefaultIcon
																}
																alt="Whatsapp"
																className={clsx(
																	classes.ownerIcon,
																	classes.iconPadding
																)}
															/>
														</Box>
													</Box>
												</div>
											</div>
										</Grid>
									</Grid>
								</div>
							</AppBar>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
};

export default SearchPage;
