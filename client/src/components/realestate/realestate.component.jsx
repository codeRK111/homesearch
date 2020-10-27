import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LocationCityIcon from '@material-ui/icons/LocationCity';

// Custom Components
import Counter from '../propertyCounter/propertyCounter.component';

const useStyles = makeStyles((theme) => ({
	benifit: {
		color: theme.fontColor,
		textAlign: 'center',
	},
	title: {
		textAlign: 'center',
	},
	description: {
		textAlign: 'center',
		color: theme.fontColor,
		padding: '1rem',
	},
	link: {
		color: theme.colorTwo,
		textDecoration: 'none',
	},
	avatar: {
		width: '6rem',
		height: '6rem',
		backgroundColor: 'transparent',
		marginBottom: '0.5rem',
		boxShadow:
			'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
	},
	icon: {
		fontSize: '3rem',
		color: theme.colorTwo,
		transition: '0.5s all ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.3)',
			color: theme.colorOne,
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	benifitWrapper: {
		borderRight: '1px solid #cccccc',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginTop: '1rem',
		},
	},
}));

const Benifits = () => {
	const classes = useStyles();
	return (
		<Box>
			<h2 className={classes.title}>Bhubaneswar Real Estate</h2>
			<p className={classes.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
				necessitatibus impedit voluptates minus sunt commodi
				consequuntur porro perferendis quasi ducimus assumenda
				molestiae, minima itaque iusto eveniet laboriosam pariatur
				corrupti? Sint, consequatur ex rerum, et omnis vitae ratione
				impedit provident quam voluptates dolorum, molestiae voluptatem
				asperiores? Illo quisquam maxime mollitia? Quidem repudiandae
				minus quos adipisci sed ad et eos aliquam ullam. Nihil
				accusantium, in ad voluptatem quod numquam voluptates commodi
				praesentium, atque alias impedit quia. Modi quibusdam ducimus ea
				repellat quod.
			</p>
			<Box mt="4rem">
				<Grid container spacing={0}>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<EmojiTransportationIcon className={classes.icon} />

							<b>Project in bhubaneswar</b>
							<Box mt="2rem" width="100%">
								<Counter
									details={[
										{ label: 'Apartment' },
										{ label: 'Independent House' },
										{ label: 'Land' },
									]}
								/>
							</Box>
							{/* <p className={classes.description}>
								Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Quae ut eum, nisi eveniet unde
							</p>
							<Box>
								<Link className={classes.link} to="/">
									View all &#8594;
								</Link>
							</Box> */}
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<BusinessIcon className={classes.icon} />

							<b>Resale property in bhubaneswar</b>
							<Box mt="2rem" width="100%">
								<Counter
									details={[
										{ label: 'Apartment' },
										{ label: 'Independent House' },
										{ label: 'Land' },
									]}
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<LocationCityIcon className={classes.icon} />

							<b>Rental property in bhubaneswar</b>
							<Box mt="2rem" width="100%">
								<Counter
									details={[
										{ label: 'Apartment' },
										{ label: 'Independent House' },
										{ label: 'Guest House' },
										{ label: 'Hostel' },
										{ label: 'PG' },
									]}
								/>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Benifits;
