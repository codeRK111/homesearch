import {
	Box,
	ClickAwayListener,
	TextField as MTextField,
	Paper,
	Popper,
} from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../redux/city/city.actions';
import { selectSearchCityLoading } from '../../redux/city/city.selector';
import useStyles from './search.styles';

const City = ({
	searchCities,
	searchCityLoading,
	setSelectedCity,
	defaultValue = { name: '' },
	showLabel = true,
	name = null,
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const anchorRef = React.useRef(
		`${Math.floor(100000 + Math.random() * 900000)}`
	);
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
			searchCities(handleFetchCities, cityText);
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
		if (name) {
			setSelectedCity(name, data);
		} else {
			setSelectedCity(data);
		}
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
			<Box ref={anchorRef}>
				{showLabel && <Box className={classes.label}>City *</Box>}
				<Box mt="0.3rem">
					<MTextField
						fullWidth
						size="small"
						variant="filled"
						placeholder="Enter 4 letter 0f the city"
						value={cityText}
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
			<Popper open={open} anchorEl={anchorRef.current}>
				<Paper elevation={3} className={classes.parent}>
					<ClickAwayListener onClickAway={handleClose}>
						<Box id="menu-list-grow">
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
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(City);
