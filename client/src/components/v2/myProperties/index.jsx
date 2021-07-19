import { Box, Grid, Typography } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Filter from '../propertyStatusFilter';
import React from 'react';
import RentApartment from '../../../components/v2/propertyCard/rent/flat.component';
import RentHostel from '../../../components/v2/propertyCard/rent/hostel.component';
import SaleApartment from '../../../components/v2/salePropertyCard/propertyCard.component';
import SaleLand from '../../../components/v2/salePropertyCard/propertyCardLand.component';
import SwipeableViews from 'react-swipeable-views';
import { apiUrl } from '../../../utils/render.utils';
import axios from 'axios';
import useStyles from './swipable.style';

const SimilarProperties = ({ title }) => {
	const [index, setIndex] = React.useState(0);
	const [filter, setFilter] = React.useState('all');
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		data: [],
		error: null,
	});
	const [showData, setShowData] = React.useState([]);
	let cancelToken = React.useRef();
	const classes = useStyles();
	const totalImages = showData.length;
	const imagePerSlide = 4;
	const maxIndex = Math.ceil(totalImages / imagePerSlide) - 1;

	React.useEffect(() => {
		if (filter !== 'all') {
			const tempData = asyncState.data.filter((c) => c.status === filter);
			setShowData(tempData);
		} else {
			setShowData(asyncState.data);
		}
	}, [filter]);

	const renderTypeRent = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <RentApartment data={property} showStatus={true} />;
			case 'hostel':
			case 'pg':
				return <RentHostel data={property} showStatus={true} />;

			default:
				break;
		}
	};
	const renderTypeSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
			case 'independenthouse':
				return <SaleApartment data={property} showStatus={true} />;
			case 'land':
				return <SaleLand data={property} showStatus={true} />;

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
				const token = localStorage.getItem('JWT_CLIENT');
				const {
					data: {
						data: { properties },
					},
				} = await axios.get(
					apiUrl('/property/user/my-properties/all', 2),
					{
						cancelToken: cancelToken.current.token,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setAsyncState({
					loading: false,
					data: properties,
					error: null,
				});
				setShowData(properties);
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
	}, []);

	const onNext = () => {
		if (index === maxIndex) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	};
	const onPrevious = () => {
		if (index === 0) {
			setIndex(maxIndex);
		} else {
			setIndex(index - 1);
		}
	};

	return (
		<>
			<Box p="1rem">
				<Grid container spacing={0} justify="space-between">
					<Grid item>
						<h2>{title}</h2>
					</Grid>
					<Grid item>
						<Filter value={filter} setValue={setFilter} />
					</Grid>
				</Grid>
			</Box>
			<div className={classes.sliderWrapper}>
				{index > 0 && totalImages > 4 && (
					<div className={classes.scrollbar} onClick={onPrevious}>
						<div className={classes.scrollWrapper}>
							<ChevronLeftIcon style={{ fontSize: 40 }} />
						</div>
					</div>
				)}

				<Box style={{ flex: 1 }}>
					<SwipeableViews index={index}>
						{showData.length === 0 ? (
							<Typography align="center">
								No Property Found
							</Typography>
						) : (
							Array.from(Array(maxIndex + 1).keys()).map((c) => (
								<Box p="1rem">
									<Grid container spacing={3}>
										{showData.map((c, i) => {
											const fromImageIndex =
												index === 0
													? 0
													: index *
													  (imagePerSlide -
															1 +
															index);
											const tillImageIndex =
												fromImageIndex +
												(imagePerSlide - 1);
											if (
												i >= fromImageIndex &&
												i <= tillImageIndex
											) {
												return (
													<Grid
														item
														key={i}
														md={12 / imagePerSlide}
													>
														{renderFor(c)}
													</Grid>
												);
											}
										})}
									</Grid>
								</Box>
							))
						)}
					</SwipeableViews>
				</Box>
				{index < maxIndex && totalImages > 4 && (
					<div className={classes.scrollbarRight} onClick={onNext}>
						<div className={classes.scrollWrapper}>
							<ChevronRightIcon style={{ fontSize: 40 }} />
						</div>
					</div>
				)}

				{/*{totalImages > 4 && (*/}
				{/*	<>*/}
				{/*		<button >Prev</button>*/}
				{/*		<button >Next</button>*/}
				{/*	</>*/}
				{/*)}*/}
			</div>
		</>
	);
};

export default SimilarProperties;
