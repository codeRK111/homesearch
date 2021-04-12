import { Box, Grid, Paper } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	renderMinAndMax,
} from '../../utils/render.utils';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import ContactDialogueWithMessage from '../query/projectQuery.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../query/whatsappQuery.component';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useStyles from './similarProjects.styles';

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
const Apartment = ({ property, propertyItems }) => {
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
		<Grid item xs={12} md={3}>
			<PropertyShare
				open={open}
				handleClose={handleClose}
				id={property.id}
				propertyFor={null}
				type={'project'}
				title={property.title}
				whatsAppNumber={property.builder.phoneNumber}
				role={null}
			/>
			<ContactDialogueWithMessage
				open={contactOpen}
				handleClose={handleContactClose}
				id={property.id}
				type="project"
			/>
			<Paper className={classes.cardWrapper} elevation={5}>
				<Box
					height="150px"
					position="relative"
					className={classes.imageWrapper}
				>
					<img
						src={imgSrc(property)}
						alt=""
						className={classes.image}
					/>

					<div className={classes.companyWrapper}>
						<b>
							Homesearch
							<span className={classes.number}>18</span>
						</b>
					</div>
				</Box>
				<Box p="1rem">
					<Box mr="1rem">
						<Link
							to={`/project/${property.id}`}
							className={classes.linkTitle}
							target="_blank"
						>
							<b>{property.title}</b>
						</Link>{' '}
						<br />
						<Box>
							<span className={classes.location}>
								<RoomRoundedIcon
									className={classes.locationIcon}
								/>{' '}
								{property.location.name},{property.city.name}
							</span>
						</Box>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<b>
							₹{' '}
							{Math.min(
								...propertyItems.map((c) =>
									Number(c.minPrice / 100000)
								)
							)}{' '}
							Lacs -{' '}
							{Math.max(
								...propertyItems.map((c) =>
									Number(c.maxPrice / 100000)
								)
							)}{' '}
							Lacs
						</b>
						<b className={classes.number}>
							{capitalizeFirstLetter(property.complitionStatus)}
						</b>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<b>
							{renderMinAndMax([
								...new Set(
									propertyItems.map((c) => c.plotArea).flat()
								),
							])}{' '}
							Sq.Ft
						</b>
						<b>
							By{' '}
							<span className={classes.dName}>
								{property.builder.developerName}
							</span>
						</b>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<button
							className={classes.shortlist}
							onClick={handleOpen}
						>
							<AlignCenter>
								<WhatsAppIcon className={classes.shareIcon} />{' '}
								Chat now
							</AlignCenter>
						</button>
						<button
							className={classes.details}
							onClick={handleContactOpen}
						>
							Inquiry Now
						</button>
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
};

export default Apartment;
