import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './chip.style';

const Chip = ({ children, ...otherProps }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper} {...otherProps}>
			{children}
		</div>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
