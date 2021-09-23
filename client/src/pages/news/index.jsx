import BlogCard, { BlogCardMini } from './blog';
import { Box, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import { parseDate, renderBlogImage } from '../../utils/render.utils';

import ErrorBackdrop from '../../components/v2/backdropMessage';
import { Link } from 'react-router-dom';
import Nav from '../../components/v2/pageNav/nav.component';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import clsx from 'clsx';
import { getBlogs } from '../../utils/asyncBlog';
import useGlobalStyles from '../../common.style';
import useStyles from './news.style';
import { withAsync } from '../../hoc/withAsync';

const NewsPage = ({ loading, setLoading, error, setError }) => {
	// Style
	const style = useStyles();
	const { bold, link } = useGlobalStyles();

	// API Cancel Token
	const cancelBlogsTokeb = useRef();

	// State
	const [data, setData] = useState([]);

	const fetchBlogs = useCallback(async () => {
		try {
			cancelBlogsTokeb.current = axios.CancelToken.source();
			const resp = await getBlogs(cancelBlogsTokeb.current, setLoading);
			setError(null);
			setData(resp);
			console.log({ resp });
		} catch (error) {
			setData([]);
			setError(error);
		}
	}, [setLoading, setError]);

	React.useEffect(() => {
		fetchBlogs();

		return () => {
			if (cancelBlogsTokeb.current) {
				cancelBlogsTokeb.current.cancel();
			}
		};
	}, [fetchBlogs]);
	return (
		<div>
			<Nav />
			<div className={style.wrapper}>
				{loading && <Loader />}

				<ErrorBackdrop open={!!error} message={error} />
				{data.length > 0 && (
					<Box>
						<Grid container spacing={1}>
							<Grid item xs={12} md={8}>
								<CardMedia
									image={renderBlogImage(data[0].photo)}
									className={style.mainNewsWrapper}
									classes={{
										root: style.mediaRoot,
									}}
								>
									<Box p="1rem" width="100%">
										<Link
											to={`/news/${data[0].slug}`}
											className={link}
										>
											<Typography
												variant="h4"
												color="textPrimary"
												className={clsx(
													style.colorWhite,
													bold
												)}
											>
												{data[0].title}
											</Typography>
										</Link>
										<Box
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											width="100%"
										>
											<div>
												<Typography
													className={style.colorWhite}
													variant="caption"
												>
													{data[0].author}
												</Typography>{' '}
												<br />
												<Typography
													className={style.colorWhite}
													variant="caption"
												>
													{parseDate(
														data[0].createdAt
													)}
												</Typography>
											</div>
											<div>
												{data[0].tags.map((c, i) => (
													<Typography
														key={i}
														className={
															style.colorWhite
														}
														variant="caption"
													>
														{c}
														{i <
															data[0].tags
																.length -
																1 && ','}
													</Typography>
												))}
											</div>
										</Box>
									</Box>
								</CardMedia>
							</Grid>
							<Grid item xs={12} md={4}>
								<Box
									display="flex"
									flexDirection="column"
									height="100%"
									justifyContent="space-between"
								>
									{data
										.filter((_, i) => i > 0 && i < 4)
										.map((b) => (
											<BlogCardMini blog={b} key={b.id} />
										))}
								</Box>
							</Grid>
						</Grid>
						<Container component={Box} mt="2rem" maxWidth="md">
							<Grid container spacing={3}>
								{data
									.filter((_, i) => i > 3)
									.map((c) => (
										<Grid item xs={12} key={c.id}>
											<BlogCard blog={c} />
										</Grid>
									))}
							</Grid>
						</Container>
					</Box>
				)}
			</div>
		</div>
	);
};

const Loader = () => {
	const style = useStyles();
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} md={8}>
				<Skeleton
					variant="rect"
					className={style.skeletonWrapperMain}
					animation={'wave'}
				/>
			</Grid>
			<Grid item xs={12} md={4}>
				<Grid
					container
					component={Box}
					direction="column"
					justify="space-between"
					height={'100%'}
				>
					<Grid item>
						<Skeleton
							variant="rect"
							className={style.skeletonWrapperSide}
							animation={'wave'}
						/>
					</Grid>
					<Grid item>
						<Skeleton
							variant="rect"
							className={style.skeletonWrapperSide}
							animation={'wave'}
						/>
					</Grid>
					<Grid item>
						<Skeleton
							variant="rect"
							className={style.skeletonWrapperSide}
							animation={'wave'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default withAsync(NewsPage);
