import { Box, Grid } from '@material-ui/core';
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

import Amenity from '../../../components/v2/amenity/amenity.component';
import ErrorMessage from '../../../components/v2/backdropMessage';
import FlatRentHeader from '../../../components/v2/searchCard2/rent/flatDetails.component';
import FlatSaleHeader from '../../../components/v2/searchCard2/sale/flatDetails.component';
import HostelRentHeader from '../../../components/v2/searchCard2/rent/hostelDetails.component';
import LandSaleHeader from '../../../components/v2/searchCard2/sale/landDetails.component';
import LegalClearance from './legalClearance.component';
import Loading from '../../../components/v2/loadingAnimation';
import Nav from '../../../components/v2/pageNav/nav.component';
import OwnerCard from '../../../components/v2/ownerCard';
import PropertyAction from './propertyAction.component';
import PropertyComment from '../../../components/v2/comment';
import React from 'react';
import Reviews from '../../../components/v2/reviews';
import SimilarProperties from '../../../components/v2/similarProperties';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyDetailsPage.style';

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
	const input = React.useRef(null);
	const [reviews, setReviews] = React.useState([]);
	const [postReview, setPostReview] = React.useState(false);
	const [postReviewLoading, setPostReviewLoading] = React.useState(false);
	let cancelToken = React.useRef(undefined);
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

	// const token = localStorage.getItem('JWT_CLIENT');
	// cancelToken.current = axios.CancelToken.source();
	// useAxios({
	// 	url: apiUrl('/save-property', 2),
	// 	method: 'post',
	// 	body: {
	// 		property: id,
	// 	},
	// options: {
	// 	headers: {
	// 		cancelToken: cancelToken.current.token,
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// },
	// });

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

	const onComment = () => {
		if (!review.trim()) return;
		if (!isAuthenticated) {
			setPostReview(true);
			toggleLoginPopup(true);
		} else {
			addReview();
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
			{/* <Loading open={true} /> */}
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

										{asyncState.property.amenities.length >
										0 ? (
											<Grid container spacing={3}>
												{' '}
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
																	text={
																		b.name
																	}
																/>
															</Grid>
														);
													})}{' '}
											</Grid>
										) : (
											<p>No Amenities</p>
										)}
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
													{asyncState.property
														.restrictions
														? asyncState.property
																.restrictions
														: 'No restrictions'}
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
							</Grid>
							<Grid item xs={12} md={3}>
								<Box mb="2rem">
									<OwnerCard
										owner={asyncState.property.userId}
										property={asyncState.property}
										type="property"
										pFor={asyncState.property.for}
										pType={
											asyncState.property.for === 'rent'
												? asyncState.property.type
												: asyncState.property.sale_type
										}
									/>
								</Box>
							</Grid>
						</Grid>
						{asyncState.property && (
							<>
								<PropertyAction id={id} />
								<PropertyComment
									type={'property'}
									id={asyncState.property.id}
									propertyItemType={
										asyncState.property.type
											? asyncState.property.type
											: asyncState.property.sale_type
									}
									pFor={asyncState.property['for']}
								/>
								<Reviews propertyType={'property'} id={id} />

								<Box mt="2rem">
									<h2>
										Similar Properties For{' '}
										{capitalizeFirstLetter(
											asyncState.property.for
										)}
									</h2>
								</Box>
								<SimilarProperties
									pFor={asyncState.property.for}
									type={
										asyncState.property.type
											? asyncState.property.type
											: asyncState.property.sale_type
									}
									city={asyncState.property.city.id}
									location={asyncState.property.location.id}
									excludeId={asyncState.property.id}
								/>
							</>
						)}
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
