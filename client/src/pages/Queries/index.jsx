import { Box, Container, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import Card from './Card';
import Nav from '../../components/v2/pageNav/nav.component';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getQueriesV2 } from '../../utils/asyncQuery';
import { selectUser } from '../../redux/auth/auth.selectors';

const Loader = () => {
	return (
		<Grid container spacing={3}>
			{Array.from({ length: 3 }, (_, i) => i++).map((_, i) => (
				<Grid item xs={12}>
					{' '}
					<Skeleton variant="rect" width={'100%'} height={200} />{' '}
				</Grid>
			))}
		</Grid>
	);
};

const MyQueriesPage = ({ user }) => {
	const [loading, setLoading] = useState(false);
	const [queries, setQueries] = useState([]);

	const fetchQueries = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await getQueriesV2({ queryForUser: user.id });
			setQueries(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchQueries();
	}, [fetchQueries]);

	return (
		<div>
			<Nav />
			<Container>
				<Box mt="2rem ">
					{/* <Tab /> */}
					<Box mt="2rem">
						{loading && <Loader />}
						<Grid container spacing={3}>
							{queries.map((c, i) => (
								<Grid item xs={12} key={c.id}>
									<Card query={c} />
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(MyQueriesPage);
