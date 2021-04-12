import { Box, Button, Divider, Grid, Paper } from '@material-ui/core';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import ContactDialogueWithMessage from '../query/propertyQuery.component';
import { Button as CustomButton } from '../customMaterialComponents/button.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../query/whatsappQuery.component';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { capitalizeFirstLetter } from '../../utils/render.utils';
import useStyles from './similarProjects.styles';

// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
const imgSrc = (property) => {
	if (property.image1) {
		return `/assets/properties/${property.image1}`;
	}
	if (property.image2) {
		return `/assets/properties/${property.image2}`;
	}
	if (property.image3) {
		return `/assets/properties/${property.image3}`;
	}

	return require('../../assets/no-image.jpg');
};
const Apartment = ({ data }) => {
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
				id={data.id}
				propertyFor={data['for']}
				type={'property'}
				title={data.title}
				whatsAppNumber={data.userId.number}
				role={data.userId.role}
			/>
			<ContactDialogueWithMessage
				open={contactOpen}
				handleClose={handleContactClose}
				id={data.id}
				owner={data.userId.id}
			/>
			<Paper className={classes.cardWrapper} elevation={5}>
				<Box
					height="150px"
					position="relative"
					className={classes.imageWrapper}
				>
					<img src={imgSrc(data)} alt="" className={classes.image} />

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
							to={`/property-details/${data.id}`}
							className={classes.linkTitle}
							target="_blank"
						>
							<b>{data.title}</b>
						</Link>{' '}
						<br />
						<Box>
							<span className={classes.location}>
								<RoomRoundedIcon
									className={classes.locationIcon}
								/>{' '}
								{data.location.name},{data.city.name}
							</span>
						</Box>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<b>₹{data.rent / 1000}K</b>
						<b className={classes.number}>
							{capitalizeFirstLetter(data.furnished)}
						</b>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<b>{data.superBuiltupArea}Sq. Ft</b>
						<b>
							Bedroom:{' '}
							<span className={classes.dName}>
								{data.numberOfBedRooms}
							</span>
						</b>
					</Box>
					<Box p="0.5rem">
						<Divider />
					</Box>
					<Box>
						<Grid container>
							<Grid item xs={12} md={5}>
								<Button
									fullWidth
									variant="text"
									color="primary"
									size="small"
									onClick={handleOpen}
								>
									Chat Now
								</Button>
							</Grid>
							<Grid item xs={12} md={7}>
								<Button
									fullWidth
									variant="text"
									color="primary"
									size="small"
									onClick={handleContactOpen}
								>
									Get {capitalizeFirstLetter(data.postedBy)}{' '}
									Details
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
};

export default Apartment;
