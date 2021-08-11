import { location2, tag } from '../../../utils/statc';

import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './agentCard.style';

const PropertyCard = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.imageWrapper}>
				<div className={classes.overlay}>
					<div className={classes.feature}>
						<span>feature</span>
					</div>
				</div>
			</div>
			<div className={classes.contentWrapper}>
				<h2 className={clsx(globalClasses.textCenter, classes.title)}>
					Abhishek Nayak
				</h2>
				<div className={classes.flexParentWrapper}>
					<div className={classes.flexWrapper}>
						<img
							src={location2}
							alt="Location"
							className={classes.img}
						/>
						<span className={classes.contentText}>
							Trishulia, Bhubaneswar
						</span>
					</div>
					<div className={classes.flexWrapper}>
						<img src={tag} alt="Tag" className={classes.img} />
						<span className={classes.contentText}>
							Retail Warehouse
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
