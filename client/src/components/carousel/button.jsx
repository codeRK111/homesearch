import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import useStyles from './carousel.style';

const CarouselButton = ({ side = 'right', onClick = () => {} }) => {
	const style = useStyles();
	return (
		<div>
			<button className={style.scrollWrapper} onClick={onClick}>
				{side === 'left' ? (
					<ChevronLeftIcon style={{ fontSize: 40 }} />
				) : (
					<ChevronRightIcon style={{ fontSize: 40 }} />
				)}
			</button>
		</div>
	);
};

export default CarouselButton;
