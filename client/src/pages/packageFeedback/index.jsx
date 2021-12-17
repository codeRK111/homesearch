import {
	Box,
	Button,
	CircularProgress,
	Container,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	asyncGetSubscriptionDetails,
	asyncSubmitFeedack,
} from '../../utils/asyncPackage';

import LoadSubscriptionSkeleton from '../../components/v2/skeleton/packageFeedback';
import Nav from '../../components/v2/pageNav/nav.component';
import PaymentSuccess from '../tenantPackages/successPage';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';

const labels = {
	1: 'Very Poor',
	2: 'Poor',
	3: 'Ok',
	4: 'Good',
	5: 'Excellent',
};

const PackageFeedbackPage = ({
	user,
	match: {
		params: { id },
	},
}) => {
	const token = useRef(undefined);
	const [value, setValue] = useState(0);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [hover, setHover] = useState(-1);
	const [feedback, setFeedback] = useState('');
	const [error, setError] = useState(null);
	const [submitError, setSubmitError] = useState(null);

	const fetchSubscription = useCallback(async () => {
		try {
			token.current = axios.CancelToken.source();
			const resp = await asyncGetSubscriptionDetails(
				id,
				token.current,
				setFetchLoading
			);
			// if (user.id !== resp.user.id) {
			// 	throw new Error('Not authorized');
			// }
			if (resp.paymentReviewStatus === 'received') {
				throw new Error('Feedback already recorded');
			}
			setError(null);
		} catch (e) {
			setError(e.message);
		}
	}, [id, user]);

	const onSubmit = async () => {
		if (!feedback && !value) {
			return;
		}
		try {
			await asyncSubmitFeedack(
				id,
				{
					paymentReview: feedback,
					paymentRating: value,
				},
				token.current,
				setSubmitLoading
			);
			setSubmitError(null);
			setSuccess(true);
		} catch (e) {
			setSuccess(false);
			setSubmitError(e.message);
		}
	};

	useEffect(() => {
		fetchSubscription();
		return () => {
			if (token.current) {
				token.current.cancel();
			}
		};
	}, [fetchSubscription]);

	const renderData = () => {
		if (success) {
			return (
				<Box mt="2rem" mb="2rem">
					<PaymentSuccess
						heading="Thank you for your feedback"
						text="Your feedback will help us to improve our service"
					/>
				</Box>
			);
		} else {
			if (fetchLoading) {
				return (
					<Box mt="2rem" mb="2rem">
						<LoadSubscriptionSkeleton />
					</Box>
				);
			} else {
				return (
					<>
						{error ? (
							<Box mt="2rem" mb="2rem">
								<Typography variant="h6" color="error">
									{error}
								</Typography>
							</Box>
						) : (
							<Box mt="2rem" mb="2rem">
								<Box
									component="fieldset"
									mt={3}
									borderColor="transparent"
								>
									<Typography component="legend">
										Rate your experience
									</Typography>
									<Rating
										name="simple-controlled"
										value={value}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										onChangeActive={(event, newHover) => {
											setHover(newHover);
										}}
										size="large"
									/>
									{value !== null && (
										<Box ml={2}>
											{
												labels[
													hover !== -1 ? hover : value
												]
											}
										</Box>
									)}
								</Box>
								<Box
									component="fieldset"
									mt={1}
									borderColor="transparent"
								>
									<TextField
										variant="filled"
										fullWidth
										rows={10}
										multiline
										label="Describe your experience"
										value={feedback}
										onChange={(e) =>
											setFeedback(e.target.value)
										}
									/>
								</Box>
								{submitError && !submitLoading && (
									<Box
										component="fieldset"
										mt={1}
										borderColor="transparent"
									>
										<Typography variant="h6" color="error">
											{submitError}
										</Typography>
									</Box>
								)}
								<Box
									component="fieldset"
									mt={1}
									borderColor="transparent"
								>
									<Button
										variant="contained"
										color="primary"
										size="large"
										disabled={submitLoading}
										onClick={onSubmit}
										endIcon={
											submitLoading ? (
												<CircularProgress
													size={20}
													color="inherit"
												/>
											) : (
												<></>
											)
										}
									>
										Submit
									</Button>
								</Box>
							</Box>
						)}
					</>
				);
			}
		}
	};
	return (
		<div>
			<Nav />
			<Container>{renderData()}</Container>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(PackageFeedbackPage);
