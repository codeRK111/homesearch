import { Box, Typography } from '@material-ui/core';
import { searchCities, setDefaultCity } from '../../redux/city/city.actions';
import {
	selectDefaultCity,
	selectSearchCityLoading,
} from '../../redux/city/city.selectors';

import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

// Redux

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	button: {
		textTransform: 'none',
		marginLeft: '1rem',
		border: '1px solid #cccccc',
	},
	icon: {
		fontSize: '18px',
		marginRight: '0.5rem',
		color: theme.colorOne,
	},
	buttonText: {
		display: 'flex',
		alignItems: 'center',
		color: '#707070',
	},
	paperWrapper: {
		maxHeight: '400px',
		overflowY: 'auto',
		width: '100%',
	},
	input: {
		border: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	searchWrapper: {
		display: 'flex',
		border: '1px solid #cccccc',
		margin: '0.3rem',
		alignItems: 'center',
	},
	searchIcon: {
		color: '#c1c1c1',
		marginRight: '0.3rem',
	},
	cRed: {
		color: 'red',
	},
	textCenter: {},
}));

function CityDropDown({
	searchCityLoading,
	searchCities,
	setDefaultCity,
	handleCity,
	defaultCity,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [cityText, setCityText] = React.useState('');
	const [asyncError, setAsyncError] = React.useState(null);
	const [cities, setCities] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setCities(data);
			console.log(data);
			setOpen(true);
		} else {
			setAsyncError(data);
		}
	};
	const handleChange = (e) => setCityText(e.target.value);
	const onKeyUp = (e) => {
		if (e.target.value.trim().length > 3) {
			console.log(cityText);
			searchCities(handleFetchCities, cityText);
		}
	};
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const onClick = (data) => (e) => {
		setDefaultCity(data);
		handleClose(e);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.button}
				>
					<div className={classes.buttonText}>
						<RoomRoundedIcon className={classes.icon} />
						<span>{defaultCity.name}</span>
						<ArrowDropDownOutlinedIcon />
					</div>
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
					style={{
						zIndex: '10000',
					}}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom',
							}}
						>
							<Paper
								elevation={3}
								className={classes.paperWrapper}
							>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<Box
											p="0.3rem"
											className={classes.searchWrapper}
										>
											<FontAwesomeIcon
												icon={faSearch}
												className={classes.searchIcon}
											/>
											<input
												type="text"
												className={classes.input}
												placeholder="Enter 4 letter of the city"
												value={cityText}
												onChange={handleChange}
												onKeyUp={onKeyUp}
											/>
										</Box>
										{asyncError && (
											<p className={classes.cRed}>
												{asyncError}
											</p>
										)}
										{/* <MenuItem
											onClick={onClick('Bhubaneswar')}
										>
											Bhubaneswar
										</MenuItem> */}
										{searchCityLoading && (
											<Typography
												component="h5"
												align="center"
											>
												Loading...
											</Typography>
										)}
										{cities.map((c) => (
											<MenuItem
												key={c.id}
												onClick={onClick(c)}
											>
												{c.name}
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	searchCityLoading: selectSearchCityLoading,
	defaultCity: selectDefaultCity,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
	setDefaultCity: (data) => dispatch(setDefaultCity(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityDropDown);
