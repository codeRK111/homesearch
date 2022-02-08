import 'react-image-lightbox/style.css';

import React, { useEffect, useState } from 'react';
import {
	capitalizeFirstLetter,
	getHostName,
} from '../../../utils/render.utils';

import Lightbox from 'react-image-lightbox';

const ImageLightBoxCarousel = ({
	photos,
	open,
	handleClose,
	title = capitalizeFirstLetter(getHostName()),
	index = 0,
}) => {
	const [images, setImages] = useState([]);
	const [photoIndex, setPhotoIndex] = useState(0);

	useEffect(() => {
		setImages(photos);
		setPhotoIndex(index);
	}, [photos, index]);
	return (
		<div>
			{open && (
				<Lightbox
					imageTitle={title}
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={
						images[(photoIndex + images.length - 1) % images.length]
					}
					onCloseRequest={handleClose}
					onMovePrevRequest={() =>
						setPhotoIndex(
							(photoIndex + images.length - 1) % images.length
						)
					}
					onMoveNextRequest={() =>
						setPhotoIndex(
							(photoIndex + images.length + 1) % images.length
						)
					}
				/>
			)}
		</div>
	);
};

export default ImageLightBoxCarousel;
