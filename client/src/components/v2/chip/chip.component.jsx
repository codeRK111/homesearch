import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './chip.style';

const Chip = ({ title, selected = false }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper}>
			<span
				className={clsx({ [globalClasses.colorSecondary]: selected })}
			>
				{title}
			</span>
		</div>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
