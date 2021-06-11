import { Box } from '@material-ui/core';
import React from 'react';
import admin from '../../../assets/icons/admin.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import comment from '../../../assets/icons/comment.svg';
import location from '../../../assets/icons/location.svg';
import logo from '../../../assets/icons/bLogo.svg';
import tag from '../../../assets/icons/tag.svg';
import useStyles from './blogCard.style';

const PropertyCard = () => {
	const classes = useStyles({ img: city });
	return (
		<div className={classes.wrapper}>
			<div className={classes.imageWrapper}>
				<div className={classes.overlay}>
					<div className={classes.dateWrapper}>
						<span>16</span>
						<span>JAN</span>
					</div>
				</div>
			</div>
			<div className={classes.contentWrapper}>
				<div className={classes.basicWrapper}>
					<div className={classes.basic}>
						<img src={admin} alt="Admin" />
						<span>Admin</span>
					</div>
					<Box ml="3rem">
						<div className={classes.basic}>
							<img src={comment} alt="Admin" />
							<span>Comments</span>
						</div>
					</Box>
				</div>
				<Box mt="0.5rem" mb="0.5rem">
					<h2 className={classes.title}>Coming Soon..</h2>
				</Box>
				<div className={classes.basicWrapper}>
					<div className={classes.basic}>
						<img src={tag} alt="Admin" className={classes.rotate} />
						<span>Apartment</span>
					</div>
				</div>
				<Box mt="2rem">
					<p className={classes.description}>Coming Soon..</p>
				</Box>
			</div>
		</div>
	);
};

export default PropertyCard;
