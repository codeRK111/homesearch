import { Box } from '@material-ui/core';
import React from 'react';
import city from '../../../assets/city.jpg';
import moment from 'moment';
import useStyles from './builderCard.style';

const PropertyCard = ({ data }) => {
	const classes = useStyles({ img: city });
	const m = moment(data.operatingSince);
	return (
		<div className={classes.wrapper}>
			<div className={classes.featureWrapper}>
				<div className={classes.feature}>Feature</div>
			</div>
			<div className={classes.logoWrapper}>
				<img src={`/assets/builders/${data.logo}`} alt="Logo" />
				<div>
					<h4>{data.developerName}</h4>
					<div className={classes.numbersWrapper}>
						<div>
							<span className={classes.value}>
								{m.format('YYYY')}
							</span>
							<span className={classes.text}>Year Estd</span>
						</div>
						<Box ml="1rem">
							<span className={classes.value}>1</span>
							<span className={classes.text}>Projects</span>
						</Box>
					</div>
				</div>
			</div>
			<p className={classes.description}>{data.description}</p>
			<div className={classes.imageWrapper}>
				<div className={classes.overlay}>
					<div className={classes.textWrapper}>
						<span>{data.developerName}</span>
						<span className={classes.smallText}>
							{data.officeAddress}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
