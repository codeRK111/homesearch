import React, { useEffect, useState } from 'react';

import CarouselButton from './button';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './carousel.style';
import { useTheme } from '@material-ui/core/styles';

const Carousel = ({ defaultSlide = 4, docs = [], Card }) => {
	// Style
	const style = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const [page, setPage] = useState(0);
	const [cardPerSlide, setCardPerSlide] = useState(defaultSlide);
	const [numberOfSlides, setNumberOfSlides] = useState(
		Math.ceil(docs.length / cardPerSlide)
	);

	useEffect(() => {
		if (!matches) {
			setCardPerSlide(1);
			setNumberOfSlides(Math.ceil(docs.length / cardPerSlide));
		} else {
			setCardPerSlide(defaultSlide);
			setNumberOfSlides(Math.ceil(docs.length / cardPerSlide));
		}
	}, [matches, docs]);
	useEffect(() => {
		setNumberOfSlides(Math.ceil(docs.length / cardPerSlide));
	}, [cardPerSlide, docs]);

	return (
		<div className={style.wrapper}>
			{/* <pre>{JSON.stringify(docs, null, 2)}</pre> */}
			{matches && page > 0 && (
				<CarouselButton
					side="left"
					onClick={() => {
						if (page > 0) {
							setPage(page - 1);
						}
					}}
				/>
			)}
			<div className={style.cardArea}>
				<SwipeableViews
					index={page}
					onChangeIndex={setPage}
					enableMouseEvents
				>
					{Array.from(Array(numberOfSlides), (_, x) => x).map((c) => (
						<div
							key={c}
							style={{
								boxSizing: 'border-box',
								padding: '1rem',
								overflow: 'hidden',
							}}
						>
							<Grid container spacing={5}>
								{docs
									.filter(
										(b, i) =>
											i >= c * cardPerSlide &&
											i < c * cardPerSlide + cardPerSlide
									)
									.map((d, i) => (
										<Grid
											item
											xs={12 / cardPerSlide}
											key={d.id}
										>
											<Card key={d.id} data={d} />
											{/* <h1>{i}</h1> */}
											{/* <p>{d.id}</p>
											<p>{numberOfSlides}</p>
											<p>{page}</p> */}
										</Grid>
									))}
							</Grid>
						</div>
					))}
				</SwipeableViews>
			</div>
			{matches && numberOfSlides > 1 && numberOfSlides - 1 > page && (
				<CarouselButton
					onClick={() => {
						if (page < numberOfSlides - 1) {
							setPage(page + 1);
						}
					}}
				/>
			)}
		</div>
	);
};

export default Carousel;
