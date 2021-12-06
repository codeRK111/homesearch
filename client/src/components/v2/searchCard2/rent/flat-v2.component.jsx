import '../extra.css';

import React from 'react';
import city from '../../../../assets/city.jpg';
import clsx from 'clsx';
import moment from 'dayjs';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../searchCard-v2.style';

const PropertyCard = ({ property, edit = false }) => {
	const m = moment(property.createdAt);
	const img = property.photos[0]
		? property.photos.find((c) => c.default)
			? `/assets/properties/${
					property.photos.find((c) => c.default).image
			  }`
			: `/assets/properties/${property.photos[0].image}`
		: city;
	const classes = useStyles({ img });
	const globalClasses = useGlobalStyles({ img: city });

	const onClick = () => {
		const url = `/v2/property-details/${property.id}`;
		var win = window.open(url, '_blank');
		win.focus();
	};
	return (
		<div
			className={clsx(classes.wrapper, globalClasses.pointer)}
			onClick={onClick}
		>
			{/* <pre>{JSON.stringify(property, null, 2)}</pre> */}
			<span>Design under progress</span>
		</div>
	);
};

export default PropertyCard;
