import {
	Box,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AbsentIcon from '@material-ui/icons/Cancel';
import PresentIcon from '@material-ui/icons/CheckCircle';
import RoomIcon from '@material-ui/icons/Room';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import logo from '../../assets/icons/logo.svg';
import BackdropLoader from '../../components/v2/backdrop/loader';
import Nav from '../../components/v2/pageNav/nav.component';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import { asyncFetchPackageDetails } from '../../utils/asyncPackage';
import { parseDate, toCurrency } from '../../utils/render.utils';
import PaymentSuccess from './successPage';

const useStyles = makeStyles((theme) => ({
	orderWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
		marginTop: '1rem',
	},
	gstTitle: {
		fontSize: '0.7rem',
	},
	bold: {
		fontWeight: 700,
		letterSpacing: 1,
	},
	specificationWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1rem',
		'& > span': {
			marginLeft: '1rem',
			fontSize: '1rem',
			fontWeight: 600,
			letterSpacing: 1,
		},
	},
	summeryItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '1rem',
		marginTop: '1rem',
	},
	button: {
		display: 'flex',
		border: 'none',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		background: theme.shadowColor,
		boxShadow: '3px 3px 7px #a4a4a4,-3px -3px 7px #ffffff',
		borderRadius: 10,
		padding: '1rem 2rem',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: 1,
		cursor: 'pointer',
		fontWeight: 700,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
			color: '#ffffff',
		},
	},
	lineThrough: {
		textDecoration: 'line-through',
	},
}));

const TenantPackageConfirmationPage = ({
	isAuthenticated,
	toggleLoginPopup,
	user,
	match: {
		params: { packageName },
	},
	...props
}) => {
	const [loading, setLoading] = useState(false);
	const [packageData, setPackageData] = useState(null);
	const [initialLoading, setInitialLoading] = useState(false);
	const [paymentId, setPaymentId] = useState(null);
	const [subscriptionId, setSubscriptionId] = useState(null);
	const [successLoading, setSuccessLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const {
		bold,
		specificationWrapper,
		summeryItem,
		button,
		orderWrapper,
		lineThrough,
		gstTitle,
	} = useStyles();
	const getQueryString = () => {
		const query = new URLSearchParams(props.location.search);
		return query.get('hs');
	};

	const fetchPackages = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await asyncFetchPackageDetails(packageName);
			setPackageData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, [packageName]);

	const calculatePrice = (gst, price) => {
		if (!gst) return price;
		let igst = 0;
		let cgst = 0;
		let sgst = 0;
		if (gst.igst) {
			igst = price * (gst.igst / 100);
		}
		if (gst.cgst) {
			cgst = price * (gst.cgst / 100);
		}
		if (gst.sgst) {
			sgst = price * (gst.sgst / 100);
		}

		return Math.round(price + igst + cgst + sgst);
	};

	const onPayment = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
			return;
		}
		displayRazorpay();
	};

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		setInitialLoading(true);
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			setInitialLoading(false);
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}

		// creating a new order
		const token = localStorage.getItem('JWT_CLIENT');
		const result = await axios.post(
			'/api/v2/payment/buy-tenant-package',
			{ packageName },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setInitialLoading(false);

		if (!result) {
			alert('Server error. Are you online?');
			setInitialLoading(false);
			return;
		}

		// Getting the order details back
		const { amount, id: order_id, currency } = result.data;
		const rzTestKeyId =
			process.env.NODE_ENV === 'development'
				? process.env.REACT_APP_RZ_TEST_ID
				: process.env.REACT_APP_RZ_LIVE_ID;

		const options = {
			key: rzTestKeyId, // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: 'Homesearch India',
			description: 'Buy Tenant Package',
			customer: {
				name: 'Gaurav Kumar',
				contact: '+919999999999',
				email: 'gaurav.kumar@example.com',
			},
			order_id: order_id,
			image: logo,
			handler: async function (response) {
				try {
					if (!packageData) return;
					setSuccessLoading(true);
					setPaymentId(response.razorpay_payment_id);
					const mainAmount = packageData.actualPrice;
					const paidAmount = packageData.price;
					const data = {
						orderCreationId: order_id,
						razorpayPaymentId: response.razorpay_payment_id,
						razorpayOrderId: response.razorpay_order_id,
						razorpaySignature: response.razorpay_signature,
						package: packageName,
						mainAmount,
						paidAmount,
					};
					if (getQueryString()) {
						data.homeSearchStaff = getQueryString();
					}

					const successResponse = await axios.post(
						'/api/v2/payment/buy-tenant-package-success',
						data,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem(
									'JWT_CLIENT'
								)}`,
							},
						}
					);
					if (
						successResponse.data.subscription &&
						successResponse.data.subscription.id
					) {
						setSubscriptionId(successResponse.data.subscription.id);
					} else {
						setSubscriptionId(null);
					}
					setSuccessLoading(false);
					setSuccess(true);
				} catch (error) {
					setSuccessLoading(false);
					alert(error.data.message);
					setSuccess(false);
				}
			},

			notes: {
				address: 'Grovis Pvt. Ltd.',
			},
			theme: {
				color: '#2AAAAC',
			},
			modal: {
				confirm_close: true,
			},
			prefill: {
				name: user.name,
				email: user.email,
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	const renderTax = (gst, price) => {
		if (!gst) return <></>;
		return (
			<>
				{gst.igst && (
					<div className={summeryItem}>
						<span className={gstTitle}>IGST@{gst.igst}%</span>
						<span className={bold}>
							<Box>
								<Typography variant="caption">
									&#x20B9;
									{toCurrency(price * (gst.igst / 100))}
								</Typography>
							</Box>
						</span>
					</div>
				)}
				{gst.cgst && (
					<div className={summeryItem}>
						<span className={gstTitle}>CGST@{gst.cgst}%</span>
						<span className={bold}>
							<Box>
								<Typography variant="caption">
									&#x20B9;
									{toCurrency(price * (gst.cgst / 100))}
								</Typography>
							</Box>
						</span>
					</div>
				)}
				{gst.sgst && (
					<div className={summeryItem}>
						<span className={gstTitle}>SGST@{gst.sgst}%</span>
						<span className={bold}>
							<Box>
								<Typography variant="caption">
									&#x20B9;
									{toCurrency(price * (gst.sgst / 100))}
								</Typography>
							</Box>
						</span>
					</div>
				)}
			</>
		);
	};
	return (
		<div>
			<Nav />
			<BackdropLoader open={loading} text="Fetching Details..." />
			<Box mt="2rem" mb="2rem">
				{success ? (
					<PaymentSuccess
						data={paymentId ? `Payment ID: ${paymentId}` : null}
						subscriptionId={subscriptionId}
					/>
				) : (
					<Container>
						<Typography
							variant="h5"
							align="center"
							component="h1"
							gutterBottom
							className={bold}
						>
							Confirm Package
						</Typography>
						{packageData && (
							<Box mt="3rem">
								<Grid container spacing={3} justify="center">
									<Grid item xs={12} md={4}>
										<Typography
											variant="h6"
											component="h1"
											gutterBottom
											className={bold}
										>
											Package Details
										</Typography>
										<Box mt="2rem">
											{packageData.packageDetails.map(
												(b) => (
													<div
														className={
															specificationWrapper
														}
														key={b._id}
													>
														{b.detailType ===
														'present' ? (
															<PresentIcon color="primary" />
														) : (
															<AbsentIcon color="secondary" />
														)}

														<span>{b.detail}</span>
													</div>
												)
											)}
										</Box>
										<Box mt="2rem">
											<div
												className={specificationWrapper}
											>
												<RoomIcon color="primary" />
												<span>{packageData.name}</span>
											</div>
											<div
												className={specificationWrapper}
											>
												<CalendarTodayIcon color="primary" />
												<span>
													{parseDate(Date.now())}
												</span>
											</div>
										</Box>
									</Grid>

									<Grid item xs={12} md={3}>
										<Alert color="success" variant="filled">
											Congrats, you saved &#x20B9;{' '}
											{toCurrency(
												packageData.actualPrice -
													packageData.price
											)}
										</Alert>
										<Paper
											className={orderWrapper}
											elevation={5}
										>
											<Typography
												variant="h6"
												component="h1"
												gutterBottom
												className={bold}
											>
												Order Details
											</Typography>
											<Box mt="2rem">
												<div className={summeryItem}>
													<span>Price</span>
													<span className={bold}>
														<Box>
															<Typography
																variant="caption"
																className={
																	lineThrough
																}
															>
																&#x20B9;
																{toCurrency(
																	packageData.actualPrice
																)}
															</Typography>
															<Box>
																<b>
																	&#x20B9;
																	{toCurrency(
																		packageData.price
																	)}
																</b>
															</Box>
														</Box>
													</span>
												</div>
												{renderTax(
													packageData.gst,
													packageData.price
												)}
												<Divider />
												<div className={summeryItem}>
													<span>Total</span>
													<span className={bold}>
														&#x20B9;
														{toCurrency(
															calculatePrice(
																packageData.gst,
																packageData.price
															)
														)}
													</span>
												</div>
												<button
													className={button}
													onClick={onPayment}
													disabled={
														initialLoading ||
														successLoading
													}
												>
													{successLoading
														? 'Processing your payment'
														: 'Confirm & Pay'}

													{(initialLoading ||
														successLoading) && (
														<Box ml="0.5rem">
															<CircularProgress
																size={15}
																color="inherit"
															/>
														</Box>
													)}
												</button>
												<Box mt="1rem">
													<Typography variant="caption">
														* By confirming you will
														agree to our{' '}
														<Link to="/terms">
															terms and conditions
														</Link>{' '}
														{/* &{' '}
													<Link to="/refund">
														refund & canceltaion
														policy
													</Link> */}
													</Typography>
												</Box>
											</Box>
										</Paper>
									</Grid>
								</Grid>
							</Box>
						)}
					</Container>
				)}
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TenantPackageConfirmationPage);
