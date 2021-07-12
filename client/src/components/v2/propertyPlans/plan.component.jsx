import {
	Box,
	Button,
	Chip,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlanSelect from '../planSelect/planSelect.component';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils/render.utils';
import clsx from 'clsx';
import useGlobalStyle from '../../../common.style';
import useStyles from './plans.style';

const price = {
	monthly: 2000,
	annually: 1000,
};

export default function AlertDialogSlide({
	plan,
	setPlan,
	popular = false,
	selected = false,
}) {
	const classes = useStyles();
	const gClasses = useGlobalStyle();
	const [billTime, setBillTime] = React.useState('annually');
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItem = (item) => () => {
		setBillTime(item);
		handleClose();
	};

	return (
		<PlanSelect
			selected={selected}
			onClick={() => setPlan('paid')}
			popular={popular}
		>
			<h4 className={classes.heading}>Sponsor Property Post</h4>
			<Typography variant="caption">
				Lorem ipsum dolor sit amet, consectetur
			</Typography>
			<Box>
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
					endIcon={<ExpandMoreIcon />}
					className={clsx(gClasses.noTransfrom, gClasses.bold)}
				>
					Billed {capitalizeFirstLetter(billTime)}
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleMenuItem('monthly')}>
						&#8377;2000,billed monthy
					</MenuItem>
					<MenuItem onClick={handleMenuItem('annually')}>
						&#8377;1000,billed annually
					</MenuItem>
				</Menu>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				mt="1rem"
			>
				<div className={classes.line}></div>
				<Chip
					label={
						<span className={gClasses.bold}>
							&#8377;{price[billTime]}/month
						</span>
					}
					variant="outlined"
				/>
				<div className={classes.line}></div>
			</Box>
			<ul>
				<li>
					<Typography variant="caption">
						Lorem ipsum dolor sit
					</Typography>
				</li>
				<li>
					<Typography variant="caption">
						tempor incididunt ut
					</Typography>
				</li>
				<li>
					<Typography variant="caption">Ut enim ad minim</Typography>
				</li>
			</ul>
			<Box className={gClasses.justifyCenter} mt="1rem">
				<button className={classes.detailsButton}>View Details</button>
			</Box>
		</PlanSelect>
	);
}
