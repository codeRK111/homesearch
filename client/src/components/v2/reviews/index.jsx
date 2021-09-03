import { Box, Button, CircularProgress, Grid } from '@material-ui/core';
import React, { memo, useEffect, useRef, useState } from 'react';
import { parseDate, renderProfileImage } from '../../../utils/render.utils';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import commentIcon from '../../../assets/comment.svg';
import { getReviews } from '../../../utils/asyncReview';
import useGlobalStyles from '../../../common.style';
import useStyles from './reviews.style';
import { withAsync } from '../../../hoc/withAsync';

const initialData = {
	totalDocs: 0,
	reviews: [],
};

const Reviews = memo(
	({ id, propertyType, loading, error, setLoading, setError }) => {
		// Style
		const globalStyle = useGlobalStyles();
		const style = useStyles();

		// Cancel Token
		const cancelToken = useRef(null);

		// State
		const [data, setData] = useState(initialData);
		const [page, setPage] = useState(1);

		// Callbacks
		const increasePage = () => {
			setPage(page + 1);
		};

		// Fetch Reviews
		useEffect(() => {
			(async () => {
				try {
					cancelToken.current = axios.CancelToken.source();
					const resp = await getReviews(
						id,
						{ propertyType, limit: 3, page },
						cancelToken.current,
						setLoading
					);
					setData((prevState) => ({
						totalDocs: resp.totalDocs,
						reviews: [...prevState.reviews, ...resp.reviews],
					}));
					setError(null);
				} catch (error) {
					setError(error);
					setData(initialData);
				}
			})();
		}, [id, page, propertyType, setLoading, setError]);

		return (
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					{error && (
						<p className={globalStyle.errorMessage}>{error}</p>
					)}

					{data.reviews.map((c) => (
						<div key={c.id} className={style.wrapper}>
							<div className={style.imageWrapper}>
								<img
									src={renderProfileImage(c.user.photo)}
									alt="user"
									className={style.userPhoto}
								/>
								<img
									src={commentIcon}
									alt="Comment"
									className={style.commentIcon}
								/>
							</div>
							<div className={style.messageWrapper}>
								<p className={`${style.message} ${style.text}`}>
									{c.message}
								</p>
								<div className={style.messageInfoWrapper}>
									<p className={style.userName}>
										--{c.user.name}
									</p>
									<p className={style.date}>
										{parseDate(c.createdAt)}
									</p>
								</div>
							</div>
						</div>
					))}
					{data.totalDocs > data.reviews.length && (
						<Box className={style.moreWrapper}>
							<Button
								size="small"
								endIcon={
									loading ? (
										<CircularProgress
											size={15}
											color="inherit"
										/>
									) : (
										<ExpandMoreIcon />
									)
								}
								onClick={increasePage}
							>
								View More
							</Button>
						</Box>
					)}
				</Grid>
			</Grid>
		);
	}
);

export default withAsync(Reviews);
