import FavoriteIcon from '@material-ui/icons/Favorite';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		transform: 'translateZ(0px)',
		flexGrow: 1,
	},
	exampleWrapper: {
		position: 'relative',
		marginTop: theme.spacing(3),
		height: 380,
	},
	radioGroup: {
		margin: theme.spacing(1, 0),
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
	{ icon: <FileCopyIcon />, name: 'Copy' },
	{ icon: <SaveIcon />, name: 'Save' },
	{ icon: <PrintIcon />, name: 'Print' },
	{ icon: <ShareIcon />, name: 'Share' },
	{ icon: <FavoriteIcon />, name: 'Like' },
];

export default function SpeedDials() {
	const classes = useStyles();
	const [direction, setDirection] = React.useState('up');
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = React.useState(false);

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

	return (
		<div className={classes.root}>
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
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={handleClose}
						/>
					))}
				</SpeedDial>
			</div>
		</div>
	);
}
