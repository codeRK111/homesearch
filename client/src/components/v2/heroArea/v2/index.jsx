import BottomLinkComponent from './buttom.component';
import { Box } from '@material-ui/core';
import CategoryComponent from './category.component';
import React from 'react';
import SearchComponent from './search.component';
import useStyles from './heroArea.style';

const HeroArea = ({
	initialLoading,

	topCities,
}) => {
	// Style
	const style = useStyles();

	return (
		<div className={style.wrapper}>
			<div className={style.center}>
				<CategoryComponent />
			</div>
			<div className={style.center}>
				<SearchComponent
					initialLoading={initialLoading}
					topCities={topCities}
				/>
			</div>
			<Box className={style.center} mt="2rem">
				<BottomLinkComponent />
			</Box>
		</div>
	);
};

export default HeroArea;
