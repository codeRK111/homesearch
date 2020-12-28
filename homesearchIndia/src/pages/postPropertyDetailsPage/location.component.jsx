import {
	Box,
	ClickAwayListener,
	TextField as MTextField,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from '../profile/profile.styles';

const City = ({
	searchLocations,
	searchCityLoading,
	setSelectedCity,
	city,
	defaultValue = { name: '' },
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const anchorRef = React.useRef(null);
	const [cityText, setCityText] = React.useState(defaultValue.name);

	const [cities, setCities] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setCities(data);
			console.log(data);
			setOpen(true);
		} else {
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
	return (
		<div>
			<Box p="0.5rem" ref={anchorRef}>
				<Box className={classes.label}>Location *</Box>
				<Box mt="0.3rem">
					<MTextField
						fullWidth
						size="small"
						variant="filled"
						placeholder="Enter 4 letter 0f the location"
						value={cityText}
						name="location"
						onChange={handleChange}
						onKeyUp={onKeyUp}
						inputProps={{
							autocomplete: 'new-password',
							form: {
								autocomplete: 'off',
							},
						}}
					/>
				</Box>
			</Box>
			<Popper open={open} anchorEl={anchorRef.current} keepMounted={true}>
				<Paper elevation={3} className={classes.parent}>
					<ClickAwayListener onClickAway={handleClose}>
						<Box id="menu-list-grow">
							{searchCityLoading && (
								<Typography component="h5" align="center">
									Loading...
								</Typography>
							)}
							{cities.map((c) => (
								<div
									key={c.id}
									onClick={onClick(c)}
									className={classes.item}
								>
									{c.name}
								</div>
							))}
						</Box>
					</ClickAwayListener>
				</Paper>
			</Popper>
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
