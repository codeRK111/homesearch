import { Box } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../../redux/city/city.selectors';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useGlobalClasses from '../../../common.style';
import useStyles from './chip.style';

const Chip = ({
	options,
	onSet,
	children,
	value,
	placeholder,
	size = 150,
	searchLocationLoading,
	searchLocations,
	city,
	setSnackbar,
	...otherProps
}) => {
	const [open, setOpen] = React.useState(false);
	const [cities, setCities] = React.useState([]);
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [asyncError, setAsyncError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const toggelTooltip = () => {
		setOpen(!open);
	};
	const classes = useStyles(size);
	const gClasses = useGlobalClasses();

	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setCities(data);
			if (data.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
		} else {
			setNoResults(false);
			setAsyncError(data);
		}
	};

	const handleCity = (e) => {
		const { value } = e.target;
		setUserTypedCity(value);
		if (value.length === 3 || value.length >= 5) {
			if (city.id) {
				searchLocations(handleFetchCities, value, city.id);
			} else {
				setSnackbar({
					open: true,
					message: 'Please select a city',
					severity: 'error',
				});
				setOpen(false);
			}
		}
	};

	React.useEffect(() => {
		if (userTypedCity === '') {
			setCities([]);
		}
	}, [userTypedCity]);
	React.useEffect(() => {
		setUserTypedCity('');
	}, [open]);

	const handleClickAway = () => {
		const elem = document.querySelector('#search');
		if (elem === document.activeElement) {
			return;
		}
		setOpen(false);
	};

	return (
		<ClickAwayListener
			onClickAway={handleClickAway}
			disableReactTree={true}
			touchEvent={false}
		>
			<Tooltip
				classes={{
					tooltip: classes.tooltip,
				}}
				title={
					<>
						<input
							type="text"
							id="search"
							placeholder="Search For Location"
							onChange={handleCity}
							value={userTypedCity}
							className={classes.input}
						/>
						<Box mt="1rem">
							{asyncError && (
								<p className={gClasses.colorWarning}>
									{asyncError}
								</p>
							)}
							{noResults ? (
								<p
									className={clsx(
										gClasses.justifyCenter,
										classes.noResult
									)}
								>
									No Results Found
								</p>
							) : (
								cities.map((c, i) => (
									<Box
										className={classes.optionWrapper}
										key={i}
										onClick={() => {
											onSet(c);
											handleTooltipClose();
										}}
									>
										{c.name}
									</Box>
								))
							)}
						</Box>
					</>
				}
				placement="bottom-end"
				PopperProps={{
					popperOptions: {
						modifiers: {
							flip: { enabled: false },
							offset: {
								enabled: false,
							},
						},
					},
				}}
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				interactive
			>
				<div onClick={toggelTooltip} className={classes.shadow}>
					{value.name ? value.name : placeholder}
					<ExpandMoreIcon />
				</div>
			</Tooltip>
		</ClickAwayListener>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
	searchLocationLoading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name, city) =>
		dispatch(searchLocations({ name, callback, city })),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chip);
