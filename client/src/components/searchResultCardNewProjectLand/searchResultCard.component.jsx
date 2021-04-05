import { Box, Divider, Grid, Paper } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderMinAndMax,
	shortLength,
} from '../../utils/render.utils';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import ContactDialogueWithMessage from '../query/projectQuery.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useStyles from './searchResultCard.styles';

// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Custom components

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
	const [contactOpen, setContactOpen] = React.useState(false);
	const handleContactOpen = (_) => {
		setContactOpen(true);
	};

	const handleContactClose = (_) => {
		setContactOpen(false);
	};

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
				project={true}
			/>
			<ContactDialogueWithMessage
				open={contactOpen}
				handleClose={handleContactClose}
				id={property.id}
				type="project"
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
								<Box display="flex" flexDirection="column">
									<Link
										to={`/project/${property.id}`}
										className={classes.linkTitle}
										target="_blank"
									>
										<b>{property.title}</b>
									</Link>

									<Box>
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
											{capitalizeFirstLetter(
												property.complitionStatus
											)}
										</Box>
									</Box>
								</Box>
							</Grid>
						</Grid>
						<Box mt="1rem">
							<Grid container>
								<Grid item xs={6} md={6}>
									<Box>
										<Box>
											<b>
												{renderMinAndMax([
													...new Set(
														propertyItems
															.map(
																(c) =>
																	c.plotArea
															)
															.flat()
													),
												])}{' '}
												Sq.Ft
											</b>
										</Box>
									</Box>
								</Grid>
								<Grid item xs={6} md={6}>
									<Box>
										<Box>
											<b>
												₹{' '}
												{Math.min(
													...propertyItems.map((c) =>
														Number(
															c.minPrice / 100000
														)
													)
												)}{' '}
												Lacs -{' '}
												{Math.max(
													...propertyItems.map((c) =>
														Number(
															c.maxPrice / 100000
														)
													)
												)}{' '}
												Lacs
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
									Plot Size
								</Grid>

								<Grid item xs={4} className={classes.cell}>
									Price
								</Grid>
							</Grid>
							<Box className={classes.itemWrapper}>
								{propertyItems.map((c) => (
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
											<Link
												to={`/project-property/${c.id}`}
												target="_blank"
											>
												Land
											</Link>
										</Grid>

										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											{renderMinAndMax(c.plotArea)} Sq.Ft
										</Grid>
										<Grid
											item
											xs={4}
											className={classes.cell}
										>
											₹ {c.minPrice / 100000} Lac -{' '}
											{c.maxPrice / 100000} Lac
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
									{shortLength(property.description, 100)}
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
											<button
												className={classes.details}
												onClick={handleContactOpen}
											>
												Inquiry Now
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
