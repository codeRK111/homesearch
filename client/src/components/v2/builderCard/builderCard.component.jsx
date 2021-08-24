import { Avatar, Box, Grid } from '@material-ui/core';

import React from 'react';
import city from '../../../assets/city.jpg';
import { logo } from '../../../utils/statc';
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
				<Grid container spacing={0}>
					<Grid item xs={4}>
						<Avatar
							// src={`/assets/builders/${data.logo}`}
							src={logo}
							alt="Builder Logo"
							style={{ height: 80, width: 80 }}
						/>
					</Grid>
					<Grid item xs={8}>
						<Box mt="1rem">
							<h4 className={classes.developerName}>
								{data.developerName}
							</h4>
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
									<span className={classes.value}>1</span>
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
								{/* {data.description} */}
								Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Libero consequuntur fugit
								optio corrupti quam dolor reiciendis illum, sed
								doloribus veniam? Pariatur nobis recusandae quam
								possimus deleniti maxime cum molestiae
								reiciendis?
							</p>
						</Box>
					</Grid>
				</Grid>
			</div>

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
