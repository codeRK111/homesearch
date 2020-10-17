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
import Realestate from '../../components/realestate/realestate.component';
import Search from '../../components/searches/searches.component';

const HomePage = () => {
	return (
		<div>
			<Appbar />
			<SearchProperty />

			<Box p="2rem" mt="2rem">
				<Benifits />
			</Box>

			<Box mt="2rem" p="2rem">
				<Realestate />
			</Box>
			<Box mt="2rem">
				<Row title={'New Projects In Bhubaneswar'} />
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
			<Search />
			<Footer />
		</div>
	);
};

export default HomePage;
