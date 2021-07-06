import { Backdrop, Box, CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	selectAmenities,
	selectFurnishes,
	selectGetPropertyResourcesLoading,
} from '../../redux/property/property.selectors';

import CheckBox from '../formik/checkbox.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyResources } from '../../redux/property/property.actions';
import useStyles from './furnishes.styles';

const FurnishesList = ({
	initialValues,
	propertyResourcesLoading,
	getPropertyResources,
	furnishes,
	amenities,
	showFurnishes,
	component: Component,
	...otherProps
}) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (furnishes.length === 0) {
			getPropertyResources(console.log);
		}
	}, [furnishes, getPropertyResources]);
	return (
		<div>
			{propertyResourcesLoading ? (
				<Backdrop
					className={classes.backdrop}
					open={propertyResourcesLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<Component
					furnishes={furnishes}
					amenities={amenities}
					{...otherProps}
				/>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyResourcesLoading: selectGetPropertyResourcesLoading,
	furnishes: selectFurnishes,
	amenities: selectAmenities,
});

const mapDispatchToProps = (dispatch) => ({
	getPropertyResources: (callback) =>
		dispatch(getPropertyResources({ callback })),
});
export default connect(mapStateToProps, mapDispatchToProps)(FurnishesList);
