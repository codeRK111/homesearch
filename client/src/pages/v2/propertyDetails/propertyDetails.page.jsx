import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import { LinkedinIcon, WhatsappIcon } from '../../../components/v2/createIcon';
import {
	capitalizeFirstLetter,
	renderByPropertyFor,
	renderByPropertyType,
} from '../../../utils/render.utils';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useStyles, { LightTooltip } from './propertyDetailsPage.style';

import Amenity from '../../../components/v2/amenity/amenity.component';
import ErrorMessage from '../../../components/v2/backdropMessage';
import FacebookIcon from '@material-ui/icons/Facebook';
import FlatRentHeader from '../../../components/v2/searchCard2/rent/flatDetails.component';
import FlatSaleHeader from '../../../components/v2/searchCard2/sale/flatDetails.component';
import HostelRentHeader from '../../../components/v2/searchCard2/rent/hostelDetails.component';
import LandSaleHeader from '../../../components/v2/searchCard2/sale/landDetails.component';
import LegalClearance from './legalClearance.component';
import Loading from '../../../components/v2/loadingAnimation';
import Nav from '../../../components/v2/pageNav/nav.component';
import OwnerCard from '../../../components/v2/ownerCard';
import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import SimilarProperties from '../../../components/v2/similarProperties';
import TwitterIcon from '@material-ui/icons/Twitter';
import axios from 'axios';
import bookmarkIcon from '../../../assets/icons/bookmark.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import fingerLikeIcon from '../../../assets/icons/fingerLike.svg';
import useGlobalStyles from '../../../common.style';
import whatsappIcon from '../../../assets/icons/whatsappOutline.svg';

// import ChipWrapper from '../../../components/v2/chipWrapper/chipWrapper.component';

// import { Link } from 'react-router-dom';

// import clsx from 'clsx';

// import likeIcon from '../../../assets/icons/like.svg';
// import rocketIcon from '../../../assets/icons/rocket.svg';

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

	const [postReviewLoading, setPostReviewLoading] = React.useState(false);
	let cancelToken = React.useRef();
	const [asyncState, setAsyncState] = React.useState({
		property: null,
		loading: false,
		error: null,
	});
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

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

	//Render Header

	const renderTypeRent = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <FlatRentHeader property={property} />;
			case 'hostel':
			case 'pg':
				return <HostelRentHeader property={property} />;

			default:
				break;
		}
	};
	const renderTypeSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
			case 'independenthouse':
				return <FlatSaleHeader property={property} />;
			case 'land':
				return <LandSaleHeader property={property} />;

			default:
				break;
		}
	};
	const renderFor = (property) => {
		switch (property.for) {
			case 'rent':
				return renderTypeRent(property);
			case 'sale':
				return renderTypeSale(property);

			default:
				break;
		}
	};

	return (
		<div>
			<ErrorMessage
				open={!!asyncState.error}
				message={asyncState.error}
			/>
			<Loading open={!!asyncState.loading || postReviewLoading} />
			<Nav />
			{/* <pre>{JSON.stringify(asyncState.property, null, 2)}</pre> */}
			{asyncState.property && (
				<div className={classes.wrapper}>
					<Box mb="1rem">
						<span>{`Home/ Property/ ${capitalizeFirstLetter(
							asyncState.property.city.name
						)}/ ${capitalizeFirstLetter(
							asyncState.property.location.name
						)}`}</span>
					</Box>
					{/* <SearchCard /> */}
					{renderFor(asyncState.property)}
					<Box mt="2rem">
						<Grid container spacing={3}>
							<Grid item xs={12} md={9}>
								{asyncState.property.sale_type !== 'land' && (
									<>
										<h2
											className={
												globalClasses.colorPrimary
											}
										>
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
															<Amenity
																text={b.name}
															/>
														</Grid>
													);
												})}
										</Grid>
									</>
								)}

								{asyncState.property.sale_type !== 'land' && (
									<Box mt="1rem">
										<h2
											className={
												globalClasses.colorPrimary
											}
										>
											Furnishes
										</h2>
										{asyncState.property.furnished ===
											'furnished' ||
										asyncState.property.furnished ===
											'semifurnished' ? (
											<>
												<Grid container spacing={3}>
													{asyncState.property.furnishes.map(
														(b) => {
															return (
																<Grid
																	item
																	xs={6}
																	md={3}
																	key={b.id}
																>
																	<Amenity
																		text={
																			b.name
																		}
																	/>
																</Grid>
															);
														}
													)}
												</Grid>
											</>
										) : (
											<p>Unfurnished</p>
										)}
									</Box>
								)}

								{renderByPropertyFor(
									asyncState.property,
									'rent',
									<>
										<Box mt="3rem">
											<h2
												className={
													globalClasses.colorPrimary
												}
											>
												Available For
											</h2>
											<Grid container spacing={3}>
												{asyncState.property.availableFor.map(
													(b, i) => {
														return (
															<Grid
																item
																xs={6}
																md={3}
																key={i}
															>
																<Amenity
																	text={b}
																/>
															</Grid>
														);
													}
												)}
											</Grid>
										</Box>
									</>
								)}
								<LegalClearance
									property={asyncState.property}
								/>
								{renderByPropertyFor(
									asyncState.property,
									'rent',

									renderByPropertyType(
										asyncState.property,
										['hostel', 'pg'],
										<>
											<Box mt="3rem">
												<h2
													className={
														globalClasses.colorPrimary
													}
												>
													Fooding
												</h2>
												{asyncState.property.fooding
													.length > 0 ? (
													<Grid container spacing={3}>
														{asyncState.property.fooding.map(
															(b, i) => {
																return (
																	<Grid
																		item
																		xs={6}
																		md={3}
																		key={i}
																	>
																		<Amenity
																			text={capitalizeFirstLetter(
																				b
																			)}
																		/>
																	</Grid>
																);
															}
														)}
													</Grid>
												) : (
													<p>Not Available</p>
												)}
											</Box>
											{asyncState.property.foodSchedule
												.length > 0 && (
												<Box mt="3rem">
													<h2
														className={
															globalClasses.colorPrimary
														}
													>
														Food Schedule
													</h2>
													<Grid container spacing={3}>
														{asyncState.property.foodSchedule.map(
															(b, i) => {
																return (
																	<Grid
																		item
																		xs={6}
																		md={3}
																		key={i}
																	>
																		<Amenity
																			text={capitalizeFirstLetter(
																				b
																			)}
																		/>
																	</Grid>
																);
															}
														)}
													</Grid>
												</Box>
											)}
										</>
									)
								)}
								{renderByPropertyFor(
									asyncState.property,
									'rent',
									<>
										<Box mt="3rem">
											<h2
												className={
													globalClasses.colorPrimary
												}
											>
												Restrictions
											</h2>
											<p>
												<i>
													{
														asyncState.property
															.restrictions
													}
												</i>
											</p>
										</Box>
									</>
								)}
								<Box mt="3rem">
									<h2 className={globalClasses.colorPrimary}>
										About The Property
									</h2>
								</Box>
								<p>
									<i>{asyncState.property.description}</i>
								</p>

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
									<div className={globalClasses.flexCenter}>
										<LightTooltip
											placement="top"
											arrow
											interactive
											title={
												<Box
													className={
														globalClasses.alignCenter
													}
												>
													<FacebookShareButton
														url="https://homesearch18.com/#/"
														quote="Homesearch18"
													>
														<FacebookIcon color="primary" />
													</FacebookShareButton>
													<Box ml="1rem">
														<TwitterShareButton
															url="https://homesearch18.com/#/"
															title="Homesearch18"
														>
															<TwitterIcon color="primary" />
														</TwitterShareButton>
													</Box>
													<Box ml="1rem">
														<LinkedinShareButton
															url="https://homesearch18.com/#/"
															title="Homesearch18"
														>
															<LinkedinIcon
																size={32}
																round
															/>
														</LinkedinShareButton>
													</Box>
													<Box ml="1rem">
														<WhatsappShareButton
															url="https://homesearch18.com/#/"
															title="Homesearch18"
															separator=":: "
														>
															<WhatsappIcon
																size={32}
																round
															/>
														</WhatsappShareButton>
													</Box>
												</Box>
											}
										>
											{/* <img
												src={rocketIcon}
												alt="Rocket"
												className={classes.utilsIcon}
											/> */}
											<ShareIcon
												className={classes.shareIcon}
											/>
										</LightTooltip>
									</div>
									<div
										className={globalClasses.justifyCenter}
									>
										<WhatsappShareButton
											url="https://homesearch18.com/#/"
											title="Homesearch18"
											separator=":: "
										>
											<img
												src={whatsappIcon}
												alt="WhatsApp"
												className={classes.utilsIcon}
											/>
										</WhatsappShareButton>
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
							</Grid>
							<Grid item xs={12} md={3}>
								<OwnerCard
									owner={asyncState.property.userId}
									property={asyncState.property}
								/>
							</Grid>
							{asyncState.property && (
								<>
									<Box>
										<h2>Similar Properties For Rent</h2>
									</Box>
									<SimilarProperties
										pFor={asyncState.property.for}
										type={
											asyncState.property.type
												? asyncState.property.type
												: asyncState.property.sale_type
										}
										city={asyncState.property.city.id}
										location={
											asyncState.property.location.id
										}
									/>
								</>
							)}
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
