import React from 'react';
import area from '../../../assets/icons/area.svg';
import bed from '../../../assets/icons/bed.svg';
import car from '../../../assets/icons/car.svg';
import city from '../../../assets/city.jpg';
import clsx from 'clsx';
import location from '../../../assets/icons/location.svg';
import logo from '../../../assets/icons/bLogo.svg';
import tag from '../../../assets/icons/tag.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './builderCard.style';

const PropertyCard = () => {
	const classes = useStyles({ img: city });
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.featureWrapper}>
				<div className={classes.feature}>Feature</div>
			</div>
			<div className={classes.logoWrapper}>
				<img src={logo} alt="Logo" />
				<div>
					<h4>Grovis Housing Pvt.ltd.</h4>
					<div className={classes.numbersWrapper}>
						<div>
							<span className={classes.value}>2004</span>
							<span className={classes.text}>Year Estd</span>
						</div>
						<div>
							<span className={classes.value}>40</span>
							<span className={classes.text}>Projects</span>
						</div>
					</div>
				</div>
			</div>
			<p className={classes.description}>
				An ISO certified company, Grovis housing Pvt.Ltd. is a part of
				Grovis group of companies headquartered in Bangalore, Karnataka.
				The company is 18 years of old and with experience of more than
				40 projects in both residential and commercial sectors in
				various citirs across India.
			</p>
			<div className={classes.imageWrapper}>
				<div className={classes.overlay}>
					<div className={classes.textWrapper}>
						<span>Grovis Paladium</span>
						<span className={classes.smallText}>
							Idrapur, Ranchi
						</span>
						<span className={classes.smallText}>26.5 L -36.5L</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
