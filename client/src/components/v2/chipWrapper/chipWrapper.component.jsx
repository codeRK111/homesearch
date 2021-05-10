import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './chip.style';

const Chip = ({ children }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return <div className={classes.wrapper}>{children}</div>;
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
