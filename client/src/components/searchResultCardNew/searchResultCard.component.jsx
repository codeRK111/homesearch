import React from 'react';
import { Paper, Box, Grid, Divider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoneIcon from '@material-ui/icons/Done';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import useStyles from './searchResultCard.styles';

// Custom components
import PropertyShare from '../propertyShare/propertyShare.component';

const ResultCard = ({ independent }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
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
									<b>
										{independent
											? 'House for sale in Patia'
											: '3 BHK Apanartment'}
									</b>
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
													Carpet Area
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
													Super builtup Area
												</Box>
												<Box>
													<b>960 Sq.ft</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Bedrooms
												</Box>
												<Box>
													<b>7</b>
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
													Total floor
												</Box>
												<Box>
													<b>10</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box>
												<Box className={classes.info}>
													Car parking
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
													Property on floor
												</Box>
												<Box>
													<b>7</b>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={6} md={6}>
											<Box mt="1rem">
												<Box className={classes.info}>
													Furnishing status
												</Box>
												<Box>
													<b>furnished</b>
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
