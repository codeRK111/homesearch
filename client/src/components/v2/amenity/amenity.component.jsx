import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './amenity.style';

const Amenity = ({ text, noImage = false }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={globalClasses.alignCenter}>
			<div
				className={clsx(classes.iconWrapper, {
					[classes.innerPadding]: noImage,
				})}
			>
				{noImage && <div className={classes.point}></div>}
			</div>
			<span className={classes.text}>{text}</span>
		</div>
	);
};

export default Amenity;
