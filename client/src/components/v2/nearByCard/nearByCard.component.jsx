import { Box, Typography } from '@material-ui/core';

import React from 'react';
import admin from '../../../assets/icons/admin.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import comment from '../../../assets/icons/comment.svg';
import location from '../../../assets/icons/location.svg';
import logo from '../../../assets/icons/bLogo.svg';
import tag from '../../../assets/icons/tag.svg';
import useStyles from './nearByCard.style';

const PropertyCard = () => {
	const classes = useStyles({ img: city });
	return (
		<div className={classes.wrapper}>
			<div className={classes.imageWrapper}></div>
			<div className={classes.contentWrapper}>
				<h4 className={classes.title}>Grovis Food Village</h4>
				<Typography variant="caption" align="center" display="block">
					Restaurant & Food Court
				</Typography>
			</div>
		</div>
	);
};

export default PropertyCard;
