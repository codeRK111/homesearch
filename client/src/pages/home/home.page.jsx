import React from 'react';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
	const mobile = useMediaQuery('(max-width:600px)');

	const spacing = {
		p: mobile ? '1rem' : '2rem',
		mt: mobile ? '1rem' : '2rem',
	};
	const spacing3 = {
		p: mobile ? '0' : '3rem',
		mt: mobile ? '1rem' : '3rem',
	};
	return (
		<div>
			<Appbar />
			<SearchProperty />

			<Box {...spacing}>
				<Benifits />
			</Box>

			<Box {...spacing}>
				<Realestate />
			</Box>
			<Box mt="2rem">
				<Row title={'New Projects In Bhubaneswar'} />
			</Box>
			<Box {...spacing3}>
				<Heading title="Homesearch18 for builders" />
			</Box>
			<Box>
				<Enquiery />
			</Box>
			<Box {...spacing3}>
				<Heading title="What our client say ?" />
			</Box>
			<Box p={mobile ? '0 1rem' : '2rem'} mb="1rem">
				<Testimonial />
			</Box>
			<Search />
			<Footer />
		</div>
	);
};

export default HomePage;
