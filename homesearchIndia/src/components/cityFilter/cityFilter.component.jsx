import { MenuItem, Typography } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchCities } from '../../redux/city/city.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectSearchCityLoading } from '../../redux/city/city.selectors';
import useStyles from './cityFilter.styles';

const locations = [
	'Patia',
	'SunderPada',
	'Jaydev Vihar',
	'Nayapali',
	'KhandaGiri',
	'Dumduma',
	'cs pur',
	'Damana',
	'Niladribihar',
	'Rasulgarh',
	'Vani bihar',
];

function MenuListComposition({
	currentTab,
	searchCities,
	searchCityLoading,
	city,
	handleCity,
}) {
	const classes = useStyles();
	const [cityText, setCityText] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const [cities, setCities] = React.useState([]);

	const anchorRef = React.useRef(null);
	const handleChange = (e) => setCityText(e.target.value);

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

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

	const onKeyUp = (e) => {
		if (e.target.value.trim().length > 3) {
			console.log(cityText);
			searchCities(handleFetchCities, cityText);
		}
	};

	const toggleOpen = (_) => setOpen(!open);

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const onClick = (data) => (e) => {
		handleCity(data);
		handleClose(e);
	};

	return (
		<Box height="100%" width="100%" className={classes.wrapper}>
			<Box
				display="flex"
				ref={anchorRef}
				height="100%"
				alignItems="center"
				width="100%"
				justifyContent="center"
				className={classes.buttonWrapper}
				onClick={toggleOpen}
			>
				{city.name}
				<ExpandMoreIcon />
			</Box>

			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{
					zIndex: 1000,
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
						<ClickAwayListener
							onClickAway={handleClose}
							mouseEvent="onMouseDown"
							touchEvent="onTouchStart"
						>
							<Paper
								elevation={3}
								onMouseLeave={handleClose}
								className={classes.valueWrapper}
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
										autoComplete="new-password"
									/>
								</Box>
								<Box>
									{asyncError && (
										<p className={classes.cRed}>
											{asyncError}
										</p>
									)}
								</Box>
								<Box>
									{searchCityLoading && (
										<Typography
											component="h5"
											align="center"
										>
											Loading...
										</Typography>
									)}
								</Box>
								<Box>
									{cities.map((c) => (
										<MenuItem
											key={c.id}
											onClick={onClick(c)}
										>
											{c.name}
										</MenuItem>
									))}
								</Box>
								{/* {renderPropertyTypes()} */}
							</Paper>
						</ClickAwayListener>
					</Grow>
				)}
			</Popper>
		</Box>
	);
}

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuListComposition);
