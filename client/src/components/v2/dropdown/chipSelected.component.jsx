import { Box } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './chip.style';

const Chip = ({
	options,
	onSet,
	children,
	value,
	placeholder,
	size = 150,
	...otherProps
}) => {
	const [open, setOpen] = React.useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const toggelTooltip = () => {
		setOpen(!open);
	};
	const classes = useStyles(size);

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<Tooltip
				classes={{
					tooltip: classes.tooltip,
				}}
				title={
					<>
						{options.map((c, i) => (
							<Box
								className={classes.optionWrapper}
								key={i}
								onClick={() => {
									onSet(c.value);
									handleTooltipClose();
								}}
							>
								{c.label}
							</Box>
						))}
					</>
				}
				placement="bottom"
				PopperProps={{
					disablePortal: true,
				}}
				onClose={handleTooltipClose}
				open={open}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				interactive
			>
				<div onClick={toggelTooltip} className={classes.shadow}>
					{value ? value : placeholder}
					<ExpandMoreIcon />
				</div>
			</Tooltip>
		</ClickAwayListener>
	);
};

Chip.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Chip;
