import { Box, Grid } from '@material-ui/core';

import Card from '../salePropertyCard/propertyCard.component';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '../chip/chip.component';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './saleProperties.style';

// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';







const RentProperties = ({ data }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [selected, setSelected] = React.useState(null);

	const onClick = (c) => {
		setSelected(c);
	};
	return (
		<div>
			{!!data && (
				<div className={classes.listWrapper}>
					{data.cities.map((c, i) => (
						<Box className={classes.chipWrapper}>
							<Chip
								title={c.name}
								key={c._id}
								onClick={() => onClick(c._id)}
								selected={!!selected && c._id === selected}
							/>
						</Box>
					))}
				</div>
			)}
			<Box mt="3rem">
				{!!data && (
					<div className={classes.propertiesWrapper}>
						<div className={classes.content}>
							<Grid container spacing={3}>
								{data.properties.map((c) => (
									<Grid item xs={12} md={4}>
										<Card key={c.id} data={c} />
									</Grid>
								))}
							</Grid>
						</div>
						{data.properties.length > 3 && (
							<div
								className={clsx(
									classes.scrollbarRight,
									gClasses.smHide
								)}
							>
								<div className={classes.scrollWrapper}>
									<ChevronRightIcon
										style={{ fontSize: 40 }}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</Box>
		</div>
	);
};

export default RentProperties;
