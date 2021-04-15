import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/icons/PostAdd';
import { makeStyles } from '@material-ui/core/styles';
import rent from '../../assets/icons/rent.png';
import sale from '../../assets/icons/sale.png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	staticTooltipLabel: {
		width: 100,
		backgroundColor: '#8e44ad',
		color: '#ffffff',
		padding: '0.3rem',
		fontSize: '0.8rem',
		textAlign: 'center',
	},
	exampleWrapper: {
		zIndex: 5000,
		position: 'fixed',
		marginTop: theme.spacing(3),
		height: 380,
		bottom: 0,
		right: 0,
	},
	radioGroup: {
		margin: theme.spacing(1, 0),
	},
	fab: {
		backgroundColor: '#8e44ad',
		'&:hover': {
			backgroundColor: 'red',
		},
	},
	speedDial: {
		position: 'absolute',
		'&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
		'&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
			top: theme.spacing(2),
			left: theme.spacing(2),
		},
	},
}));

const actions = [
	{
		icon: <img src={rent} alt="rent" />,
		name: 'Post For Rent',
		type: 'rent',
	},
	{
		icon: <img src={sale} alt="sale" />,
		name: 'Post For Sale',
		type: 'sale',
	},
];

export default function SpeedDials() {
	const classes = useStyles();
	const [direction, setDirection] = React.useState('up');
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = React.useState(false);
	const history = useHistory();

	const handleDirectionChange = (event) => {
		setDirection(event.target.value);
	};

	const handleHiddenChange = (event) => {
		setHidden(event.target.checked);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const onClick = (type) => () => {
		handleClose();
		history.push(`/post-property/${type}`);
	};

	return (
		<div className={classes.exampleWrapper}>
			<SpeedDial
				ariaLabel="SpeedDial example"
				className={classes.speedDial}
				hidden={hidden}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				direction={direction}
				classes={{
					fab: classes.fab,
				}}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={onClick(action.type)}
						tooltipOpen
						classes={{
							fab: classes.fab,
							staticTooltipLabel: classes.staticTooltipLabel,
						}}
					/>
				))}
			</SpeedDial>
		</div>
	);
}
