import PropTypes from 'prop-types';
import React from 'react';
import useStyles from './chip.style';

const Chip = ({ title }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<span>{title}</span>
		</div>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
