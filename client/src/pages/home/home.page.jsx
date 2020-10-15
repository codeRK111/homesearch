import React from 'react';
import { Box } from '@material-ui/core';

// External components
import Appbar from '../../components/appBar/appBar.component';
import SearchProperty from '../../components/searchProperty/searchProperty.component';
import Heading from '../../components/heading/heading.component';
import Benifits from '../../components/benifits/benifits.component';
import Row from '../../components/row/row.component';
import Enquiery from '../../components/builderEnquiery/builderEnquiery.component';
import Testimonial from '../../components/testimonial/testimonial.component';
import Footer from '../../components/footer/footer.component';

const HomePage = () => {
	return (
		<div>
			<Appbar />
			<SearchProperty />
			<Box mt="3rem" mb="3rem">
				<Heading title="Why choose homesearch18" />
			</Box>
			<Box p="2rem">
				<Benifits />
			</Box>
			<Box mt="3rem">
				<Heading title="Property Collections" />
			</Box>
			<Box mt="2rem" p="2rem">
				<Row title="Properties for rent" />
				<Box mt="1rem">
					<Row title="Properties for sale" />
				</Box>
			</Box>
			<Box mt="3rem" mb="3rem">
				<Heading title="Homesearch18 for builders" />
			</Box>
			<Box>
				<Enquiery />
			</Box>
			<Box mt="3rem" mb="3rem">
				<Heading title="What our client say ?" />
			</Box>
			<Box p="2rem" mb="1rem">
				<Testimonial />
			</Box>
			<Footer />
		</div>
	);
};

export default HomePage;
