import { StaticPaths, renderToilets } from '../../../utils/render.utils';
import { area, bed, car, location2, tag, tub } from '../../../utils/statc';

import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

const TYPES = {
	flat: 'Apartment',
	land: 'Land',
	independenthouse: 'Villa',
};

const PropertyCard = ({ data }) => {
	const img = data.photos[0]
		? data.photos.find((c) => c.default)
			? StaticPaths.property(data.photos.find((c) => c.default).image)
			: StaticPaths.property(data.photos[0].image)
		: city;
	const classes = useStyles({ img });
	const globalClasses = useGlobalStyles();
	return (
		<>
			{!!data && (
				<div className={classes.wrapper}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							{/* <div className={classes.feature}>Feature</div> */}
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
							<Link
								to={`/v2/property-details/${data.id}`}
								className={classes.link}
							>
								{data.title}
							</Link>
						</h2>
						<div className={classes.flexParentWrapper}>
							<div className={classes.flexWrapper}>
								<img
									src={location2}
									alt="Location"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{data.location.name}, {data.city.name}
								</span>
							</div>
							<Box className={classes.flexWrapper} mt="0.5rem">
								<img
									src={tag}
									alt="Tag"
									className={classes.img}
								/>
								<span className={classes.contentText}>
									{TYPES[data.type]}
								</span>
							</Box>
						</div>
						<h5
							className={clsx(
								globalClasses.textCenter,
								classes.rent
							)}
						>
							Rs. {data.rent / 1000}K/Month
						</h5>
						<Box className={classes.flexParentWrapper} mt="0.5rem">
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
						</Box>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
