import React from 'react';
import area from '../../../assets/icons/area.svg';
import bed from '../../../assets/icons/bed.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.png';
import clsx from 'clsx';
import location from '../../../assets/icons/location.svg';
import tag from '../../../assets/icons/tag.svg';
import tub from '../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

const PropertyCard = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.imageWrapper}>
				<img src={city} alt="City" />
				<div className={classes.feature}>Feature</div>
			</div>
			<div className={classes.contentWrapper}>
				<h2 className={clsx(globalClasses.textCenter, classes.title)}>
					Casa Living Villa
				</h2>
				<div className={classes.flexParentWrapper}>
					<div className={classes.flexWrapper}>
						<img
							src={location}
							alt="Location"
							className={classes.img}
						/>
						<span className={classes.contentText}>
							Trishulia, Bhubaneswar
						</span>
					</div>
					<div className={classes.flexWrapper}>
						<img src={tag} alt="Tag" className={classes.img} />
						<span className={classes.contentText}>Apartment</span>
					</div>
				</div>
				<h5 className={clsx(globalClasses.textCenter, classes.title)}>
					Rs. 25,000/Month
				</h5>
				<div className={classes.flexParentWrapper}>
					<div className={classes.flexWrapper}>
						<img src={area} alt="Area" className={classes.img} />
						<span className={classes.contentText}>1080 sqft.</span>
					</div>
					<div className={classes.flexWrapper}>
						<img src={bed} alt="Bed" className={classes.img} />
						<span className={classes.contentText}>3</span>
					</div>
					<div className={classes.flexWrapper}>
						<img src={tub} alt="Tub" className={classes.img} />
						<span className={classes.contentText}>2</span>
					</div>
					<div className={classes.flexWrapper}>
						<img src={car} alt="Car" className={classes.img} />
						<span className={classes.contentText}>1</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
