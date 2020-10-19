import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: theme.fontColorThree,
		color: '#000000',
	},
	link: {
		color: '#000000',
		textDecoration: 'none',
		fontSize: '13px',
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
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<Box className={classes.wrapper} p="2rem">
			<Box display="flex" alignItems="center" justifyContent="center">
				<h2>Popular Links</h2>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={6} md={3}>
					<h5>City Property</h5>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<h5>Top Links</h5>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<h5>Top Builders</h5>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={3}>
					<h5>Recent Projects</h5>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							1 BHK Flat in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							2 BHK Flat in Pune
						</Link>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Footer;
