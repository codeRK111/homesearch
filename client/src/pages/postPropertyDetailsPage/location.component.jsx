import { Box, TextField as MTextField } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from '../profile/profile.styles';
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import './menu.css';
const City = ({
	searchLocations,
	searchCityLoading,
	setSelectedCity,
	city,
	defaultValue = { name: '' },
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [fetchCompleted, setFetchComplted] = React.useState(false);
	const [errorText, setErrorText] = React.useState('');

	const anchorRef = React.useRef(null);
	const [cityText, setCityText] = React.useState(defaultValue.name);

	const [cities, setCities] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setCities(data);
			setOpen(true);
			setFetchComplted(true);
		} else {
			setFetchComplted(false);
		}
	};
	const handleChange = (e) => setCityText(e.target.value);
	const onKeyUp = (e) => {
		if (e.target.value.trim().length > 3) {
			console.log(cityText);
			if (city) {
				searchLocations(handleFetchCities, cityText, city);
			}
		}
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const onClick = (data) => (e) => {
		handleClose(e);
		setCityText(data.name);
		setSelectedCity(data);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);
	React.useEffect(() => {
		if (fetchCompleted && cities.length === 0) {
			setErrorText('No Location Found');
		} else if (fetchCompleted && cities.length !== 0) {
			setErrorText('');
		}
	}, [fetchCompleted, cities]);
	return (
		<div>
			<Box p="0.5rem" ref={anchorRef}>
				<Box className={classes.label}>Location *</Box>
				<Box mt="0.3rem">
					<MTextField
						error={!!errorText}
						fullWidth
						size="small"
						variant="filled"
						placeholder="Enter 4 letter of the location"
						value={cityText}
						name="location"
						onChange={handleChange}
						helperText={errorText}
						onKeyUp={onKeyUp}
						inputProps={{
							autocomplete: 'new-password',
							form: {
								autocomplete: 'off',
							},
						}}
					/>
					<ControlledMenu
						anchorRef={anchorRef}
						isOpen={open || searchCityLoading}
						onClose={handleClose}
						styles={{
							border: '1px solid #c1c1c1',
							width: '100%',
						}}
						arrow={true}
					>
						<MenuItem disabled>Select Location</MenuItem>
						{cities.map((c) => (
							<MenuItem key={c.id} onClick={onClick(c)}>
								<LocationOnIcon
									fontSize="small"
									color="primary"
								/>
								{c.name}
							</MenuItem>
						))}
					</ControlledMenu>
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	searchCityLoading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name, city) =>
		dispatch(searchLocations({ name, city, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(City);
