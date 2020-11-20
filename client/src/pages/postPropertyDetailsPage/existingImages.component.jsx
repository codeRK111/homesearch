import { Box, Grid } from '@material-ui/core';

import React from 'react';
import useStyles from './postPropertyDetails.styles';

const ExistingImages = ({ property }) => {
	const classes = useStyles();
	return (
		<>
			<Grid item xs={12} lg={3}>
				<Box className={classes.imageWrapper}>
					<img
						src={
							property.image1
								? `/assets/properties/${property.image1}`
								: require('../../assets/no-image.jpg')
						}
						alt="project"
						srcset=""
						className={classes.image}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} lg={3}>
				<Box className={classes.imageWrapper}>
					<img
						src={
							property.image2
								? `/assets/properties/${property.image2}`
								: require('../../assets/no-image.jpg')
						}
						alt="project"
						srcset=""
						className={classes.image}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} lg={3}>
				<Box className={classes.imageWrapper}>
					<img
						src={
							property.image3
								? `/assets/properties/${property.image3}`
								: require('../../assets/no-image.jpg')
						}
						alt="project"
						srcset=""
						className={classes.image}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} lg={3}>
				<Box className={classes.imageWrapper}>
					<img
						src={
							property.image4
								? `/assets/properties/${property.image4}`
								: require('../../assets/no-image.jpg')
						}
						alt="project"
						srcset=""
						className={classes.image}
					/>
				</Box>
			</Grid>
		</>
	);
};

export default ExistingImages;
