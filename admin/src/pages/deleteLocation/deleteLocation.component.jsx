import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectFetchLocationDependenciesLoading as locationDependenciesLoading,
	selectDeleteLocationLoading as deleteLoading,
} from '../../redux/city/city.selector';
import {
	fetchLocationDependenciesStart as locationDependencies,
	deleteLocationStart as locationDelete,
} from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const initialState = {
	propertiesCount: 'Calculating',
	secureDelete: false,
};

const EditComponent = ({
	locationDependenciesLoading,
	fetchLocationDependencies,
	deleteLoading,
	locationDelete,
	match: {
		params: { id },
	},
}) => {
	console.log(id);
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState('');
	const [locationDependencies, setLocationDependencies] = React.useState(
		initialState
	);
	const handleLocationDependencies = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setLocationDependencies(data);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const handleLocationDelete = (type, data) => {
		if (type === 'success') {
			history.goBack();
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (id) {
			fetchLocationDependencies(id, handleLocationDependencies);
		}
	}, [id]);

	const deleteLocationClick = () => {
		locationDelete(id, handleLocationDelete);
	};

	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={locationDependenciesLoading}
			>
				fetching location dependencies ...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={deleteLoading}>
				deleting ...
			</Backdrop>
			<h3>Delete Location</h3>
			<p className="color-red">{asyncError}</p>
			<Paper>
				<Box p="0.5rem">
					<Grid container>
						<Grid item xs={12} md={12} lg={8}>
							<Grid container>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">
										Property Dependencies :
									</Box>
								</Grid>

								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<b>
											{
												locationDependencies.propertiesCount
											}{' '}
											dependencies
										</b>
									</Box>
								</Grid>
							</Grid>

							<Grid container>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">Secure Delete : </Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<b>
											{locationDependencies.secureDelete ? (
												<span className="color-green">
													Yes
												</span>
											) : (
												<span className="color-red">
													No
												</span>
											)}
										</b>
									</Box>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">
										<Button
											className="tarnsform-none"
											color="primary"
											variant="contained"
											onClick={deleteLocationClick}
											disabled={
												!locationDependencies.secureDelete
											}
										>
											Delete
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	locationDependenciesLoading,
	deleteLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchLocationDependencies: (locationId, callback) =>
		dispatch(locationDependencies({ locationId, callback })),
	locationDelete: (locationId, callback) =>
		dispatch(locationDelete({ locationId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
