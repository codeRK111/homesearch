import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
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
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
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
		backgroundColor: '#000000',
		color: '#ffffff',
	},
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (_, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
					indicatorColor="primary"
					classes={{
						indicator: classes.indicator,
					}}
				>
					<Tab
						label="Floor plan 1"
						{...a11yProps(0)}
						classes={{
							wrapper: classes.wrapper,
							selected: classes.selected,
						}}
					/>
					<Tab
						label="Floor plan 2"
						{...a11yProps(1)}
						classes={{
							wrapper: classes.wrapper,
							selected: classes.selected,
						}}
					/>
				</Tabs>
			</Paper>
			<TabPanel value={value} index={0}>
				Floor plan 1
			</TabPanel>
			<TabPanel value={value} index={1}>
				Floor plan 2
			</TabPanel>
		</div>
	);
}
