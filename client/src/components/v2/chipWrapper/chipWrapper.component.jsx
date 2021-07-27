import PropTypes from 'prop-types';
import React from 'react';
import useStyles from './chip.style';

const Chip = ({ children, ...otherProps }) => {
	const classes = useStyles();
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
