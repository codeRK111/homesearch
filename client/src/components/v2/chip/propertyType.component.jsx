import { Box, Chip } from '@material-ui/core';

import ApartmentIcon from '@material-ui/icons/Apartment';
import DomainIcon from '@material-ui/icons/Domain';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LandscapeIcon from '@material-ui/icons/Landscape';
import React from 'react';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import useStyles from './chip.style';

const data = {
	flat: {
		label: 'Apartment',
		icon: <ApartmentIcon />,
	},
	independenthouse: {
		label: 'Villa',
		icon: <HomeWorkIcon />,
	},
	hostel: {
		label: 'Hostel',
		icon: <DomainIcon />,
	},
	pg: {
		label: 'PG',
		icon: <StoreMallDirectoryIcon />,
	},
	land: {
		label: 'Land',
		icon: <LandscapeIcon />,
	},
};

const PropertyTypeChip = ({ title }) => {
	const classes = useStyles();
	return (
		<Chip
			label={data[title].label}
			variant="outlined"
			size="small"
			color="primary"
			classes={{
				outlinedPrimary: classes.outlinedPrimary,
			}}
		/>
	);
};

export default PropertyTypeChip;
