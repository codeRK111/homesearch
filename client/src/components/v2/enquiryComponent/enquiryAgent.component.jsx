import {
	capitalizeFirstLetter,
	getHostName,
} from '../../../utils/render.utils';

import ContactBuilder from '../contactBuilderDialog/contactBuilder.component';
import { Grid } from '@material-ui/core';
import React from 'react';
import ShowPhoneNumber from '../phoneNumber';
import image from '../../../assets/icons/builder2.svg';
import useStyles from './enquiery.style';

const Enquiry = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<ContactBuilder
				open={open}
				handleClickOpen={handleClickOpen}
				handleClose={handleClose}
				type={'agent'}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={3}>
					<div className={classes.imageWrapper}>
						<img src={image} alt="" className={classes.image} />
					</div>
				</Grid>
				<Grid item xs={12} md={9}>
					<div className={classes.flexWrapper}>
						<h1>
							{capitalizeFirstLetter(getHostName())} Business
							Assist Plan For Realtors
						</h1>
						<h3>
							Get in touch with us to promote your portfolios.
						</h3>
						<ShowPhoneNumber />
						<button onClick={handleClickOpen}>ENQUIRY NOW</button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Enquiry;
