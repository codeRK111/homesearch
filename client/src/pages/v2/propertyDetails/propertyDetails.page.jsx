import { AppBar, Avatar, Box, Grid, Typography } from '@material-ui/core';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import Amenity from '../../../components/v2/amenity/amenity.component';
import Card from '../../../components/v2/nearByCard/nearByCard.component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '../../../components/v2/chip/chip.component';
import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';
import ErrorMessage from '../../../components/v2/backdropMessage';
import { Link } from 'react-router-dom';
import Loading from '../../../components/v2/loadingAnimation';
import Map from '../../../components/v2/map/map.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import PropertyCard from '../../../components/v2/propertyCard/propertyCard.component';
import React from 'react';
import SearchCard from '../../../components/v2/searchCard/searchCard.component';
import axios from 'axios';
import badgeIcon from '../../../assets/icons/badge.svg';
import bookmarkIcon from '../../../assets/icons/bookmark.svg';
import callIcon from '../../../assets/icons/call.svg';
import { capitalizeFirstLetter } from '../../../utils/render.utils';
import clsx from 'clsx';
import commentIcon from '../../../assets/icons/comment.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import fingerLikeIcon from '../../../assets/icons/fingerLike.svg';
import likeIcon from '../../../assets/icons/like.svg';
import rocketIcon from '../../../assets/icons/rocket.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyDetailsPage.style';
import whatsappDefaultIcon from '../../../assets/icons/whatsapp.svg';
import whatsappIcon from '../../../assets/icons/whatsappOutline.svg';

const locals = [
	'Parking is easy',
	'Walkable distance from market',
	"It's a student area",
	"It's dog friendly",
	"It's a family area",
	"It's a safe area",
];

const SearchPage = ({
	match: {
		params: { id },
	},
	isAuthenticated,
	toggleLoginPopup,
	user,
	setSnackbar,
}) => {
	const [review, setReview] = React.useState('');
	const [reviews, setReviews] = React.useState([]);
	const [postReview, setPostReview] = React.useState(false);
	let cancelToken = React.useRef();
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

	const [asyncState, setAsyncState] = React.useState({
		property: null,
		loading: false,
		error: null,
	});
	const [postReviewLoading, setPostReviewLoading] = React.useState(false);

	const handleChange = (e) => {
		setReview(e.target.value);
	};

	const addReview = async () => {
		if (asyncState.property && review) {
			try {
				setPostReviewLoading(true);
				cancelToken.current = axios.CancelToken.source();
				const token = localStorage.getItem('JWT_CLIENT');
				await axios.post(
					'/api/v1/reviews/add-review',
					{
						property: asyncState.property.id,
						propertyType: 'property',
						message: review,
						user: user.id,
					},
					{
						cancelToken: cancelToken.current.token,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setPostReviewLoading(false);
				setSnackbar({
					open: true,
					message: 'Comment Posted Successfully',
					severity: 'success',
				});
				setReview('');
			} catch (error) {
				setPostReviewLoading(false);
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setSnackbar({
					open: true,
					message,
					severity: 'error',
				});
			}
		}
	};

	const handleKeypress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			if (!isAuthenticated) {
				setPostReview(true);
				toggleLoginPopup(true);
			} else {
				addReview();
			}
		}
	};

	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	React.useEffect(() => {
		(async () => {
			try {
				setAsyncState({
					property: null,
					loading: true,
					error: null,
				});
				cancelToken.current = axios.CancelToken.source();
				const {
					data: {
						data: { property },
					},
				} = await axios.get(`/api/v1/properties/${id}`, {
					cancelToken: cancelToken.current.token,
				});
				console.log(property);
				setAsyncState({
					property,
					loading: false,
					error: null,
				});
			} catch (error) {
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setAsyncState({
					property: null,
					loading: false,
					error: message,
				});
			}
		})();
	}, []);
	React.useEffect(() => {
		if (asyncState.property) {
			(async () => {
				try {
					cancelToken.current = axios.CancelToken.source();
					const {
						data: {
							data: { reviews },
						},
					} = await axios.get(
						`/api/v1/reviews/get-reviews/${asyncState.property.id}`,
						{
							cancelToken: cancelToken.current.token,
						}
					);
					console.log(reviews);
					setReviews(reviews);
				} catch (error) {
					let message = '';
					if (!!error.response) {
						message = error.response.data.message;
					} else {
						message = error.message;
					}
					setAsyncState({
						property: null,
						loading: false,
						error: message,
					});
				}
			})();
		}
	}, [asyncState.property]);
	React.useEffect(() => {
		if (isAuthenticated && !!review && postReview) {
			alert('review posted successfully');
		}
	}, [isAuthenticated]);
	return (
		<div>
			<ErrorMessage
				open={!!asyncState.error}
				message={asyncState.error}
			/>
			<Loading open={!!asyncState.loading || postReviewLoading} />
			<Nav />
			{asyncState.property && (
				<div className={classes.wrapper}>
					<Box mb="1rem">
						<span>{`Home/ Property/ ${capitalizeFirstLetter(
							asyncState.property.city.name
						)}/ ${capitalizeFirstLetter(
							asyncState.property.location.name
						)}`}</span>
					</Box>
					<SearchCard />
					<Box mt="2rem">
						<Grid container spacing={3}>
							<Grid item xs={12} md={9}>
								<h2 className={globalClasses.colorPrimary}>
									Amenities
								</h2>
								<Grid container spacing={3}>
									{asyncState.property.allAmenities
										.filter((c) =>
											asyncState.property.amenities.includes(
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
								<Box mt="3rem">
									<h2 className={globalClasses.colorPrimary}>
										About The Property
									</h2>
								</Box>
								<p>
									<i>{asyncState.property.description}</i>
								</p>

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
									<div
										className={globalClasses.justifyCenter}
									>
										<img
											src={whatsappIcon}
											alt="WhatsApp"
											className={classes.utilsIcon}
										/>
									</div>
									<div
										className={globalClasses.justifyCenter}
									>
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
										value={review}
										onChange={handleChange}
										onKeyDown={handleKeypress}
									/>
								</Box>
								<Box mt="3rem">
									{reviews.map((c) => (
										<Box key={c.id} mt="1rem">
											<Grid container spacing={1}>
												<Grid
													item
													xs={12}
													md={1}
													justify="center"
												>
													<div
														className={
															classes.avatarWrapper
														}
													>
														<Avatar
															alt="Remy Sharp"
															src={
																c.photo
																	? `/profile/${c.photo}`
																	: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100'
															}
															className={
																classes.avatar
															}
														/>
														<div
															className={
																classes.commentIcon
															}
														>
															<span>&#8220;</span>
														</div>
													</div>
												</Grid>
												<Grid item xs={12} md={6}>
													<Typography
														variant={'caption'}
													>
														{c.message}
													</Typography>
												</Grid>
											</Grid>
										</Box>
									))}
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
											<Grid container spacing={1}>
												{Array.from(
													{ length: 8 },
													(_, idx) => `${++idx}`
												).map((c) => (
													<Grid item xs={12} md={3}>
														<PropertyCard key={c} />
													</Grid>
												))}
											</Grid>
										</div>
										<div
											className={clsx(
												classes.scrollbarRight,
												globalClasses.smHide
											)}
										>
											<div
												className={
													classes.scrollWrapper
												}
											>
												<ChevronRightIcon
													style={{ fontSize: 40 }}
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
													{ length: 4 },
													(_, idx) => `${++idx}`
												).map((c) => (
													<Grid item xs={12} md={3}>
														<PropertyCard key={c} />
													</Grid>
												))}
											</Grid>
										</div>
										<div
											className={clsx(
												classes.scrollbarRight,
												globalClasses.smHide
											)}
										>
											<div
												className={
													classes.scrollWrapper
												}
											>
												<ChevronRightIcon
													style={{ fontSize: 40 }}
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
														className={
															classes.avatar
														}
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
																	src={
																		callIcon
																	}
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
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
