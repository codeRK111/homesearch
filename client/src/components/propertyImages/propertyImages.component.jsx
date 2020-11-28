import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import clsx from 'clsx';
import useStyles from './propertyImages.style';

const PropertyImages = ({ photos }) => {
	const classes = useStyles();
	const [selectedImage, setSelectedImage] = React.useState(1);
	const [images, setImages] = React.useState({
		mainImage: null,
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	React.useEffect(() => {
		if (photos.length > 0) {
			if (photos[0]) {
				setImages((prevState) => ({
					...prevState,
					mainImage: photos[0],
					image1: photos[0],
				}));
			}
			if (photos[1]) {
				setImages((prevState) => ({
					...prevState,
					image2: photos[1],
				}));
			}
			if (photos[2]) {
				setImages((prevState) => ({
					...prevState,
					image3: photos[2],
				}));
			}
			if (photos[3]) {
				setImages((prevState) => ({
					...prevState,
					image4: photos[3],
				}));
			}
		}
	}, [photos]);
	const imageClick = (number, img) => (_) => {
		setSelectedImage(number);
		setImages((prevState) => ({
			...prevState,
			mainImage: img,
		}));
	};
	return (
		<Box>
			<Box className={classes.mainImageWrapper}>
				<ReactImageMagnify
					enlargedImageContainerStyle={{
						zIndex: 1000,
					}}
					{...{
						smallImage: {
							alt: 'Wristwatch by Ted Baker London',
							isFluidWidth: true,
							src: images.mainImage
								? `/assets/properties/${images.mainImage}`
								: require('../../assets/no-image.jpg'),
						},
						largeImage: {
							src: images.mainImage
								? `/assets/properties/${images.mainImage}`
								: require('../../assets/no-image.jpg'),
							width: 1200,
							height: 1800,
						},
					}}
				/>
				{/* <img
					src={
						images.mainImage
							? `/assets/properties/${images.mainImage}`
							: require('../../assets/no-image.jpg')
					}
					alt="apartment"
					className={classes.image}
				/> */}
			</Box>
			<Box className={classes.otherImagesWrapper} mt="1rem">
				{images.image1 && (
					<Box
						className={clsx(classes.imageWrapper, {
							[classes.activeImage]: selectedImage === 1,
						})}
						onClick={imageClick(1, images.image1)}
					>
						<Box className={classes.overlay}></Box>
						<img
							src={`/assets/properties/${images.image1}`}
							alt="apartment"
							className={classes.image}
						/>
					</Box>
				)}

				{images.image2 && (
					<Box
						className={clsx(classes.imageWrapper, {
							[classes.activeImage]: selectedImage === 2,
						})}
						onClick={imageClick(2, images.image2)}
					>
						<Box className={classes.overlay}></Box>
						<img
							src={`/assets/properties/${images.image2}`}
							alt="apartment"
							className={classes.image}
						/>
					</Box>
				)}

				{images.image3 && (
					<Box
						className={clsx(classes.imageWrapper, {
							[classes.activeImage]: selectedImage === 3,
						})}
						onClick={imageClick(3, images.image3)}
					>
						<Box className={classes.overlay}></Box>
						<img
							src={`/assets/properties/${images.image3}`}
							alt="apartment"
							className={classes.image}
						/>
					</Box>
				)}

				{images.image4 && (
					<Box
						className={clsx(classes.imageWrapper, {
							[classes.activeImage]: selectedImage === 4,
						})}
						onClick={imageClick(4, images.image4)}
					>
						<Box className={classes.overlay}></Box>
						<img
							src={`/assets/properties/${images.image4}`}
							alt="apartment"
							className={classes.image}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

PropertyImages.propTypes = {
	photos: PropTypes.array.isRequired,
};

export default PropertyImages;
