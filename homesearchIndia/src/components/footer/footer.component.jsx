import { Avatar, Box, Grid } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from 'react-router-dom';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';

// Custom components
// import BottomNavigation from '../bottomNavigation/bottomNavigation.component';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: 'rgba(0,0,0,0.9)',
		color: '#ffffff',
	},
	link: {
		color: '#ffffff',
		textDecoration: 'none',
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

				<Grid item xs={6} md={2}>
					<h3>Overview</h3>
					<Box>
						<Link className={classes.link} to="/">
							About us
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Careers
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Terms & Conditions
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Privacy Policy
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Rental Agreement
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Testimonials
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={2}>
					<h3>Network sites</h3>
					<Box>
						<Link className={classes.link} to="/">
							About us
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Careers
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Terms & Conditions
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Privacy Policy
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Rental Agreement
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Testimonials
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={2}>
					<h3>Contact Us</h3>
					<Box>
						<Link className={classes.link} to="/">
							Contact Us
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Corporate Enquiry
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Facebook
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							LinkedIn
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Instagram
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={2}>
					<h3>Follow Us</h3>
					<Box display="flex" alignItems="center">
						<Avatar className={classes.avatar}>
							<FacebookIcon className={classes.iconFb} />
						</Avatar>
						<Link className={classes.link} to="/">
							Share on facebook
						</Link>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<Avatar className={classes.avatar}>
							<TwitterIcon className={classes.iconTw} />
						</Avatar>
						<Link className={classes.link} to="/">
							Share on twitter
						</Link>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<Avatar className={classes.avatar}>
							<InstagramIcon className={classes.iconIn} />
						</Avatar>
						<Link className={classes.link} to="/">
							Share on instagram
						</Link>
					</Box>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<h3>HomesearchIndia on mobile</h3>
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
							<p>
								Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Dolorem nihil, molestias ab
								facere ad impedit temporibus architecto vel quis
								pariatur, aliquid laborum nulla iure minus,
								eligendi inventore cupiditate ex ullam
								voluptatum fuga sed. Eum blanditiis earum rerum
								optio sint. Quos eum magnam, nisi vitae dicta
								ipsa corrupti quia rem ipsam.
							</p>
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
