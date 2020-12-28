import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';

import AirportIcon from '@material-ui/icons/Flight';
import BusIcon from '@material-ui/icons/DirectionsBus';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import PropTypes from 'prop-types';
import RailwayIcon from '@material-ui/icons/Tram';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import useStyles from './detailsPage.styles';

const NearBy = ({ property }) => {
	const classes = useStyles();
	const distance = [];
	if (property.distanceSchool) {
		distance.push({
			label: 'School',
			distance: property.distanceSchool,
			icon: <SchoolIcon />,
		});
	}
	if (property.distanceRailwayStation) {
		distance.push({
			label: 'Railway Station',
			distance: property.distanceRailwayStation,
			icon: <RailwayIcon />,
		});
	}
	if (property.distanceAirport) {
		distance.push({
			label: 'Airport',
			distance: property.distanceAirport,
			icon: <AirportIcon />,
		});
	}
	if (property.distanceBusStop) {
		distance.push({
			label: 'Bus stop',
			distance: property.distanceBusStop,
			icon: <BusIcon />,
		});
	}
	if (property.distanceHospital) {
		distance.push({
			label: 'Hospital',
			distance: property.distanceHospital,
			icon: <HospitalIcon />,
		});
	}
	return (
		<Box p="1rem">
			<Box
				display="flex"
				width="100%"
				alignItems="center"
				mb="1rem"
				mt="1rem"
			>
				<Box pl="0.3rem" pr="0.3rem">
					<h4 className={classes.title}>Near by places</h4>
				</Box>
				<Box flexGrow={1}>
					<Divider />
				</Box>
			</Box>
			<Box>
				{distance.map((c, i) => (
					<List
						key={i}
						classes={{
							root: classes.list,
						}}
					>
						<ListItem
							classes={{
								root: classes.listItem,
							}}
						>
							<ListItemAvatar>
								<Avatar>{c.icon}</Avatar>
							</ListItemAvatar>
							<ListItemText primary={c.label} />
							<ListItemSecondaryAction>
								<b>{c.distance} KM</b>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				))}
			</Box>
		</Box>
	);
};

NearBy.propTypes = {
	property: PropTypes.object.isRequired,
};

export default NearBy;
