import { Avatar, Badge, Box, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import badgeIcon from '../../../assets/icons/badge.svg';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './agentPage.style';

const AgentPage = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box>
					<span className={globalClasses.smXsText}>
						Realtors / Sumitra00102
					</span>
				</Box>
			</div>
			<div className={classes.profileWrapper}>
				<div className={classes.overlay}>
					<Box className={classes.heroWrapper}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={2}>
								<Box className={globalClasses.justifyCenter}>
									<div className={classes.avatarWrapper}>
										<Avatar
											variant="square"
											alt="Remy Sharp"
											src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
											className={classes.avatar}
										/>
										<img
											src={badgeIcon}
											alt="Badge"
											className={classes.commentIcon}
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
										Property Owner
									</div>
									<Link
										className={clsx(
											globalClasses.colorPrimary,
											globalClasses.bold,
											globalClasses.smText
										)}
									>
										MANAGE PROFILE
									</Link>
								</div>
								<Box
									className={clsx(globalClasses.alignCenter)}
								>
									<h1 className={globalClasses.colorPrimary}>
										Sumitra Mahajan
									</h1>
									<Box ml="2rem">
										<Badge badgeContent={4} color="error">
											<MailIcon />
										</Badge>
									</Box>
								</Box>
								<Box
									className={clsx(globalClasses.alignCenter)}
								>
									<span
										className={globalClasses.colorPrimary}
									>
										Banglore, India
									</span>
									<Box ml="2rem">
										<span
											className={clsx(
												globalClasses.bold,
												globalClasses.colorPrimary
											)}
										>
											ID : R04913231c
										</span>
									</Box>
								</Box>
								<Box
									className={clsx(globalClasses.alignCenter)}
									mt="1rem"
								>
									<Box className={classes.numberWrapper}>
										<h1 className={globalClasses.colorUtil}>
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
										className={classes.numberWrapper}
										ml="2rem"
									>
										<h1 className={globalClasses.colorUtil}>
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
										className={classes.numberWrapper}
										ml="2rem"
									>
										<h1 className={globalClasses.colorUtil}>
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
									<Box className={globalClasses.alignCenter}>
										<Box
											className={classes.numberHiglight}
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
											className={classes.numberHiglight}
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
											className={classes.numberHiglight}
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
					<h2>Properties Posted By Sumitra</h2>
					<Link
						className={clsx(
							globalClasses.colorPrimary,
							globalClasses.bold,
							globalClasses.smText
						)}
					>
						MANAGE PROFILE
					</Link>
				</Box>
			</Box>
		</div>
	);
};

export default AgentPage;
