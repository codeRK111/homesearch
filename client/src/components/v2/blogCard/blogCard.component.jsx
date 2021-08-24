import { admin, comment, tag } from '../../../utils/statc';

import { Box } from '@material-ui/core';
import React from 'react';
import city from '../../../assets/city.jpg';
import useStyles from './blogCard.style';

// import clsx from 'clsx';

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
				<Box mt="0.7rem" mb="0.7rem">
					<h2 className={classes.title}>
						Biggest Construction in Mumbai, India
					</h2>
				</Box>
				<div className={classes.basicWrapper}>
					<div className={classes.basic}>
						<img src={tag} alt="Admin" />
						<span>Apartment</span>
					</div>
				</div>
				<Box mt="2rem">
					<p className={classes.description}>
						A new project is coming up in the financial city of
						India. The long waited project is financed by India
						bulls and constructed by Lodha Group.
					</p>
				</Box>
			</div>
		</div>
	);
};

export default PropertyCard;
