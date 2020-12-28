import React from 'react';
import { Paper, Popper } from '@material-ui/core';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

// Style
import { useStyles } from './searchLocations.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';

const SearchLocation = ({
	searchLocationLoading,
	searchLocations,
	className,
	onSelect,
	onError,
	...otherProps
}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [location, setLocation] = React.useState('');
	const [locations, setLocations] = React.useState([]);
	const [noData, setNoData] = React.useState(false);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleFetchLocations = (status, data = null) => {
		if (status === 'success') {
			if (onError) {
				onError(null);
			}
			if (data.length > 0) {
				setNoData(false);
			} else {
				setNoData(true);
			}
			setLocations(data);
		} else {
			if (onError) {
				onError(data);
			}
		}
	};

	const onKeyDown = (e) => {
		if (e.target.value.trim().length > 2) {
			searchLocations(handleFetchLocations, e.target.value);
			setAnchorEl(e.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const selectLocation = (data) => (e) => {
		setLocation(data.name);
		setAnchorEl(null);
		if (onSelect) {
			onSelect(data);
		}
	};
	return (
		<React.Fragment>
			<input
				type="text"
				className={className}
				value={location}
				onKeyUp={onKeyDown}
				onChange={(e) => setLocation(e.target.value)}
				{...otherProps}
			/>
			<Popper
				id={id}
				open={open}
				placement="top-start"
				anchorEl={anchorEl}
				popperOptions={{
					positionFixed: true,
				}}
				keepMounted={true}
				style={{
					zIndex: 1000,
				}}
			>
				<Paper elevation={10}>
					{searchLocationLoading ? (
						<div className={classes.locationListWrapper}>
							<h3>Loading ...</h3>
						</div>
					) : (
						<div className={classes.locationListWrapper}>
							{noData ? (
								<div className={classes.locationListWrapper}>
									<h3>No results found</h3>
								</div>
							) : (
								locations.map((c) => (
									<div
										key={c.id}
										className={classes.locationWrapper}
										onClick={selectLocation(c)}
									>
										<RoomRoundedIcon
											className={classes.locationIcon}
										/>
										<span>{c.name}</span>&nbsp; (
										<b>{c.city.name}</b>)
									</div>
								))
							)}
						</div>
					)}
				</Paper>
			</Popper>
		</React.Fragment>
	);
};

const mapStateToProps = createStructuredSelector({
	searchLocationLoading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name) =>
		dispatch(searchLocations({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
