import 'react-image-lightbox/style.css';

import Lightbox from 'react-image-lightbox';
import React from 'react';

const ImageLightBox = ({
	images,
	open,
	handleClose,
	setPhotoIndex = (c) => {},
	photoIndex = 0,
}) => {
	return (
		<div>
			{open && (
				<Lightbox
					mainSrc={images[photoIndex]}
					// nextSrc={images[(photoIndex + 1) % images.length]}
					// prevSrc={
					// 	images[(photoIndex + images.length - 1) % images.length]
					// }
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

export default ImageLightBox;
