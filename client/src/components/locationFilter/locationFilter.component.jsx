import { Checkbox, FormControlLabel } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';
import useStyles from './locationFilter.styles';

// Redux

// STyles

function MenuListComposition({
	currentTab,
	searchLocations,
	loading,
	city,
	existingLocations = [],
	handleLocations,
	setLocationData,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [locations, setLocations] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState(null);
	const anchorRef = React.useRef(null);
	const handleFetchLocations = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setLocations(data);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (city) {
			searchLocations(handleFetchLocations, '', city);
		}
	}, [city]);
	React.useEffect(() => {
		setLocationData(
			locations.filter((c) => existingLocations.includes(c.id))
		);
	}, [existingLocations, locations, setLocationData]);
	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const toggleOpen = (_) => setOpen(!open);
	const handleChangeCheckbox = (data) => (e) => {
		const { checked } = e.target;
		console.log(data);
		console.log(checked);
		if (checked) {
			if (existingLocations.length < 3) {
				console.log('object');
				handleLocations((prevState) => [...prevState, data]);
			}
		} else {
			handleLocations((prevSTate) => prevSTate.filter((c) => c !== data));
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

	console.log(existingLocations);

	const renderPropertyTypes = () => {
		return locations.map((c) => (
			<div key={c.id}>
				<FormControlLabel
					control={
						<Checkbox
							checked={Boolean(
								existingLocations.find((b) => b === c.id)
							)}
							onChange={handleChangeCheckbox(c.id)}
						/>
					}
					label={c.name}
				/>
			</div>
		));
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
				Locations
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
								{renderPropertyTypes()}
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
	loading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name, city) =>
		dispatch(searchLocations({ name, callback, city })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuListComposition);
