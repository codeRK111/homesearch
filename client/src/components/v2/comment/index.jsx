import { Box, CircularProgress } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { setSnackbar, toggleLoginPopup } from '../../../redux/ui/ui.actions';

import Alert from '@material-ui/lab/Alert';
import { addReview } from '../../../utils/asyncReview';
import axios from 'axios';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import useStyles from './comment.style';
import { withAsync } from '../../../hoc/withAsync';

const Types = {
	property: 'property',
	project: 'project',
};

const PropertyComment = ({
	isAuthenticated,
	toggleLoginPopup,
	setSnackbar,
	loading,
	error,
	setLoading,
	setError,
	type,
	id,
	pFor,
	propertyItemType,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const input = useRef(null);
	const cancelToken = useRef(null);
	const [review, setReview] = useState('');
	const [success, setSuccess] = useState(false);

	// Callbacks
	const handleChange = (e) => {
		const { value } = e.target;
		setReview(value);
	};

	const onComment = async () => {
		if (!review.trim()) return;
		if (!isAuthenticated) {
			toggleLoginPopup(true);
		} else {
			const data = {
				propertyType: type,
				[Types[type]]: id,
				message: review,
				pFor,
				propertyItemType,
			};

			try {
				cancelToken.current = axios.CancelToken.source();
				await addReview(data, cancelToken.current, setLoading);
				setError(null);
				setSuccess(true);
				setReview('');
			} catch (error) {
				setError(error);
				setSuccess(false);
			}
		}
	};
	return (
		<div>
			<Box mt="3rem">
				<input
					type="text"
					className={classes.comment}
					placeholder="Leave A Comment !"
					value={review}
					onChange={handleChange}
					ref={input}
					onFocus={(e) => {
						if (input.current) {
							input.current.placeholder = '';
						}
					}}
					onBlur={(e) => {
						if (input.current) {
							input.current.placeholder = 'Leave A Comment !';
						}
					}}
				/>
			</Box>
			{error && <p className={globalClasses.errorMessage}>{error}</p>}
			<Box mt="1rem">
				{success && (
					<Alert severity="success" onClose={() => setSuccess(false)}>
						We are reviewing your comment, it will be posted very
						soon
					</Alert>
				)}
			</Box>
			<button
				onClick={onComment}
				className={clsx(
					classes.button,
					globalClasses.topMargin,
					globalClasses.xsTopMargin
				)}
			>
				Submit
				{loading && (
					<CircularProgress
						size={15}
						color="inherit"
						className={classes.loader}
					/>
				)}
			</button>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAsync(PropertyComment));
