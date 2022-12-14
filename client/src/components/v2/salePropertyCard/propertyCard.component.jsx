import { Box, Chip } from '@material-ui/core';
import { StaticPaths, renderToilets } from '../../../utils/render.utils';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { area } from '../../../utils/statc';
import bed from '../../../assets/icons/bed.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../assets/icons/location.svg';
import tag from '../../../assets/icons/tag2.svg';
import tub from '../../../assets/icons/tub.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

const TYPES = {
	flat: 'Apartment',
	land: 'Land',
	independenthouse: 'Villa',
};

const PropertyCard = ({ data, showStatus = false, variant = 'medium' }) => {
	const img = data.photos[0]
		? data.photos.find((c) => c.default)
			? StaticPaths.property(data.photos.find((c) => c.default).image)
			: StaticPaths.property(data.photos[0].image)
		: city;
	const classes = useStyles({ img, variant });
	const globalClasses = useGlobalStyles();

	const renderStatus = () => {
		switch (data.status) {
			case 'active':
				return (
					<Chip
						icon={<CheckCircleOutlineIcon />}
						label="Active"
						color="primary"
						variant="outlined"
					/>
				);
			case 'underScreening':
				return (
					<Chip
						icon={<VisibilityIcon />}
						label="Under screening"
						color="default"
						variant="outlined"
					/>
				);

			default:
				break;
		}
	};
	return (
		<>
			{!!data && (
				<div className={classes.wrapper}>
					<div className={classes.imageWrapper}>
						<div className={classes.overlay}>
							{data.feature && (
								<div className={classes.feature}>Feature</div>
							)}
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
								target="_blank"
							>
								{data.title}
							</Link>
						</h2>
						<Box className={classes.flexParentWrapper}>
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
						</Box>
						{showStatus ? (
							<Box
								mt="1rem"
								display="flex"
								justifyContent="center"
							>
								{renderStatus()}
							</Box>
						) : (
							<>
								<h5
									className={clsx(
										globalClasses.textCenter,
										classes.rent
									)}
								>
									Rs. {(data.salePrice / 100000).toFixed(2)} L
								</h5>
								<Box
									className={classes.flexParentWrapper}
									mt="0.5rem"
								>
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
										<span className={classes.contentText}>
											1
										</span>
									</div>
								</Box>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
