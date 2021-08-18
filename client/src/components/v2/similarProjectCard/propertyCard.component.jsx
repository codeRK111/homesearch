import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { capitalizeFirstLetter } from '../../../utils/render.utils';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../assets/icons/location.svg';
import tag from '../../../assets/icons/tag2.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './propertyCard.style';

const TYPES = {
	flat: 'Apartment',
	land: 'Land',
	independenthouse: 'Villa',
};

const PropertyCard = ({ data, showStatus = false }) => {
	const img = !data.thumbnailImage
		? city
		: `/assets/projects/${data.thumbnailImage}`;
	const classes = useStyles({ img });
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
								to={`/project-details/${data.id}`}
								className={classes.link}
								target="_blank"
							>
								{data.title}
							</Link>
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
									{TYPES[data.projectType]}
								</span>
							</div>
						</div>
						<h5
							className={clsx(
								globalClasses.textCenter,
								classes.title
							)}
						>
							{capitalizeFirstLetter(data.complitionStatus)}
						</h5>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
