import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useStyles from './chip.style';

// import useGlobalStyles from '../../../common.style';


const Chip = ({ children, selected, ...otherProps }) => {
	const classes = useStyles();
	// const globalClasses = useGlobalStyles();
	return (
		<div
			className={clsx(classes.wrapper, {
				[classes.selected]: selected,
			})}
			{...otherProps}
		>
			{children}
		</div>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
