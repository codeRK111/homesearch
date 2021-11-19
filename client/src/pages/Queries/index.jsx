import { Box, Container, Drawer, Grid, IconButton } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import Card from './Card';
import Filter from './Filter';
import FilterListIcon from '@material-ui/icons/FilterList';
import Nav from '../../components/v2/pageNav/nav.component';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getQueriesV2 } from '../../utils/asyncQuery';
import { makeStyles } from '@material-ui/core/styles';
import { selectUser } from '../../redux/auth/auth.selectors';

const useStyles = makeStyles({
	list: {
		width: 250,
		padding: '1rem',
	},
	fullList: {
		width: 'auto',
	},
});

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
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [queries, setQueries] = useState([]);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [today, setToday] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setOpenDrawer(open);
	};

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
					<IconButton size="medium" onClick={toggleDrawer(true)}>
						<FilterListIcon />
					</IconButton>
					<Drawer
						anchor={'left'}
						open={openDrawer}
						onClose={toggleDrawer(false)}
					>
						<div className={classes.list} align="center">
							<Filter today={today} setToday={setToday} />
						</div>
					</Drawer>
					<Box mt="1rem">
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
