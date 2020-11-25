import Appbar from '../../components/appBar/appBar.component';
import Benifits from '../../components/benifits/benifits.component';
import { Box } from '@material-ui/core';
import Enquiery from '../../components/builderEnquiery/builderEnquiery.component';
import Footer from '../../components/footer/footer.component';
import Heading from '../../components/heading/heading.component';
import React from 'react';
import Realestate from '../../components/realestate/realestate.component';
import Row from '../../components/row/row.component';
import Search from '../../components/searches/searches.component';
import SearchProperty from '../../components/searchProperty/searchProperty.component';
import Testimonial from '../../components/testimonial/testimonial.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { selectDefaultCity } from '../../redux/city/city.selectors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// External components















const HomePage = ({ defaultCity }) => {
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

			<Box>
				<Realestate />
			</Box>
			<Box mt="2rem">
				<Row title={`Hot Projects In ${defaultCity.name}`} />
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

const mapStateToProps = createStructuredSelector({
	defaultCity: selectDefaultCity,
});

export default connect(mapStateToProps)(HomePage);
