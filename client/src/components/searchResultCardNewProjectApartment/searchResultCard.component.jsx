import { Box, Divider, Grid, Paper } from '@material-ui/core';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useStyles from './searchResultCard.styles';

// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Custom components

const ResultCard = ({ independent }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = (_) => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
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
									<Link
										to="/property/123/details/project/apartment"
										className={classes.linkTitle}
									>
										<b>DLF fairytell in *</b>
									</Link>

									<Box ml="1rem">
										<span>Patia,Bhubaneswar</span>
									</Box>
								</Box>
								<Box mt="0.5rem">
									<b>
										By{' '}
										<span className={classes.dName}>
											Anand Group
										</span>
									</b>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<Box display="flex" alignItems="center">
										<Box className={classes.price}>
											Upcoming
										</Box>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box mt="1rem">
							<Grid container>
								<Grid item xs={6} md={4}>
									<Box>
										<Box>
											<b>660-739 Sq.Ft</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={4}>
									<Box>
										<Box>
											<b>₹ 23 Lacs - 26.29 Lacs</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Box
										display="flex"
										alignItems="center"
										className={classes.margin}
									>
										<Box className={classes.info}>
											Possession:
										</Box>
										<Box ml="0.4rem">
											<b className={classes.smallText}>
												Ready to move
											</b>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>
						<Box mt="1rem">
							<Grid container className={classes.header}>
								<Grid item xs={4} className={classes.cell}>
									Unit Type
								</Grid>
								<Grid item xs={4} className={classes.cell}>
									Size
								</Grid>
								<Grid item xs={4} className={classes.cell}>
									Price
								</Grid>
							</Grid>
							<Box className={classes.itemWrapper}>
								{Array.from(Array(6).keys()).map((c) => (
									<Grid
										container
										className={classes.item}
										key={c}
									>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											<Link to="#">1 BHK</Link>
										</Grid>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											317 Sq.Ft
										</Grid>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											₹ 23 Lac
										</Grid>
									</Grid>
								))}
							</Box>
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
								>
									<Box display="flex">
										<button
											className={classes.whatsapp}
											onClick={handleOpen}
										>
											<AlignCenter>
												<WhatsAppIcon
													className={
														classes.shareIcon
													}
												/>{' '}
												Chat now
											</AlignCenter>
										</button>
										<Box ml="1rem">
											<button className={classes.details}>
												Get Offer
											</button>
										</Box>
									</Box>
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
