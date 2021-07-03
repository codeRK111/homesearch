import { Box, Grid } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import clsx from 'clsx';
import useStyles from './swipable.style';

const SwipableViews = ({ photos, selected, setSelected }) => {
	const [index, setIndex] = React.useState(0);
	const classes = useStyles();
	const totalImages = photos.length;
	const imagePerSlide = 4;
	const maxIndex = Math.ceil(totalImages / imagePerSlide) - 1;

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

	const onClick = (image) => () => {
		setSelected(image);
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
			<Box style={{ flex: 1, width: '100%' }}>
				<SwipeableViews index={index}>
					{Array.from(Array(maxIndex + 1).keys()).map((c) => (
						<Box p="1rem">
							<Grid container spacing={0}>
								{photos.map((c, i) => {
									const fromImageIndex =
										index === 0 ? 0 : index * 3 + index;
									const tillImageIndex = fromImageIndex + 3;
									if (
										i >= fromImageIndex &&
										i <= tillImageIndex
									) {
										return (
											<Grid
												item
												key={i}
												md={3}
												style={{ height: 100 }}
												className={clsx(
													classes.gridWrapper,
													{
														[classes.selected]:
															selected._id ===
															c._id,
													}
												)}
												onClick={onClick(c)}
											>
												<img
													src={`/assets/properties/${c.image}`}
													alt=""
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover',
														overflow: 'hidden',
													}}
												/>
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
		</div>
	);
};

export default SwipableViews;
