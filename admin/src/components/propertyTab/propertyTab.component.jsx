import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropertyOneBHK from '../propertyOneBHK/propertyOneBHK.component';

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

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function PropertyTabs(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	useEffect(() => {
		console.log('clickedd');
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const label = (name) => <b>{name}</b>;

	return (
		<div className={classes.root}>
			<div position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label={label('1 BHK')} {...a11yProps(0)} />
					<Tab label={label('2 BHK')} {...a11yProps(1)} />
					<Tab label={label('3 BHK')} {...a11yProps(2)} />
				</Tabs>
			</div>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Box>
						<PropertyOneBHK bhk={1} {...props} />
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<PropertyOneBHK bhk={2} {...props} />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<PropertyOneBHK bhk={3} {...props} />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}
