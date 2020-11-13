import { makeStyles, useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Query from '../../components/query/query.component';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

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
		backgroundColor: '#000000',
		color: '#ffffff',
	},
}));

export default function FullWidthTabs() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<div className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				indicatorColor="primary"
				classes={{
					indicator: classes.indicator,
				}}
				aria-label="full width tabs example"
			>
				<Tab
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					label="Your Properties"
					{...a11yProps(0)}
				/>
				<Tab
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					label="Your Queries"
					{...a11yProps(1)}
				/>
				<Tab
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
					label="Query Received"
					{...a11yProps(2)}
				/>
			</Tabs>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					Your Properties
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					{Array.from(Array(5).keys()).map((c) => (
						<Box key={c}>
							<Query />
						</Box>
					))}
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					{Array.from(Array(5).keys()).map((c) => (
						<Box key={c}>
							<Query received />
						</Box>
					))}
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}
