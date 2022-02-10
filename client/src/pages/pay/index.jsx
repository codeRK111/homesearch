import {
	Box,
	Chip,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { apiUrl, asyncError } from '../../utils/render.utils';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';

import ErrorMessage from '../../components/errorMessage/errorMessage.component';
import { Link } from 'react-router-dom';
import Nav from '../../components/v2/pageNav/nav.component';
import PaymentSuccess from '../tenantPackages/successPage';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logo from '../../assets/icons/logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import useAxios from '../../hooks/useAxiosv2';

const useStyles = makeStyles((theme) => ({
	packageWrapper: {
		padding: '1rem',
		backgroundColor: 'transparent',
		borderRadius: 20,
	},
	line: {
		flex: 1,
		width: '100%',
		height: 1,
		background: '#cccccc',
	},
	price: {
		fontSize: '1.3rem',
	},

	notes: {
		marginLeft: '1rem',
		fontSize: '1rem',
		fontWeight: 600,
		letterSpacing: 1,
		lineHeight: 1.5,
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
}));

const PayPage = ({ isAuthenticated, toggleLoginPopup, user, ...props }) => {
	const { packageWrapper, line, price, button, notes } = useStyles();
	const [initialLoading, setInitialLoading] = useState(false);
	const [afterPaymentLoading, setAfterPaymentLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const getQueryString = () => {
		const query = new URLSearchParams(props.location.search);
		return query.get('pl');
	};

	const { loading, error, response } = useAxios(
		apiUrl(`/payment/payment-link/${getQueryString()}`, 2),
		{
			method: 'get',
		}
	);
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
		try {
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
			const result = await axios.get(
				`/api/v2/payment/pay-by-link/${getQueryString()}`,

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
				handler: async function (serverResponse) {
					try {
						setAfterPaymentLoading(true);
						const data = {
							orderCreationId: order_id,
							paymentLink: getQueryString(),
							razorpayPaymentId:
								serverResponse.razorpay_payment_id,
							razorpayOrderId: serverResponse.razorpay_order_id,
							razorpaySignature:
								serverResponse.razorpay_signature,
							paidAmount: response.data.link.amount,
						};
						if (response && response.data.link.dealBy) {
							data.homeSearchStaff = response.data.link.dealBy;
						}

						await axios.post(
							'/api/v2/payment/payment-link-success',
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
						setAfterPaymentLoading(false);
						setSuccess(true);
					} catch (error) {
						setAfterPaymentLoading(false);
						alert(asyncError(error));
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
				method: {
					netbanking: false,
					card: false,
					wallet: false,
					upi: true,
					emi: false,
				},
			};

			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
		} catch (error) {
			setInitialLoading(false);
			alert(asyncError(error));
		}
	}

	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				<Container>
					{error && <ErrorMessage message={error} />}

					<Box mt="2rem">
						{success ? (
							<PaymentSuccess />
						) : (
							<Grid container spacing={3} justify="center">
								{loading || afterPaymentLoading ? (
									<Grid item xs={12} md={4}>
										<Paper
											className={packageWrapper}
											elevation={5}
										>
											<Skeleton
												width="100%"
												height={300}
											/>
										</Paper>
									</Grid>
								) : (
									response && (
										<Grid item xs={12} md={4}>
											<Paper
												className={packageWrapper}
												elevation={5}
											>
												<Typography
													variant="caption"
													align="center"
													gutterBottom
													display="block"
												>
													Please make a payment of
													amount
												</Typography>
												<Box
													display="flex"
													justifyContent="center"
													alignItems="center"
													mt="1rem"
												>
													<div className={line}></div>
													<Chip
														style={{ width: 150 }}
														label={
															<Box
																display="flex"
																alignItems="center"
															>
																<Box>
																	<b
																		className={
																			price
																		}
																	>
																		&#x20B9;{' '}
																		{
																			response
																				.data
																				.link
																				.amount
																		}
																	</b>
																</Box>
															</Box>
														}
														variant="outlined"
													/>
													<div className={line}></div>
												</Box>
												<Box mt="1rem">
													<Grid
														container
														spacing={0}
														justify="center"
													>
														<Grid item xs={12}>
															<Typography
																align="center"
																className={
																	notes
																}
															>
																{
																	response
																		.data
																		.link
																		.notes
																}
															</Typography>
														</Grid>
													</Grid>
													<Box
														mt="1rem"
														display="flex"
														justifyContent="center"
													>
														<button
															className={button}
															onClick={onPayment}
															disabled={
																initialLoading
															}
														>
															Confirm & Pay
															{initialLoading && (
																<Box ml="0.5rem">
																	<CircularProgress
																		size={
																			15
																		}
																		color="inherit"
																	/>
																</Box>
															)}
														</button>
													</Box>
													<Box
														mt="1rem"
														display="flex"
														justifyContent="center"
													>
														<Typography variant="caption">
															* By confirming you
															will agree to our{' '}
															<Link to="/terms">
																terms and
																conditions
															</Link>{' '}
															{/* &{' '}
															<Link to="/refund">
																refund &
																canceltaion
																policy
															</Link> */}
														</Typography>
													</Box>
												</Box>
											</Paper>
										</Grid>
									)
								)}
							</Grid>
						)}
					</Box>
				</Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayPage);
