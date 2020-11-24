import { Box, Divider, Grid } from '@material-ui/core';
import {
	faEnvelopeOpen,
	faMobileAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
	selectGetQueriesLoading,
	selectMyQueries,
	selectQueriesReceived,
} from '../../redux/property/property.selectors';

import { AlignCenter } from '../../components/flexContainer/flexContainer.component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorCard from '../../components/errorCard/errorCard.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Skeleton from '../../components/skeleton/queries.component';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getQueries } from '../../redux/property/property.actions';
import { makeStyles } from '@material-ui/core/styles';
import { parseDate } from '../../utils/render.utils';
import { selectUser } from '../../redux/auth/auth.selectors';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		margin: '0.5rem 0',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	message: {
		color: theme.fontColor,
	},
	cGreen: {
		color: theme.colorTwo,
	},
	icon: {
		fontSize: '0.8rem',
	},
	userDetailsWrapper: {
		marginRight: '1rem',
	},
	userDetails: {
		fontSize: '0.9rem',
		color: theme.fontColor,
	},
}));

function SimpleCard({
	received,
	user,
	loading,
	myQueries,
	getQueries,
	queriesReceived,
}) {
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const handleFetchQueries = (status, data) => {
		if (status === 'fail') {
			setAsyncError(data);
		} else {
			setAsyncError(null);
		}
	};

	const data = received ? queriesReceived : myQueries;
	const key = received ? 'owner' : 'user';
	React.useEffect(() => {
		getQueries({ [key]: user.id }, handleFetchQueries);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showSkeleton = () => {
		if (loading) {
			if (received) {
				return queriesReceived.length === 0 ? true : false;
			} else {
				return myQueries.length === 0 ? true : false;
			}
		} else {
			return false;
		}
	};

	return (
		<Box>
			{showSkeleton() && <Skeleton />}
			{asyncError && <ErrorCard message={asyncError} />}
			{data.map((c) => (
				<Card className={classes.root} key={c.id}>
					<CardContent>
						<Typography
							className={classes.title}
							color="textSecondary"
							gutterBottom
						>
							{parseDate(c.createdAt)}
						</Typography>
						<b>{c.property.title}</b>

						<Box mt="1rem">
							<Typography
								variant="body2"
								component="p"
								className={classes.message}
							>
								{c.message}
							</Typography>
						</Box>
						{received && (
							<Box>
								<Box mt="0.5rem" mb="0.5rem">
									<Divider />
								</Box>
								<Box width="100%">
									<Grid container spacing={1}>
										<Grid item xs={12} md={4}>
											<AlignCenter
												className={
													classes.userDetailsWrapper
												}
											>
												<Box mr="0.5rem">
													<FontAwesomeIcon
														icon={faUser}
														className={[
															classes.cGreen,
															classes.icon,
														].join(' ')}
													/>
												</Box>
												<Typography
													className={
														classes.userDetails
													}
												>
													{c.userName}
												</Typography>
											</AlignCenter>
										</Grid>
										<Grid item xs={12} md={4}>
											<AlignCenter
												className={
													classes.userDetailsWrapper
												}
											>
												<Box mr="0.5rem">
													<FontAwesomeIcon
														icon={faEnvelopeOpen}
														className={[
															classes.cGreen,
															classes.icon,
														].join(' ')}
													/>
												</Box>
												<Typography
													className={
														classes.userDetails
													}
												>
													{c.email}
												</Typography>
											</AlignCenter>
										</Grid>
										<Grid item xs={12} md={4}>
											<AlignCenter
												className={
													classes.userDetailsWrapper
												}
											>
												<Box mr="0.5rem">
													<FontAwesomeIcon
														icon={faMobileAlt}
														className={[
															classes.cGreen,
															classes.icon,
														].join(' ')}
													/>
												</Box>
												<Typography
													className={
														classes.userDetails
													}
												>
													{c.phoneNumber}
												</Typography>
											</AlignCenter>
										</Grid>
									</Grid>
								</Box>
							</Box>
						)}
					</CardContent>
				</Card>
			))}
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	loading: selectGetQueriesLoading,
	myQueries: selectMyQueries,
	queriesReceived: selectQueriesReceived,
});

const mapDispatchToProps = (dispatch) => ({
	getQueries: (data, callback) => dispatch(getQueries({ data, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
