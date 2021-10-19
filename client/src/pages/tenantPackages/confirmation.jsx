import {
	Box,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';

import AbsentIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Nav from '../../components/v2/pageNav/nav.component';
import PaymentSuccess from './successPage';
import PresentIcon from '@material-ui/icons/CheckCircle';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logo from '../../assets/icons/logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { parseDate } from '../../utils/render.utils';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';

const useStyles = makeStyles((theme) => ({
	orderWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
		marginTop: '1rem',
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
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		border: `2px solid ${theme.palette.primary.main}`,
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		padding: '1rem 2rem',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: 1,
		cursor: 'pointer',
		fontWeight: 700,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
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
}) => {
	const [initialLoading, setInitialLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const {
		bold,
		specificationWrapper,
		summeryItem,
		button,
		orderWrapper,
		lineThrough,
	} = useStyles();

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
			order_id: order_id,
			image: logo,
			handler: async function (response) {
				try {
					const data = {
						orderCreationId: order_id,
						razorpayPaymentId: response.razorpay_payment_id,
						razorpayOrderId: response.razorpay_order_id,
						razorpaySignature: response.razorpay_signature,
					};

					await axios.post('/api/v1/api-test/success', data);
					setSuccess(true);
				} catch (error) {
					alert(error.data.message);
					setSuccess(false);
				}
			},
			prefill: {
				name: user.name,
				email: user.email,
				contact: user.number,
			},
			notes: {
				address: 'Grovis Pvt. Ltd.',
			},
			theme: {
				color: '#61dafb',
			},
			modal: {
				confirm_close: true,
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}
	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				{success ? (
					<PaymentSuccess />
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
										<div className={specificationWrapper}>
											<PresentIcon color="primary" />
											<span>
												Get Information Of Upto 5
												Properties
											</span>
										</div>
										<div className={specificationWrapper}>
											<PresentIcon color="primary" />
											<span>Verfifed Properties</span>
										</div>
										<div className={specificationWrapper}>
											<PresentIcon color="primary" />
											<span>Properties From Owner</span>
										</div>
										<div className={specificationWrapper}>
											{packageName === 'b' ? (
												<PresentIcon color="primary" />
											) : (
												<AbsentIcon color="secondary" />
											)}

											<span>Site Visit</span>
										</div>
										<div className={specificationWrapper}>
											<PresentIcon color="primary" />
											<span>No Brokerage</span>
										</div>
									</Box>
									<Box mt="2rem">
										<div className={specificationWrapper}>
											<RoomIcon color="primary" />
											<span>
												{packageName === 'b'
													? 'Bhubaneswar'
													: 'Other City'}
											</span>
										</div>
										<div className={specificationWrapper}>
											<CalendarTodayIcon color="primary" />
											<span>{parseDate(Date.now())}</span>
										</div>
									</Box>
								</Grid>

								<Grid item xs={12} md={3}>
									<Alert color="success" variant="filled">
										Congrats, you saved &#x20B9; 500
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
													{packageName === 'b' ? (
														<Box>
															<Typography
																variant="caption"
																className={
																	lineThrough
																}
															>
																&#x20B9; 3499
															</Typography>
															<Box>
																<b>
																	&#x20B9;
																	2999
																</b>
															</Box>
														</Box>
													) : (
														<Box>
															<Typography
																variant="caption"
																className={
																	lineThrough
																}
															>
																&#x20B9; 1499
															</Typography>
															<Box>
																<b>
																	&#x20B9; 999
																</b>
															</Box>
														</Box>
													)}
												</span>
											</div>
											<Divider />
											<div className={summeryItem}>
												<span>Total</span>
												<span className={bold}>
													{packageName === 'b' ? (
														<React.Fragment>
															&#x20B9; 2999
														</React.Fragment>
													) : (
														<React.Fragment>
															&#x20B9; 2999
														</React.Fragment>
													)}
												</span>
											</div>
											<button
												className={button}
												onClick={onPayment}
												disabled={initialLoading}
											>
												Confirm & Pay
												{initialLoading && (
													<Box ml="0.5rem">
														<CircularProgress
															size={15}
															color="inherit"
														/>
													</Box>
												)}
											</button>
										</Box>
									</Paper>
								</Grid>
							</Grid>
						</Box>
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
