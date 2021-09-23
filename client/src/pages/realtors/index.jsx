import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import Nav from '../../components/v2/pageNav/nav.component';
import RealtorCard from './card';
import SearchComponent from '../../components/v2/searchCity';

const arr = Array.from({ length: 12 }, (_, i) => i++);

const RealtorsPage = () => {
	const [selectedCity, setSelectedCity] = useState({
		id: null,
		name: null,
	});
	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				<Container>
					<Typography variant="h5">Find Realtors</Typography>
					<SearchComponent
						selectedCity={selectedCity}
						setSelectedCity={setSelectedCity}
						placeholder="Search By City Name"
					/>
					<Box mt="1rem">
						<Grid container spacing={5}>
							{arr.map((c, i) => (
								<Grid item xs={12} md={6} key={i}>
									<RealtorCard />
								</Grid>
							))}
						</Grid>
					</Box>
				</Container>
			</Box>
		</div>
	);
};

export default RealtorsPage;
