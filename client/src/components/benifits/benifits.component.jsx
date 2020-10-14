import React from 'react';
import { Grid, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddDisabledRoundedIcon from '@material-ui/icons/PersonAddDisabledRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';

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
		fontSize: '3rem',
		color: theme.colorTwo,
	},
	benifitWrapper: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
}));

const Benifits = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={3}>
			<Grid items xs={12} md={3}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width="75%"
					className={classes.benifitWrapper}
				>
					<Avatar className={classes.avatar}>
						<PersonAddDisabledRoundedIcon
							className={classes.icon}
						/>
					</Avatar>
					<b>Lorem, ipsum dolor.</b>
					<p className={classes.benifit}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rem animi dolor ipsa quaerat, porro sint doloribus
						fugiat consequuntur enim possimus.
					</p>
				</Box>
			</Grid>
			<Grid items xs={12} md={3}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width="75%"
					className={classes.benifitWrapper}
				>
					<Avatar className={classes.avatar}>
						<DescriptionRoundedIcon className={classes.icon} />
					</Avatar>
					<b>Lorem, ipsum dolor.</b>
					<p className={classes.benifit}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rem animi dolor ipsa quaerat, porro sint doloribus
						fugiat consequuntur enim possimus.
					</p>
				</Box>
			</Grid>
			<Grid items xs={12} md={3}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width="75%"
					className={classes.benifitWrapper}
				>
					<Avatar className={classes.avatar}>
						<InsertDriveFileRoundedIcon className={classes.icon} />
					</Avatar>
					<b>Lorem, ipsum dolor.</b>
					<p className={classes.benifit}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rem animi dolor ipsa quaerat, porro sint doloribus
						fugiat consequuntur enim possimus.
					</p>
				</Box>
			</Grid>
			<Grid items xs={12} md={3}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width="75%"
					className={classes.benifitWrapper}
				>
					<Avatar className={classes.avatar}>
						<HomeWorkRoundedIcon className={classes.icon} />
					</Avatar>
					<b>Lorem, ipsum dolor.</b>
					<p className={classes.benifit}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Rem animi dolor ipsa quaerat, porro sint doloribus
						fugiat consequuntur enim possimus.
					</p>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Benifits;
