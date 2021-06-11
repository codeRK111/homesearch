import ContactBuilder from '../contactBuilderDialog/contactBuilder.component';
import { Grid } from '@material-ui/core';
import React from 'react';
import image from '../../../assets/building.png';
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
							HomesearchIndia Business Assist Plan For Builders
						</h1>
						<h3>Get in touch with us to promote your projects.</h3>
						<button onClick={handleClickOpen}>ENQUIRY NOW</button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Enquiry;
