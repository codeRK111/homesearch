import ApartmentIcon from '@material-ui/icons/Apartment';
import Box from '@material-ui/core/Box';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LandscapeIcon from '@material-ui/icons/Landscape';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Icons




function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	wrapper: {
		textTransform: 'none',
		fontWeight: 'bold',
	},
	indicator: {
		backgroundColor: theme.colorOne,
	},
	selected: {
		color: theme.colorOne,
	},
	paper: {
		backgroundColor: '#ffffff',
		color: '#000000',
	},
}));

export default function FullWidthTabs({ value, handleChange }) {
	const classes = useStyles();

	return (
		<Paper elevation={3} className={classes.paper}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				variant="fullWidth"
				aria-label="full width tabs example"
				classes={{
					indicator: classes.indicator,
				}}
			>
				<Tab
					label="Apartment"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					icon={<ApartmentIcon />}
				/>
				<Tab
					label="Land"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					icon={<LandscapeIcon />}
				/>
				<Tab
					label="Villa"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					icon={<HomeWorkIcon />}
				/>
			</Tabs>
		</Paper>
	);
}
