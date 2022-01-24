import { Box, Checkbox, Divider, FormControlLabel } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyles from '../../../../common.style';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		display: 'block',
		width: '100%',
		zIndex: 100000,
		'&:hover': {
			'& $dropdownContent': {
				display: 'block',
			},
			// backgroundColor: 'red',
		},
	},
	button: {
		display: 'flex',
		width: '100%',
		padding: '1rem 0',
		border: 'none',
		borderRadius: 20,
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		fontSize: '1rem',
		backgroundColor: theme.shadowColor,
	},
	dropdownContent: {
		display: 'none',
		position: 'absolute',
		boxShadow: '12px 12px 24px #bcbcbc,-12px -12px 24px #ffffff',
		backgroundColor: theme.shadowColor,
		borderRadius: 20,
		padding: '1rem',
		height: '50vh',
		overflow: 'auto',
		width: '100%',
		boxSizing: 'border-box',
	},
}));

const BudgetFilter = ({
	pFor,
	rentItems,
	setRentItems,
	otherItems,
	setOtherItems,
}) => {
	const { wrapper, button, dropdownContent } = useStyles();
	const { bold, colorPrimary, pointer, flexCenter } = useGlobalStyles();

	const [selectAll, setSelectAll] = React.useState(false);

	const handleSelectAll = (e) => {
		const { checked } = e.target;
		setSelectAll(checked);

		if (pFor === 'rent') {
			setRentItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		} else {
			setOtherItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		}
	};

	const handleRent = (val) => (e) => {
		const { name, checked } = e.target;

		setRentItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};

	const handleOtherItems = (val) => (e) => {
		const { name, checked } = e.target;

		setOtherItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};
	return (
		<div className={wrapper}>
			<button
				className={clsx(
					button,
					bold,
					colorPrimary,
					pointer,
					flexCenter
				)}
			>
				Budget Type
				<ExpandMoreIcon />
			</button>
			<div className={dropdownContent}>
				<Box>
					<div

					// onClick={click(c, 'L')}
					>
						<FormControlLabel
							control={
								<Checkbox
									name="flat"
									checked={selectAll}
									onChange={handleSelectAll}
									color="primary"
								/>
							}
							label="Select All"
						/>
					</div>
					<Divider />
					{pFor === 'rent'
						? rentItems.map((c, i) => (
								<div
									key={i}

									// onClick={click(c, 'L')}
								>
									<FormControlLabel
										control={
											<Checkbox
												name={c.name}
												checked={c.checked}
												onChange={handleRent(c)}
												color="primary"
											/>
										}
										label={c.name}
									/>
								</div>
						  ))
						: otherItems.map((c, i) => (
								<div
									key={i}

									// onClick={click(c, 'L')}
								>
									<FormControlLabel
										control={
											<Checkbox
												name={c.name}
												checked={c.checked}
												onChange={handleOtherItems(c)}
												size="small"
												color="primary"
											/>
										}
										label={c.name}
									/>
								</div>
						  ))}
				</Box>
			</div>
		</div>
	);
};

export default BudgetFilter;
