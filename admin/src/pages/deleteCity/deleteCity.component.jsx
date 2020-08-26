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
	selectFetchCityDependenciesLoading as cityDependenciesLoading,
	selectDeleteCityLoading as deleteLoading,
} from '../../redux/city/city.selector';
import {
	fetchCityDependenciesStart as cityDependencies,
	deleteCityStart as cityDelete,
} from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const initialState = {
	propertiesCount: 'Calculating',
	locationsCount: 'Calculating',
	secureDelete: false,
};

const EditComponent = ({
	cityDependenciesLoading,
	fetchCityDependencies,
	deleteLoading,
	cityDelete,
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState('');
	const [cityDependencies, setCityDependencies] = React.useState(
		initialState
	);
	const handleCityDependencies = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCityDependencies(data);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const handleCityDelete = (type, data) => {
		if (type === 'success') {
			history.goBack();
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (id) {
			fetchCityDependencies(id, handleCityDependencies);
		}
	}, [id]);

	const deleteCityClick = () => {
		cityDelete(id, handleCityDelete);
	};

	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={cityDependenciesLoading}
			>
				fetching city dependencies ...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={deleteLoading}>
				deleting ...
			</Backdrop>
			<h3>Delete City</h3>
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
											{cityDependencies.propertiesCount}{' '}
											dependencies
										</b>
									</Box>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">
										Location Dependencies :{' '}
									</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<b>
											{cityDependencies.locationsCount}{' '}
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
											{cityDependencies.secureDelete ? (
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
											onClick={deleteCityClick}
											disabled={
												!cityDependencies.secureDelete
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
	cityDependenciesLoading,
	deleteLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityDependencies: (cityId, callback) =>
		dispatch(cityDependencies({ cityId, callback })),
	cityDelete: (cityId, callback) =>
		dispatch(cityDelete({ cityId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
