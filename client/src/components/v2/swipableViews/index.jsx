import { Box, Grid } from '@material-ui/core';

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
		<div>
			{console.log({ selected })}
			<SwipeableViews index={index}>
				{Array.from(Array(maxIndex + 1).keys()).map((c) => (
					<Box p="1rem">
						<Grid container spacing={3}>
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
														selected._id === c._id,
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
			{totalImages > 4 && (
				<>
					<button onClick={onPrevious}>Prev</button>
					<button onClick={onNext}>Next</button>
				</>
			)}
		</div>
	);
};

export default SwipableViews;
