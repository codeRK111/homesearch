import { admin, tag } from '../../../utils/statc';

import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { StaticPaths } from '../../../utils/render.utils';
import city from '../../../assets/city.jpg';
import dayjs from 'dayjs';
import useStyles from './blogCard.style';

// import clsx from 'clsx';

const PropertyCard = ({ data }) => {
	const classes = useStyles({
		img: data.photo ? StaticPaths.blog(data.photo) : city,
	});
	const date = dayjs(data.createdAt).format('DD');
	const month = dayjs(data.createdAt).format('MMM');
	return (
		<div className={classes.wrapper}>
			<div className={classes.imageWrapper}>
				<div className={classes.overlay}>
					<div className={classes.dateWrapper}>
						<span>{date}</span>
						<span>{month}</span>
					</div>
				</div>
			</div>
			<div className={classes.contentWrapper}>
				<div className={classes.basicWrapper}>
					<div className={classes.basic}>
						<img src={admin} alt="Admin" />
						<span>{data.author}</span>
					</div>
				</div>
				<Box mt="0.7rem" mb="0.7rem">
					<h2 className={classes.title}>
						<Link
							to={`/news/${data.slug}`}
							className={classes.link}
						>
							{data.title}
						</Link>
					</h2>
				</Box>
				<div className={classes.basicWrapper}>
					<div className={classes.basic}>
						<img src={tag} alt="Admin" />
						<span>{data.tags.join(',')}</span>
					</div>
				</div>
				<Box mt="2rem">
					<p className={classes.description}>{data.shortDesc}</p>
				</Box>
			</div>
		</div>
	);
};

export default PropertyCard;
