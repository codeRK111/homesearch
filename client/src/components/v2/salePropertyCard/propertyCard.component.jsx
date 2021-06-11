import React from 'react';
import area from '../../../assets/icons/area.svg';
import bed from '../../../assets/icons/bed.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../assets/icons/location.svg';
import { renderToilets } from '../../../utils/render.utils';
import tag from '../../../assets/icons/tag.svg';
import tub from '../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

const TYPES = {
	flat: 'Apartment',
	land: 'Land',
	independenthouse: 'Villa',
};

const PropertyCard = ({ data }) => {
	const classes = useStyles({ img: city });
	const globalClasses = useGlobalStyles();
	return (
		<>
			{!!data && (
				<div className={classes.wrapper}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							<div className={classes.feature}>Feature</div>
						</div>
					</div>
					{/* <div className={classes.imageWrapper}>
				<img src={city} alt="City" />
				<div className={classes.feature}>Feature</div>
			</div> */}
					<div className={classes.contentWrapper}>
						<h2
							className={clsx(
								globalClasses.textCenter,
								classes.title
							)}
						>
							{data.title}
						</h2>
						<div className={classes.flexParentWrapper}>
							<div className={classes.flexWrapper}>
								<img
									src={location}
									alt="Location"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{data.location.name}, {data.city.name}
								</span>
							</div>
							<div className={classes.flexWrapper}>
								<img
									src={tag}
									alt="Tag"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{TYPES[data.sale_type]}
								</span>
							</div>
						</div>
						<h5
							className={clsx(
								globalClasses.textCenter,
								classes.title
							)}
						>
							Rs. {(data.salePrice / 100000).toFixed(2)}L
						</h5>
						<div className={classes.flexParentWrapper}>
							<div className={classes.flexWrapper}>
								<img
									src={area}
									alt="Area"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{data.superBuiltupArea} sqft.
								</span>
							</div>
							<div className={classes.flexWrapper}>
								<img
									src={bed}
									alt="Bed"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{data.numberOfBedRooms}
								</span>
							</div>
							<div className={classes.flexWrapper}>
								<img
									src={tub}
									alt="Tub"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{renderToilets(data.toiletTypes)}
								</span>
							</div>
							<div className={classes.flexWrapper}>
								<img
									src={car}
									alt="Car"
									className={classes.img}
								/>
								<span className={classes.contentText}>1</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
