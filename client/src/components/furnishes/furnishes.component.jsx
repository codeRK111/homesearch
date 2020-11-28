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
}) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (furnishes.length === 0) {
			getPropertyResources(console.log);
		}
	}, [furnishes, getPropertyResources]);
	return (
		<div>
			<Backdrop
				className={classes.backdrop}
				open={propertyResourcesLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{showFurnishes && (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Box mt="1rem" mb="0.5rem">
							<b>Furnishes</b>
						</Box>
					</Grid>
					{furnishes.map((c) => (
						<Grid item xs={6} md={3} key={c.id}>
							<CheckBox
								type="checkbox"
								name="furnishes"
								value={c.id}
								formLabel={c.name}
							/>
						</Grid>
					))}
				</Grid>
			)}

			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Box mt="1rem" mb="0.5rem">
						<b>Amenities</b>
					</Box>
				</Grid>
				{amenities.map((c) => (
					<Grid item xs={6} md={3} key={c.id}>
						<CheckBox
							type="checkbox"
							name="amenities"
							value={c.id}
							formLabel={c.name}
						/>
					</Grid>
				))}
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
