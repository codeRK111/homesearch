import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
	benifit: {
		color: theme.fontColor,
		textAlign: 'center',
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
		fontSize: '4rem',
		color: theme.fontColorTwo,
		transition: '0.5s all ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.3)',
			color: theme.colorOne,
		},
	},
	benifitWrapper: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginTop: '1rem',
		},
	},
}));

const Benifits = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={3}>
			<Grid items xs={12} md={4}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					className={classes.benifitWrapper}
				>
					<BusinessIcon className={classes.icon} />

					<b>New Project</b>
				</Box>
			</Grid>
			<Grid items xs={12} md={4}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					className={classes.benifitWrapper}
				>
					<MonetizationOnIcon className={classes.icon} />

					<b>Home Loan</b>
				</Box>
			</Grid>
			<Grid items xs={12} md={4}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					className={classes.benifitWrapper}
				>
					<HomeIcon className={classes.icon} />
					<b>Home Interirors</b>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Benifits;
