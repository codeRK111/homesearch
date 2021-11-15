import { Box, Container, Grid } from '@material-ui/core';

import Card from './Card';
import Nav from '../../components/v2/pageNav/nav.component';
import React from 'react';
import Tab from './Tab';

const MyQueriesPage = () => {
	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem ">
					<Tab />
					<Box mt="2rem">
						<Grid container spacing={3}>
							{Array.from({ length: 9 }, (_, i) => i++).map(
								(_, i) => (
									<Grid item xs={12} md={3} key={i}>
										<Card />
									</Grid>
								)
							)}
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default MyQueriesPage;
