import { Box, Divider, Grid, Paper } from '@material-ui/core';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useStyles from './searchResultCard.styles';

const imgSrc = (property) => {
	if (property.image1) {
		return `/assets/projects/${property.image1}`;
	}
	if (property.image2) {
		return `/assets/projects/${property.image2}`;
	}
	if (property.image3) {
		return `/assets/projects/${property.image3}`;
	}

	return require('../../assets/no-image.jpg');
};

const ResultCard = ({ independent, property, propertyItems }) => {
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
				data={property}
			/>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<img
						src={imgSrc(property)}
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
										<b>{property.title}</b>
									</Link>

									<Box ml="1rem">
										<span>
											{property.location.name},
											{property.city.name}
										</span>
									</Box>
								</Box>
								<Box mt="0.5rem">
									<b>
										By{' '}
										<span className={classes.dName}>
											{property.builder.developerName}
										</span>
									</b>
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box className={classes.locationWrapper}>
									<Box display="flex" alignItems="center">
										<Box className={classes.price}>
											{property.complitionStatus}
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
									{property.description}
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
