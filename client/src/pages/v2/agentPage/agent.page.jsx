import { Avatar, Badge, Box, Grid } from '@material-ui/core';

import AgentCard from '../../../components/v2/agentCard/agentCard';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import Nav from '../../../components/v2/pageNav/nav.component';
import PropertyCard from '../../../components/v2/propertyCard/propertyCard.component';
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
					<span className={globalClasses.smXsText}>Home/ Owner Profile / Sumitra00102</span>
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
									className={clsx(globalClasses.alignCenter,globalClasses.smFlexColumn)}
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
										className={clsx(classes.keyNumberSpacer,globalClasses.alignCenter)}

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
										className={clsx(classes.keyNumberSpacer,globalClasses.alignCenter)}
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
							<Grid item xs={12} md={4}>
								<Box className={classes.reviewWrapper}>
									<h3
										className={clsx(
											globalClasses.colorPrimary,
											globalClasses.textCenter
										)}
									>
										Give Your Feedback
									</h3>
									<Grid container spacing={1}>
										<Grid item xs={12} md={3}>
											<div
												className={
													classes.avatarReviewWrapper
												}
											>
												<Avatar
													alt="Remy Sharp"
													src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100"
													className={
														classes.avatarReview
													}
												/>
												<div
													className={
														classes.commentReviewIcon
													}
												>
													<span>&#8220;</span>
												</div>
											</div>
										</Grid>
										<Grid item xs={12} md={9}>
											<Box>
												<p
													className={
														globalClasses.smText
													}
												>
													Z1 is a very beautiful and
													peaceful society. The place
													is really amazing. Gardens
													are well maintained and
													roads are really cleaned all
													the time. The management has
													always ,maintained the
													decorum.
												</p>
											</Box>
											<Box
												mt="2rem"
												className={
													globalClasses.alignCenter
												}
											>
												<div
													className={
														classes.slideSelected
													}
												></div>
												<div
													className={classes.slide}
												></div>
												<div
													className={classes.slide}
												></div>
												<div
													className={classes.slide}
												></div>
												<div
													className={classes.slide}
												></div>
											</Box>
										</Grid>
									</Grid>

									<Box className={classes.commentWrapper}>
										<textarea
											type="text"
											className={classes.comment}
											placeholder="Send  Your Feedback if you have taken service of Ms. Priyanka."
										/>
									</Box>
								</Box>
							</Grid>
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
				<Box mt="1rem">
					<div className={classes.propertiesWrapper}>
						{/* <div className={classes.scrollbar}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{ fontSize: 40 }}
											/>
										</div>
									</div> */}
						<div className={classes.content}>
							<Grid container spacing={3}>
								{Array.from(
									{ length: 4 },
									(_, idx) => `${++idx}`
								).map((c) => (
									<Grid item xs={12} md={3}>
										<PropertyCard key={c} />
									</Grid>
								))}
							</Grid>
						</div>
						<div className={clsx(classes.scrollWrapper,globalClasses.smHide)}>
							<div className={classes.scrollWrapper}>
								<ChevronRightIcon style={{ fontSize: 40 }} />
							</div>
						</div>
					</div>
				</Box>
				<Box
					className={clsx(
						globalClasses.alignCenter,
						globalClasses.justifySpaceBetween
					)}
					mt="2rem"
				>
					<h2>Projects Marketed By Priyanka</h2>
				</Box>
				<Box mt="1rem">
					<div className={classes.propertiesWrapper}>
						{/* <div className={classes.scrollbar}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{ fontSize: 40 }}
											/>
										</div>
									</div> */}
						<div className={classes.content}>
							<Grid container spacing={3}>
								{Array.from(
									{ length: 4 },
									(_, idx) => `${++idx}`
								).map((c) => (
									<Grid item xs={12} md={3}>
										<PropertyCard key={c} />
									</Grid>
								))}
							</Grid>
						</div>
						<div className={clsx(classes.scrollWrapper,globalClasses.smHide)}>
							<div className={classes.scrollWrapper}>
								<ChevronRightIcon style={{ fontSize: 40 }} />
							</div>
						</div>
					</div>
				</Box>
				<Box
					mt="2rem"
					className={clsx(
						globalClasses.alignCenter,
						globalClasses.justifySpaceBetween
					)}
				>
					<h2>Agents Dealing In Similar Properties In Your City</h2>
				</Box>
				<Box mt="1rem">
					<div className={classes.propertiesWrapper}>
						{/* <div className={classes.scrollbar}>
										<div className={classes.scrollWrapper}>
											<ChevronLeftIcon
												style={{ fontSize: 40 }}
											/>
										</div>
									</div> */}
						<div className={classes.content}>
							<Grid container spacing={3}>
								{Array.from(
									{ length: 4 },
									(_, idx) => `${++idx}`
								).map((c) => (
									<Grid item xs={12} md={3}>
										<AgentCard key={c} />
									</Grid>
								))}
							</Grid>
						</div>
						<div className={classes.scrollbarRight}>
							<div className={clsx(classes.scrollWrapper,globalClasses.smHide)}>
								<ChevronRightIcon style={{ fontSize: 40 }} />
							</div>
						</div>
					</div>
				</Box>
			</Box>
		</div>
	);
};

export default AgentPage;
