import { Box, CardMedia, Chip, Grid, Typography } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	parseDate,
	renderBlogImage,
} from '../../utils/render.utils';

import { Link } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../common.style';
import useStyles from './news.style';

export const BlogCardMini = ({ blog }) => {
	const style = useStyles();
	const { bold, link } = useGlobalStyles();
	return (
		<Grid container spacing={1}>
			<Grid item xs={3}>
				<CardMedia
					image={renderBlogImage(blog.photo)}
					className={style.mainNewsWrapper}
					style={{
						height: '100%',
						width: '100%',
					}}
				/>
			</Grid>
			<Grid item xs={9}>
				<Link to={`/news/${blog.slug}`} className={link}>
					<Typography variant="h6" className={bold}>
						{blog.title}
					</Typography>
				</Link>
				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					alignItems="center"
				>
					<div>
						<Typography variant="caption" className={bold}>
							{blog.author}
						</Typography>{' '}
						<br />
						<Typography variant="caption">
							{parseDate(blog.createdAt)}
						</Typography>
					</div>
					<div>
						{blog.tags.map((c, i) => (
							<Typography key={i} variant="caption">
								{c}
								{i < blog.tags.length - 1 && ','}
							</Typography>
						))}
					</div>
				</Box>
				<Box mt="1rem">
					<Typography variant="caption">{blog.shortDesc}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

const BlogCard = ({ blog }) => {
	const style = useStyles();
	const { bold, link, colorGray } = useGlobalStyles();
	return (
		<Grid container spacing={3} component={Box} height={300}>
			<Grid item xs={12} md={6}>
				<CardMedia
					image={renderBlogImage(blog.photo)}
					className={style.fullHeight}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Chip
					label={capitalizeFirstLetter(blog.category)}
					variant="outlined"
					size="small"
					color="primary"
				/>
				<Box mt="0.5rem">
					<Link to={`/news/${blog.slug}`} className={clsx(link)}>
						<Typography variant="h5" className={clsx(bold)}>
							{blog.title}
						</Typography>
					</Link>
				</Box>

				<Box mt="1rem">
					<Typography variant="caption" clssName={colorGray}>
						{blog.shortDesc}
					</Typography>
				</Box>
				<Box
					display="flex"
					width="100%"
					justifyContent="space-between"
					alignItems="center"
					mt="1rem"
				>
					<div>
						<Typography variant="caption" className={bold}>
							{blog.author}
						</Typography>{' '}
						<br />
						<Typography variant="caption">
							{parseDate(blog.createdAt)}
						</Typography>
					</div>
					<div>
						{blog.tags.map((c, i) => (
							<Typography key={i} variant="caption">
								{c}
								{i < blog.tags.length - 1 && ','}
							</Typography>
						))}
					</div>
				</Box>
			</Grid>
		</Grid>
	);
};

export default BlogCard;
