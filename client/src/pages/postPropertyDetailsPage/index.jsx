import { Box, Paper, Grid } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import Footer from '../../components/footer/footer.component';
import React from 'react';
import RentApartment from './rentApartment.page';
import RentHostel from './rentHostel.page';
import ResaleApartment from './resaleApartment.page';
import ResaleLand from './resaleLand.page';
import useStyles from './postPropertyDetails.styles';
import TimeLine from '../../components/timeLine/timeLine.component';

export const status = {
	basic: 'BASIC',
	image: 'IMAGE',
	package: 'PACKAGE',
	screening: 'SCREENING',
	live: 'LIVE',
};

const DetailsPage = ({ match: { params } }) => {
	const classes = useStyles();
	const propertyStatus = React.useState(status.basic);

	const filterTypes = (_) => {
		switch (params.pType) {
			case 'flat':
			case 'independenthouse':
				return (
					<ResaleApartment
						pType={params.pType}
						propertyStatus={propertyStatus}
					/>
				);
			case 'land':
				return <ResaleLand propertyStatus={propertyStatus} />;

			default:
				break;
		}
	};

	const filterRentTypes = (_) => {
		switch (params.pType) {
			case 'flat':
			case 'independenthouse':
				return (
					<RentApartment
						pType={params.pType}
						propertyStatus={propertyStatus}
					/>
				);
			case 'hostel':
			case 'pg':
				return (
					<RentHostel
						pType={params.pType}
						propertyStatus={propertyStatus}
					/>
				);

			default:
				break;
		}
	};

	const filterFor = (_) => {
		switch (params.pFor) {
			case 'sale':
				return filterTypes();
			case 'rent':
				return filterRentTypes();

			default:
				break;
		}
	};
	return (
		<Box>
			<AppBar />
			<Box mt="5rem" mb="5rem" p="1rem" className={classes.pageWrapper}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={3}>
						<Paper>
							<Box p="1rem">
								{' '}
								<TimeLine />
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={9}>
						<Paper>
							<Box p="1rem">{filterFor()}</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Footer />
		</Box>
	);
};

export default DetailsPage;
