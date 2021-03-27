import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BedIcon from '@material-ui/icons/SingleBed';
import ListIcon from '@material-ui/icons/ListAlt';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import { CardHeader, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyResources } from '../../redux/property/property.actions';
import {
	selectAmenities,
	selectGetPropertyResourcesLoading,
} from '../../redux/property/property.selectors';
import NearByPlaces from '../detailsPageNew/nearByPlaces.component';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
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
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	cardHeader: {
		padding: 0,
	},
	gridContainer: {
		display: 'grid',
		height: '100%',
		gridTemplateColumns: ' repeat( auto-fill, minmax(150px, 1fr) )',
		gap: '1rem',
		gridAutoRows: '50px',
	},
	gridItem: {
		backgroundColor: '#c1c1c1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '4px',
		fontSize: '0.9rem',
		padding: '0.2rem',
	},
}));

function ScrollableTabsButtonForce({
	property,
	amenities,
	getPropertyResources,
}) {
	const isSelected = (id) => {
		const isPresent = property.amenities.find((c) => c === id);
		return isPresent ? true : false;
	};
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	React.useEffect(() => {
		if (amenities.length === 0) {
			getPropertyResources(console.log);
		}
	}, [amenities, getPropertyResources]);

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					scrollButtons="on"
					indicatorColor="primary"
					textColor="primary"
					aria-label="scrollable force tabs example"
				>
					<Tab
						label="Amenities"
						icon={<BedIcon />}
						{...a11yProps(0)}
					/>
					<Tab
						label="Legal clearance"
						icon={<ListIcon />}
						{...a11yProps(1)}
					/>
					<Tab
						label="Nearest Places"
						icon={<AirplaneIcon />}
						{...a11yProps(2)}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<div className={classes.gridContainer}>
					{amenities &&
						amenities
							.filter((b) => isSelected(b.id))
							.map((c) => (
								<div key={c} className={classes.gridItem}>
									{c.name}
								</div>
							))}
				</div>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<div className={classes.gridContainer}>
					{property.amenities &&
						property.legalClearance
							.filter((b) => b.value)
							.map((c) => (
								<div key={c} className={classes.gridItem}>
									{c.label}
								</div>
							))}
				</div>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<NearByPlaces property={property} />
			</TabPanel>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	propertyResourcesLoading: selectGetPropertyResourcesLoading,
	amenities: selectAmenities,
});

const mapDispatchToProps = (dispatch) => ({
	getPropertyResources: (callback) =>
		dispatch(getPropertyResources({ callback })),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScrollableTabsButtonForce);
