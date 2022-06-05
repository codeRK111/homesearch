import 'react-multi-carousel/lib/styles.css';

import Carousel from 'react-multi-carousel';
import React from 'react';

const Slick = ({ docs = [], Card, deviceType }) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 1, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	return (
		<Carousel
			swipeable={true}
			draggable={false}
			showDots={false}
			responsive={responsive}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			keyBoardControl={true}
			transitionDuration={500}
			containerClass="carousel-container"
			removeArrowOnDeviceType={['tablet', 'mobile']}
			deviceType={deviceType}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
		>
			{docs.map((c, i) => (
				<div>
					<div
						key={c.id}
						style={{
							padding: '1.1rem',
							boxSizing: 'border-box',
							height: 500,
						}}
					>
						<Card data={c} />
					</div>
				</div>
			))}
		</Carousel>
	);
};

export default Slick;
