import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React from 'react';
import RentApartment from '../../../components/v2/propertyCard/rent/flat.component';
import RentHostel from '../../../components/v2/propertyCard/rent/hostel.component';
import SaleApartment from '../../../components/v2/salePropertyCard/propertyCard.component';
import SaleLand from '../../../components/v2/salePropertyCard/propertyCardLand.component';
import Slider from 'react-slick';
import axios from 'axios';

const SimilarProperties = ({
	photos,
	selected,
	setSelected,
	pFor,
	city,
	location,
	type,
	excludeId = null,
}) => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
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
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		data: [],
		error: null,
	});
	let cancelToken = React.useRef();

	const renderTypeRent = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <RentApartment data={property} variant="small" />;
			case 'hostel':
			case 'pg':
				return <RentHostel data={property} />;

			default:
				break;
		}
	};
	const renderTypeSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
			case 'independenthouse':
				return <SaleApartment data={property} />;
			case 'land':
				return <SaleLand data={property} />;

			default:
				break;
		}
	};
	const renderFor = (property) => {
		switch (property.for) {
			case 'rent':
				return renderTypeRent(property);
			case 'sale':
				return renderTypeSale(property);

			default:
				break;
		}
	};

	React.useEffect(() => {
		(async () => {
			try {
				setAsyncState({
					loading: true,
					data: [],
					error: null,
				});
				cancelToken.current = axios.CancelToken.source();
				const {
					data: {
						data: { properties },
					},
				} = await axios.post(
					'/api/v1/properties/searchProperties',
					{
						for: pFor,
						city,
						page: 1,
						type: [type],
						locations: [location],
						limit: 100,
					},
					{
						cancelToken: cancelToken.current.token,
					}
				);
				setAsyncState({
					loading: false,
					data: properties,
					error: null,
				});
			} catch (error) {
				let message = '';
				if (!!error.response) {
					message = error.response.data.message;
				} else {
					message = error.message;
				}
				setAsyncState({
					loading: false,
					data: [],
					error: message,
				});
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{asyncState.data.length && (
				<Slider {...settings}>
					{asyncState.data
						.filter((b) => (excludeId ? excludeId !== b.id : true))
						.map((c, i) => (
							<div>
								<div
									key={c.id}
									style={{
										padding: '1.5rem',
										height: '530px',
										boxSizing: 'border-box',
									}}
								>
									{renderFor(c)}
								</div>
							</div>
						))}
				</Slider>
			)}
		</>
	);
};

export default SimilarProperties;
