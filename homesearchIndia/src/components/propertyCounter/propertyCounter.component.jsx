import { Avatar, Box } from '@material-ui/core';

import { Link } from 'react-router-dom';
import React from 'react';
import useStyles from './propertyCounter.styles';

// Styles

const PropertyCounter = ({ details, pFor, city }) => {
	const classes = useStyles();

	const imageSrc = (name) => {
		const apartment = require('../../assets/apartment.png');
		const iHouse = require('../../assets/house.jfif');
		const land = require('../../assets/land.jfif');
		const gHouse = require('../../assets/guest-house.jfif');
		const hostel = require('../../assets/hostel.jfif');
		const pg = require('../../assets/pg.png');

		switch (name) {
			case 'Apartment':
				return apartment;
			case 'Independent House':
				return iHouse;
			case 'Land':
				return land;
			case 'Guest House':
				return gHouse;
			case 'Hostel':
				return hostel;
			case 'PG':
				return pg;

			default:
				break;
		}
	};
	return (
		<Box display="flex" width="100%">
			{details.map((c, i) => (
				<Box
					key={i}
					display="flex"
					alignItems="center"
					width="100%"
					justifyContent="space-between"
					flexDirection="column"
				>
					<Avatar className={classes.avatar}>
						<img
							src={imageSrc(c.label)}
							alt="property"
							className={classes.image}
						/>
					</Avatar>
					<Box
						mt="0.5rem"
						mb="0.5rem"
						display="flex"
						justifyContent="center"
					>
						<b className={classes.label}>{c.label}</b>
					</Box>
					<Box className={classes.numberWrapper}>
						<span className={classes.number}>
							<b>{c.value}</b>
						</span>{' '}
						properties
					</Box>
					<Box>
						{c.value ? (
							<Link
								className={classes.link}
								to={`/browse?f=${pFor}&c=${
									city.id
								}&cn=${encodeURIComponent(city.name)}&t=${
									c.type
								}&p=1`}
								target="_blank"
							>
								View all &#8594;
							</Link>
						) : (
							''
						)}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default PropertyCounter;
