import { Box, Chip } from '@material-ui/core';
import { area, location2, tag } from '../../../utils/statc';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

// import bed from '../../../assets/icons/bed.svg';
// import car from '../../../assets/icons/car.svg';

// import { renderToilets } from '../../../utils/render.utils';

// import tub from '../../../assets/icons/tub.svg';

const TYPES = {
	flat: 'Apartment',
	land: 'Land',
	independenthouse: 'Villa',
};

const PropertyCard = ({ data, showStatus = false }) => {
	const classes = useStyles({ img: city });
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
							<Link
								to={`/v2/property-details/${data.id}`}
								className={classes.link}
								target="_blank"
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
											{data.plotArea} sqft.
										</span>
									</div>
									<div className={classes.flexWrapper}>
										<img
											src={area}
											alt="Area"
											className={classes.img}
										/>
										<span className={classes.contentText}>
											{data.length} sqft.
										</span>
									</div>
									<div className={classes.flexWrapper}>
										<img
											src={area}
											alt="Area"
											className={classes.img}
										/>
										<span className={classes.contentText}>
											{data.width} sqft.
										</span>
									</div>
									<div className={classes.flexWrapper}>
										<img
											src={area}
											alt="Area"
											className={classes.img}
										/>
										<span className={classes.contentText}>
											{data.plotFrontage} sqft.
										</span>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
