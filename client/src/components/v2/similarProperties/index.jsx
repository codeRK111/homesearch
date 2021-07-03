import { Box, Grid } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import RentApartment from '../../../components/v2/propertyCard/rent/flat.component';
import RentHostel from '../../../components/v2/propertyCard/rent/hostel.component';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import clsx from 'clsx';
import useStyles from './swipable.style';

const SimilarProperties = ({
	photos,
	selected,
	setSelected,
	pFor,
	city,
	location,
	type,
}) => {
	const [index, setIndex] = React.useState(0);
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		data: [],
		error: null,
	});
	let cancelToken = React.useRef();
	const classes = useStyles();
	const totalImages = asyncState.data.length;
	const imagePerSlide = 4;
	const maxIndex = Math.ceil(totalImages / imagePerSlide) - 1;

	const renderTypeRent = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <RentApartment data={property} />;
			case 'hostel':
			case 'pg':
				return <RentHostel data={property} />;

			default:
				break;
		}
	};
	const renderFor = (property) => {
		switch (property.for) {
			case 'rent':
				return renderTypeRent(property);
			case 'sale':
				return 'sale';

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
					{Array.from(Array(maxIndex + 1).keys()).map((c) => (
						<Box p="1rem">
							<Grid container spacing={3}>
								{asyncState.data.map((c, i) => {
									const fromImageIndex =
										index === 0
											? 0
											: index * (imagePerSlide - 1) +
											  index;
									const tillImageIndex =
										fromImageIndex + (imagePerSlide - 1);
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
					))}
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
	);
};

export default SimilarProperties;
