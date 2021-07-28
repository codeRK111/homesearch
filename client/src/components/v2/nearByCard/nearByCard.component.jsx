import React from 'react';
import { Typography } from '@material-ui/core';
import city from '../../../assets/city.jpg';
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
