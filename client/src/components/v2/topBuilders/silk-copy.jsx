import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React from 'react';
import Slider from 'react-slick';

const CustomSlider = ({ docs = [], Card }) => {
	const [state, setState] = React.useState([]);

	React.useEffect(() => {
		if (docs && docs.length > 0) {
			console.log({ docs });

			setState(docs);
		}
	}, [docs]);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
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
			{docs.length && (
				<Slider {...settings}>
					{docs.map((c, i) => (
						<div>
							<div
								key={c.id}
								style={{
									padding: '1rem',
									height: '550px',
									boxSizing: 'border-box',
								}}
							>
								<Card data={c} />
							</div>
						</div>
					))}
				</Slider>
			)}
		</div>
	);
};

export default CustomSlider;
