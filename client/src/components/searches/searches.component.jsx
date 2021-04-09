import { Box, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
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
				<Grid item xs={6} md={4}>
					<h5>Apartment for rent</h5>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Bengaluru
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Delhi
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Apartment in Mumbai
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={4}>
					<h5>PG & Hostel for rent</h5>
					<Box>
						<Link className={classes.link} to="/">
							Hostel in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Hostel in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Hostel in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Hostel in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							PG in Bengaluru
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							PG in Delhi
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							PG in Mumbai
						</Link>
					</Box>
				</Grid>
				<Grid item xs={6} md={4}>
					<h5>Villa</h5>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Gurgaon
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Pune
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Hyderabad
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Noida
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Bengaluru
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Delhi
						</Link>
					</Box>
					<Box>
						<Link className={classes.link} to="/">
							Villa in Mumbai
						</Link>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Footer;
