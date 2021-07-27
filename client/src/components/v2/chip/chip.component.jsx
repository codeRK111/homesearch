import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './chip.style';

const Chip = ({ title, selected = false, ...otherProps }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.wrapper} {...otherProps}>
			<span
				className={clsx(classes.chipText, {
					[globalClasses.colorSecondary]: selected,
				})}
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
