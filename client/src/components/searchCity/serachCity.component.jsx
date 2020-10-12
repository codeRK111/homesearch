/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Custopm components
import ErrorMessage from '../errorMessage/errorMessage.component';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../redux/city/city.actions';
import { selectSearchCityLoading } from '../../redux/city/city.selectors';

const useStyles = makeStyles({
	option: {
		fontSize: 15,
		color: '#000000',
		backgroundColor: '#cccccc',
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
	popper: {
		backgroundColor: '#cccccc',
	},
});

function SearchCity({ searchCityLoading, searchCities, setCity }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [city, selectedCity] = React.useState('');
	const [cities, setCities] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState(null);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setCities(data);
			setOpen(true);
		} else {
			setAsyncError(data);
			setOpen(false);
		}
	};

	const handleCity = (e) => {
		const { value } = e.target;
		selectedCity(value);
		if (value.length === 3 || value.length === 5) {
			searchCities(handleFetchCities, value);
		}
	};
	return (
		<div>
			{asyncError && (
				<ErrorMessage
					message={asyncError}
					onClear={() => setAsyncError(null)}
				/>
			)}
			<Autocomplete
				fullWidth
				open={open}
				id="free-solo-demo"
				freeSolo
				loading={searchCityLoading}
				classes={{
					option: classes.option,
					popper: classes.popper,
				}}
				onClose={(_) => setOpen(false)}
				options={cities}
				getOptionLabel={(option) => option.name}
				onChange={(e, n) => {
					setCity(n.id);
				}}
				onInputChange={(e, v, r) => {
					console.log(e.target.value);
					if (r === 'clear') {
						setOpen(false);
					}
				}}
				renderOption={(option) => (
					<React.Fragment>
						<LocationOnIcon />
						{option.name}
					</React.Fragment>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="City*"
						margin="normal"
						variant="outlined"
						onChange={handleCity}
						value={city}
					/>
				)}
			/>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCity);
