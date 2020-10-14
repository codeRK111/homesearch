import React from 'react';
import { Box } from '@material-ui/core';

// External components
import Appbar from '../../components/appBar/appBar.component';
import SearchProperty from '../../components/searchProperty/searchProperty.component';
import Heading from '../../components/heading/heading.component';
import Benifits from '../../components/benifits/benifits.component';
import Row from '../../components/row/row.component';

const HomePage = () => {
	return (
		<div>
			<Appbar />
			<Box mb="3rem">
				<SearchProperty />
			</Box>
			<Heading title="Why choose homesearch18" />
			<Box mt="3rem" mb="3rem" p="2rem">
				<Benifits />
			</Box>
			<Heading title="Property Collections" />
			<Box mt="2rem" p="2rem">
				<Row title="Properties for rent" />
				<Box mt="1rem">
					<Row title="Properties for sale" />
				</Box>
			</Box>
		</div>
	);
};

export default HomePage;
