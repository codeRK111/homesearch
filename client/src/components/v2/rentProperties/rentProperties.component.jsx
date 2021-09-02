import { Box, Grid } from '@material-ui/core';

import Card from '../propertyCard/propertyCard.component';
import Carousel from '../../carousel';
import Chip from '../chip/chip.component';
import React from 'react';
import useGlobalStyles from '../../../common.style';
import useStyles from './rentProperties.style';

const RentProperties = ({ data }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [selected, setSelected] = React.useState(null);
	console.log({ data });

	const onClick = (c) => {
		setSelected(c);
	};
	return (
		<div>
			{!!data && (
				<div className={classes.listWrapper}>
					<Grid container spacing={1}>
						{data.cities.map((c, i) => (
							<Grid item xs={4} md={1}>
								<Chip
									title={c.name}
									key={c._id}
									onClick={() => onClick(c._id)}
									selected={!!selected && c._id === selected}
								/>
							</Grid>
						))}
					</Grid>
					{/* {data.cities.map((c, i) => (
						<Box className={classes.chipWrapper}>
							<Chip
								title={c.name}
								key={c._id}
								onClick={() => onClick(c._id)}
								selected={!!selected && c._id === selected}
							/>
						</Box>
					))} */}
				</div>
			)}
			<Box mt="3rem">
				{!!data && (
					<Carousel
						docs={data.properties}
						Card={Card}
						defaultSlide={4}
					/>
				)}
			</Box>
		</div>
	);
};

export default RentProperties;
