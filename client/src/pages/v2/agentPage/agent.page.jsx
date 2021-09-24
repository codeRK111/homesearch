import { Avatar, Badge, Box, Grid } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';

import ErrorBackdrop from '../../../components/v2/backdropMessage';
import LoaderBackdrop from '../../../components/LoaderBackdrop';
import MailIcon from '@material-ui/icons/Mail';
import Nav from '../../../components/v2/pageNav/nav.component';
import axios from 'axios';
import badgeIcon from '../../../assets/icons/badge.svg';
import clsx from 'clsx';
import { getRealtorDetails } from '../../../utils/asyncUser';
import { renderProfileImage } from '../../../utils/render.utils';
import useGlobalStyles from '../../../common.style';
import useStyles from './agentPage.style';
import { withAsync } from '../../../hoc/withAsync';

const AgentPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { id },
	},
}) => {
	const cancelToken = useRef();
	const classes = useStyles();
	const globalClasses = useGlobalStyles();

	// State
	const [data, setData] = useState(null);

	const fetchRealtors = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();

			const resp = await getRealtorDetails(
				id,
				cancelToken.current,
				setLoading
			);
			setError(null);
			setData(resp);
		} catch (error) {
			setData(null);
			setError(error);
		}
	}, [setLoading, setError, id]);

	React.useEffect(() => {
		fetchRealtors();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchRealtors]);

	return (
		<div>
			<Nav />
			<ErrorBackdrop open={!!error} message={error} />
			<LoaderBackdrop open={loading} />
			{data && (
				<>
					<div className={classes.wrapper}>
						<Box>
							<span className={globalClasses.smXsText}>
								Realtors / {data.name}
							</span>
						</Box>
					</div>
					<div className={classes.profileWrapper}>
						<div className={classes.overlay}>
							<Box className={classes.heroWrapper}>
								<Grid container spacing={3}>
									<Grid item xs={12} md={2}>
										<Box
											className={
												globalClasses.justifyCenter
											}
										>
											<div
												className={
													classes.avatarWrapper
												}
											>
												<Avatar
													variant="square"
													alt="Remy Sharp"
													src={renderProfileImage(
														data.photo
													)}
													className={classes.avatar}
												/>
												<img
													src={badgeIcon}
													alt="Badge"
													className={
														classes.commentIcon
													}
												/>
											</div>
										</Box>
									</Grid>
									<Grid item xs={12} md={5}>
										<div
											className={clsx(
												globalClasses.alignCenter,
												globalClasses.justifySpaceBetween
											)}
										>
											<div className={classes.ownerType}>
												Realtor
											</div>
										</div>
										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
										>
											<h1
												className={
													globalClasses.colorPrimary
												}
											>
												{data.name}
											</h1>
											<Box ml="2rem">
												<Badge
													badgeContent={4}
													color="error"
												>
													<MailIcon />
												</Badge>
											</Box>
										</Box>
										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
										>
											<span
												className={
													globalClasses.colorPrimary
												}
											>
												{data.address}
											</span>
											<Box ml="2rem">
												<span
													className={clsx(
														globalClasses.bold,
														globalClasses.colorPrimary
													)}
												>
													ID : {data.hsID}
												</span>
											</Box>
										</Box>
										<Box
											className={clsx(
												globalClasses.alignCenter
											)}
											mt="1rem"
										>
											<Box
												className={
													classes.numberWrapper
												}
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													1.25k
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Connection
												</span>
											</Box>
											<Box
												className={
													classes.numberWrapper
												}
												ml="2rem"
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													1.5M
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Network
												</span>
											</Box>
											<Box
												className={
													classes.numberWrapper
												}
												ml="2rem"
											>
												<h1
													className={
														globalClasses.colorUtil
													}
												>
													2K
												</h1>
												<span
													className={clsx(
														globalClasses.smText,
														globalClasses.bold
													)}
												>
													Deals
												</span>
											</Box>
										</Box>
										<Box
											className={clsx(
												globalClasses.alignCenter,
												globalClasses.smFlexColumn
											)}
											mt="1rem"
										>
											<Box
												className={
													globalClasses.alignCenter
												}
											>
												<Box
													className={
														classes.numberHiglight
													}
													mr="1rem"
												>
													<h1>10</h1>
												</Box>
												<span
													className={clsx(
														globalClasses.smText
													)}
												>
													Total No. Of Listings
												</span>
											</Box>
											<Box
												className={clsx(
													classes.keyNumberSpacer,
													globalClasses.alignCenter
												)}
											>
												<Box
													className={
														classes.numberHiglight
													}
													mr="1rem"
												>
													<h1>60</h1>
												</Box>
												<span
													className={clsx(
														globalClasses.smText
													)}
												>
													No. of leads received
												</span>
											</Box>
											<Box
												className={clsx(
													classes.keyNumberSpacer,
													globalClasses.alignCenter
												)}
												ml="2rem"
											>
												<Box
													className={
														classes.numberHiglight
													}
													mr="1rem"
												>
													<h1>55</h1>
												</Box>
												<span
													className={clsx(
														globalClasses.smText
													)}
												>
													Customers visited
												</span>
											</Box>
										</Box>
									</Grid>

									<Grid item xs={false} md={1}></Grid>
								</Grid>
							</Box>
						</div>
					</div>
					<Box className={classes.pagePadding}>
						<Box
							className={clsx(
								globalClasses.alignCenter,
								globalClasses.justifySpaceBetween
							)}
						>
							<h2>Properties Posted By {data.name}</h2>
						</Box>
					</Box>
				</>
			)}
		</div>
	);
};

export default withAsync(AgentPage);
