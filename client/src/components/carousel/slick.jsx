import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React from 'react';
import Slider from 'react-slick';

const Carousel = ({ docs = [], Card }) => {
	// Style

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};
	return (
		<div>
			<Slider {...settings}>
				{docs.map((c) => (
					<div>
						<div
							key={c.id}
							style={{
								padding: '0.5rem',
								height: '100%',
								boxSizing: 'border-box',
							}}
						>
							<Card data={c} />
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Carousel;
