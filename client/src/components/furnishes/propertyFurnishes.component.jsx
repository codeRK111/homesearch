import {
	Backdrop,
	Box,
	CircularProgress,
	Grid,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	selectAmenities,
	selectFurnishes,
	selectGetPropertyResourcesLoading,
} from '../../redux/property/property.selectors';

import Amenity from '../v2/amenity/amenity.component';
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
	ids = [],
	loader = null,
	type = 'furnish',
}) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (furnishes.length === 0) {
			getPropertyResources(console.log);
		}
	}, [furnishes, getPropertyResources]);
	const data = type === 'furnish' ? furnishes : amenities;
	const resources = data.filter((c) => ids.includes(c.id));
	return (
		<div>
			{propertyResourcesLoading && loader ? (
				loader
			) : (
				<Backdrop
					className={classes.backdrop}
					open={propertyResourcesLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			<Grid container spacing={3}>
				{resources.length === 0 ? (
					<Typography>Not Available</Typography>
				) : (
					resources.map((b) => {
						return (
							<Grid item xs={6} md={3} key={b.id}>
								<Amenity text={b.name} />
							</Grid>
						);
					})
				)}
			</Grid>
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
