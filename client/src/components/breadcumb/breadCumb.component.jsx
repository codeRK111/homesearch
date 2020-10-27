import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import ApartmentIcon from '@material-ui/icons/Apartment';

const useStyles = makeStyles((theme) => ({
	link: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
		color: theme.colorTwo,
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.8rem',
		},
	},
}));

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
	const classes = useStyles();

	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link
				color="inherit"
				href="/"
				onClick={handleClick}
				className={classes.link}
			>
				<HomeIcon className={classes.icon} />
				Home
			</Link>

			<div className={classes.link}>
				<ApartmentIcon className={classes.icon} />
				Property for sale in Bhubaneswar
			</div>
		</Breadcrumbs>
	);
}
