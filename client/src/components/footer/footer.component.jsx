import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Link, useHistory } from 'react-router-dom';
import {
	capitalizeFirstLetter,
	facbookLink,
	getHostName,
	instagramLink,
} from '../../utils/render.utils';

import FacebookIcon from '@material-ui/icons/Facebook';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';

// Custom components
// import BottomNavigation from '../bottomNavigation/bottomNavigation.component';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: 'rgba(0,0,0,0.9)',
		color: '#ffffff',
		fontFamily: 'CenturyGothic',
	},
	link: {
		color: '#ffffff',
		textDecoration: 'none',
		lineHeight: 1.5,
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
			color: theme.utilColor,
		},
	},
	iconFb: {
		color: '#445494',
		fontSize: '1.2rem',
	},
	iconTw: {
		color: '#3FA9E3',
		fontSize: '1.2rem',
	},
	iconIn: {
		color: '#A015A6',
		fontSize: '1.2rem',
	},
	avatar: {
		backgroundColor: '#ffffff',
		width: theme.spacing(4),
		height: theme.spacing(4),
		marginRight: '0.5rem',
	},
	positionFixed: {
		bottom: 0,
		position: 'fixed',
		top: 'auto',
	},
}));

const Footer = () => {
	const classes = useStyles();
	const history = useHistory();
	const handleTestimonials = (event, value) => {
		// history.push('/');
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#testimonials'
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		// onSearch();
	};
	return (
		<Box className={classes.wrapper} p="2rem">
			<Grid container spacing={3}>
				{/* <Grid item xs={12} md={6}>
					<Box pr="1rem">
						<h3>About Us</h3>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Dolorem nihil, molestias ab facere ad impedit
							temporibus architecto vel quis pariatur, aliquid
							laborum nulla iure minus, eligendi inventore
							cupiditate ex ullam voluptatum fuga sed. Eum
							blanditiis earum rerum optio sint. Quos eum magnam,
							nisi vitae dicta ipsa corrupti quia rem ipsam.
						</p>
					</Box>
				</Grid> */}

				<Grid item xs={6} md={3}>
					<h3>Overview</h3>
					<Box>
						<Link className={classes.link} to="/about-us">
							About us
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Careers
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/terms">
							Terms & Conditions
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/privacy">
							Privacy Policy
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/refund">
							Refund & Cancelation Policy
						</Link>
					</Box>

					<Box>
						<span
							className={classes.link}
							onClick={handleTestimonials}
						>
							Testimonials
						</span>
					</Box>
				</Grid>

				<Grid item xs={6} md={2}>
					<h3>Contact Us</h3>
					<Box>
						<Link className={classes.link} to="/contact-us">
							Contact Us
						</Link>
					</Box>

					<Box>
						<a
							className={classes.link}
							target="_blank"
							href={facbookLink[getHostName()]}
							rel="noopener noreferrer"
						>
							Facebook
						</a>
					</Box>

					<Box>
						<a
							className={classes.link}
							target="_blank"
							href={instagramLink[getHostName()]}
							rel="noopener noreferrer"
						>
							Instagram
						</a>
					</Box>
				</Grid>
				<Grid item xs={6} md={2}>
					<h3>Follow Us</h3>
					<FacebookShareButton
						url={`https://${getHostName()}`}
						quote={`${capitalizeFirstLetter(
							getHostName()
						)} is the fastest growing India's most innovative real estate advertising platform for homebuyers, landlords, developers, and real estate brokers with world extending services to all property hunters.`}
					>
						<Box display="flex" alignItems="center">
							<Avatar className={classes.avatar}>
								<FacebookIcon className={classes.iconFb} />
							</Avatar>
							<span className={classes.link}>
								Share on facebook
							</span>
						</Box>
					</FacebookShareButton>
					<TwitterShareButton
						url={`https://${getHostName()}`}
						title={`${capitalizeFirstLetter(
							getHostName()
						)} is the fastest growing India's most innovative real estate advertising platform for homebuyers, landlords, developers, and real estate brokers with world extending services to all property hunters.`}
					>
						<Box display="flex" alignItems="center" mt="1rem">
							<Avatar className={classes.avatar}>
								<TwitterIcon className={classes.iconTw} />
							</Avatar>
							<Link className={classes.link} to="/">
								Share on twitter
							</Link>
						</Box>
					</TwitterShareButton>

					{/* <Box display="flex" alignItems="center" mt="1rem">
						<Avatar className={classes.avatar}>
							<InstagramIcon className={classes.iconIn} />
						</Avatar>
						<Link className={classes.link} to="/">
							Share on instagram
						</Link>
					</Box> */}
				</Grid>
				<Grid item xs={12} md={4}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<h3>
							{capitalizeFirstLetter(getHostName())} on mobile
						</h3>
					</Box>

					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<img
							src={require('../../assets/google-play.webp')}
							alt="google-play"
						/>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<span>Coming soon</span>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						mt="1rem"
						justifyContent="center"
					>
						<img
							src={require('../../assets/app-store.webp')}
							alt="app-store"
						/>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<span>Coming soon</span>
					</Box>
				</Grid>
			</Grid>
			<Box mt="1rem">
				<Grid container>
					<Grid item xs={12}>
						<Box pr="1rem">
							<h3>About Us</h3>
							<Typography variant="caption">
								{getHostName()} is the fastest growing
								India&#39;s most innovative real estate
								advertising platform for homebuyers, landlords,
								developers, and real estate brokers with world
								extending services to all property hunters. The
								webvsite offers listings for new homes, resale
								homes, rentals, plots and residential projects
								in pan India.But often he misses some critical
								pieces of the puzzle. If you are fed up with the
								countless online options and fake listings, your
								search for the perfect property and a great
								success of real estate investing lies in finding
								out the best property and tenants ends here.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
			{/* <AppBar
				position="fixed"
				classes={{
					positionFixed: classes.positionFixed,
				}}
			>
				<BottomNavigation />
			</AppBar> */}
		</Box>
	);
};

export default Footer;
