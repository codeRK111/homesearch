import { Box, Paper } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import Footer from '../../components/footer/footer.component';
import React from 'react';
import RentApartment from './rentApartment.page';
import RentHostel from './rentHostel.page';
import ResaleApartment from './resaleApartment.page';
import ResaleLand from './resaleLand.page';
import useStyles from './postPropertyDetails.styles';

const DetailsPage = ({ match: { params } }) => {
	const classes = useStyles();
	console.log(params);

	const filterTypes = (_) => {
		switch (params.pType) {
			case 'flat':
			case 'independenthouse':
				return <ResaleApartment pType={params.pType} />;
			case 'land':
				return <ResaleLand />;

			default:
				break;
		}
	};

	const filterRentTypes = (_) => {
		switch (params.pType) {
			case 'flat':
			case 'independenthouse':
				return <RentApartment pType={params.pType} />;
			case 'hostel':
			case 'pg':
				return <RentHostel pType={params.pType} />;

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
			<Box
				mt="5rem"
				mb="5rem"
				width="100%"
				display="flex"
				justifyContent="center"
			>
				<Paper className={classes.wrapper}>{filterFor()}</Paper>
			</Box>
			<Footer />
		</Box>
	);
};

export default DetailsPage;
