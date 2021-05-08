import React from 'react';
import useGlobalStyles from '../../../common.style';
import useStyles from './amenity.style';

const Amenity = ({ text }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={globalClasses.alignCenter}>
			<div className={classes.iconWrapper}></div>
			<span>{text}</span>
		</div>
	);
};

export default Amenity;
