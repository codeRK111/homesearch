import { Box } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../../redux/city/city.actions';
import { selectSearchCityLoading } from '../../../redux/city/city.selectors';
import useGlobalClasses from '../../../common.style';
import useStyles from './chip.style';

const defaultCities = [
	{
		name: 'Mumbai',
		id: '5f2cf831ab6d0b12da11412c',
	},
	{
		name: 'Delhi',
		id: '5f2cf831ab6d0b12da11412d',
	},
	{
		name: 'Bengaluru',
		id: '5f2cf831ab6d0b12da11412e',
	},
	{
		id: '5f2cf831ab6d0b12da11412f',
		name: 'Ahmedabad',
	},
	{
		id: '5f2cf831ab6d0b12da114130',
		name: 'Hyderabad',
	},
	{
		id: '5f2cf831ab6d0b12da114131',
		name: 'Chennai',
	},
	{
		id: '5f2cf831ab6d0b12da114132',
		name: 'Kolkata',
	},
];

const Chip = ({
	options,
	onSet,
	children,
	value,
	placeholder,
	size = 150,
	searchCityLoading,
	searchCities,
	...otherProps
}) => {
	const [open, setOpen] = React.useState(false);
	const [cities, setCities] = React.useState(defaultCities);
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [asyncError, setAsyncError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);

	const handleTooltipClose = (event) => {
		console.log({ event });
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
			searchCities(handleFetchCities, value);
		}
	};

	React.useEffect(() => {
		if (userTypedCity === '') {
			setCities(defaultCities);
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
							placeholder="Enter City Name"
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
										// gClasses.justifyCenter,
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
				placement="bottom"
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
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chip);
