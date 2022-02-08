import { Avatar, Box, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import React from 'react';
import city from '../../../assets/city.jpg';
import { logo } from '../../../utils/statc';
import moment from 'dayjs';
import { shortLength } from '../../../utils/render.utils';
import useStyles from './builderCard.style';

const PropertyCard = ({ data }) => {
	let img = '';
	if (data.photos.length === 0) {
		img = city;
	} else {
		const primaryPhoto = data.photos.find((c) => c.primary);
		if (primaryPhoto) {
			img = `/assets/builders/${primaryPhoto.image}`;
		} else {
			const photo = data.photos.find((c) => c.image);
			img = photo ? `/assets/builders/${photo.image}` : city;
		}
	}

	const classes = useStyles({ img });
	const m = moment(data.operatingSince);
	const builderLogo = data.logo ? `/assets/builders/${data.logo}` : logo;
	return (
		<div className={classes.wrapper}>
			<div className={classes.featureWrapper}>
				{/* <div className={classes.feature}>Feature</div> */}
			</div>

			<div className={classes.logoWrapper}>
				<Grid container spacing={0}>
					<Grid item xs={4}>
						<Avatar
							// src={`/assets/builders/${data.logo}`}
							src={builderLogo}
							alt="Builder Logo"
							style={{ height: 80, width: 80 }}
						/>
					</Grid>
					<Grid item xs={8}>
						<Box mt="1rem">
							<Link
								className={classes.developerName}
								to={`/${data.slug}`}
							>
								{data.developerName}
							</Link>
							<Box className={classes.numbersWrapper} mt="1rem">
								<div>
									<span className={classes.value}>
										{m.format('YYYY')}
									</span>
									<span className={classes.text}>
										Year Estd
									</span>
								</div>
								<Box ml="1rem">
									<span className={classes.value}>
										{data.totalProjects}
									</span>
									<span className={classes.text}>
										Projects
									</span>
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box mt="1rem">
							<p className={classes.description}>
								{shortLength(data.description, 200)}
							</p>
						</Box>
					</Grid>
				</Grid>
			</div>

			<div>
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
		</div>
	);
};

export default PropertyCard;
