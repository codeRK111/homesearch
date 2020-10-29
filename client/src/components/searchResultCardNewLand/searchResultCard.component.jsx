import React from 'react';
import { Paper, Box, Grid, Divider } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './searchResultCard.styles';

// Custom components
import PropertyShare from '../propertyShare/propertyShare.component';

const ResultCard = ({ independent }) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);

	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const justifyContent = mobile
		? { justifyContent: 'flex-start' }
		: { justifyContent: 'flex-end' };
	return (
		<Paper>
			<PropertyShare
				status={open}
				handleClose={handleClose}
				id="djshd123"
			/>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={
							independent
								? require('../../assets/house-cover.jfif')
								: require('../../assets/flat.jpeg')
						}
						alt="property"
						className={classes.image}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box p="1rem">
						<Box
							display="flex"
							justifyContent="flex-end"
							mb="1rem"
						></Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<Box display="flex" alignItems="center">
									<b>$Area Sq.ft $location</b>
									<br />

									{/* <VerifiedUserIcon
										className={classes.verified}
									/> */}
									<Box className={classes.reraWrapper}>
										<Box>RERA</Box>
										<DoneIcon
											className={classes.shareIcon}
										/>
									</Box>
								</Box>
								<span className={classes.info}>
									Patia,Bhubaneswar
								</span>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<Box display="flex">
										<Box
											className={classes.pType}
											mr="1rem"
										>
											NEW BOOKING
										</Box>
										<Box className={classes.price}>
											₹ 80L
										</Box>
									</Box>
									<Box className={classes.info} mt="0.5rem">
										{' '}
										₹ 5990 per sq.ft. Carpet Area
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box mt="1rem">
							<Grid container>
								<Grid item xs={12} md={6}>
									<Grid container>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Plot Area
												</Box>
												<Box>
													<b>960 Sq.ft</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Possession On
												</Box>
												<Box>
													<b>Ready To Move</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
									<Grid container>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Ownership
												</Box>
												<Box>
													<b>Freehold</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Gated Community
												</Box>
												<Box>
													<b>Yes</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} md={6}>
									<Grid container className={classes.margin}>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Facing
												</Box>
												<Box>
													<b>East</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Frontage
												</Box>
												<Box>
													<b>Yes</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
									<Grid container>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Land Use Zone
												</Box>
												<Box>
													<b>Yello Zone</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Width of road
												</Box>
												<Box>
													<b>20 ft</b>
												</Box>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<Divider />
						</Box>
						<Grid container>
							<Grid item xs={12} md={6}>
								<p className={classes.info}>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Rem aspernatur non eius
									neque eligendi dolorem ipsum asperiores quas
								</p>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box
									mt="1rem"
									display="flex"
									justifyContent="flex-end"
									className={classes.smLeft}
								>
									<Box display="flex">
										<button
											className={classes.whatsapp}
											onClick={handleOpen}
										>
											<WhatsAppIcon
												className={classes.shareIcon2}
											/>
										</button>
										<button className={classes.details}>
											Get Owner Details
										</button>
									</Box>
								</Box>
								<Box
									className={classes.info}
									mt="0.5rem"
									display="flex"
									{...justifyContent}
								>
									Posted on - 28-10-2020
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ResultCard;
