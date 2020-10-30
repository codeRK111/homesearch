import { Box } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import useStyles from './propertyImages.style';

const PropertyImages = () => {
	const classes = useStyles();
	const [selectedImage, setSelectedImage] = React.useState(1);
	const imageClick = (number) => (_) => setSelectedImage(number);
	return (
		<Box>
			<Box className={classes.mainImageWrapper}>
				<img
					src={require('../../assets/flat.jpeg')}
					alt="apartment"
					className={classes.image}
				/>
			</Box>
			<Box className={classes.otherImagesWrapper} mt="1rem">
				<Box
					className={clsx(classes.imageWrapper, {
						[classes.activeImage]: selectedImage === 1,
					})}
					onClick={imageClick(1)}
				>
					<Box className={classes.overlay}></Box>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="apartment"
						className={classes.image}
					/>
				</Box>
				<Box
					className={clsx(classes.imageWrapper, {
						[classes.activeImage]: selectedImage === 2,
					})}
					onClick={imageClick(2)}
				>
					<Box className={classes.overlay}></Box>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="apartment"
						className={classes.image}
					/>
				</Box>
				<Box
					className={clsx(classes.imageWrapper, {
						[classes.activeImage]: selectedImage === 3,
					})}
					onClick={imageClick(3)}
				>
					<Box className={classes.overlay}></Box>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="apartment"
						className={classes.image}
					/>
				</Box>
				<Box
					className={clsx(classes.imageWrapper, {
						[classes.activeImage]: selectedImage === 4,
					})}
					onClick={imageClick(4)}
				>
					<Box className={classes.overlay}></Box>
					<img
						src={require('../../assets/flat.jpeg')}
						alt="apartment"
						className={classes.image}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default PropertyImages;
