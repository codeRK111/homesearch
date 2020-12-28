import { Box, Grid, Paper } from '@material-ui/core';
import { capitalizeFirstLetter, renderInfo } from '../../utils/render.utils';

import { AlignCenter } from '../flexContainer/flexContainer.component';
import ContactDialogueWithMessage from '../contactOwner/contactOwnerProject.component';
import { Link } from 'react-router-dom';
import PropertyShare from '../propertyShare/propertyShare.component';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useStyles from './similarProjects.styles';

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
				status={open}
				handleClose={handleClose}
				data={data}
			/>
			<ContactDialogueWithMessage
				status={contactOpen}
				handleClose={handleContactClose}
				title={'Get offer'}
				property={data}
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
							<span className={classes.number}>India</span>
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
						<b>
							Security:{' '}
							<span className={classes.dName}>
								₹{data.securityDeposit / 1000}K
							</span>
						</b>
					</Box>
					<Box
						mt="1rem"
						display="flex"
						justifyContent="space-between"
					>
						<b>
							{capitalizeFirstLetter(renderInfo(data.roomType))}
						</b>
						<b>
							Toilet:
							{capitalizeFirstLetter(
								renderInfo(data.typeOfToilets)
							)}
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
							Get {capitalizeFirstLetter(data.postedBy)} Details
						</button>
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
};

export default Apartment;
