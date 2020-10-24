import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
	button: {
		textTransform: 'none',
		marginLeft: '1rem',
		border: '1px solid #cccccc',
	},
	icon: {
		fontSize: '18px',
		marginRight: '0.5rem',
		color: theme.colorOne,
	},
	buttonText: {
		display: 'flex',
		alignItems: 'center',
		color: '#707070',
	},
	paperWrapper: {
		maxHeight: '400px',
		overflowY: 'auto',
		width: '100%',
	},
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [city, selectCity] = React.useState('Bhubaneswar');
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const onClick = (data) => (e) => {
		selectCity(data);
		handleClose(e);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
					className={classes.button}
				>
					<div className={classes.buttonText}>
						<RoomRoundedIcon className={classes.icon} />
						<span>{city}</span>
						<ArrowDropDownOutlinedIcon />
					</div>
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom',
							}}
						>
							<Paper
								elevation={3}
								className={classes.paperWrapper}
							>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem
											onClick={onClick('Bhubaneswar')}
										>
											Bhubaneswar
										</MenuItem>
										<MenuItem onClick={onClick('Mumbai')}>
											Mumbai
										</MenuItem>
										<MenuItem onClick={onClick('Pune')}>
											Pune
										</MenuItem>
										<MenuItem onClick={onClick('Delhi')}>
											Delhi
										</MenuItem>
										<MenuItem
											onClick={onClick('Hyderabad')}
										>
											Hyderabad
										</MenuItem>
										<MenuItem onClick={onClick('Banglore')}>
											Banglore
										</MenuItem>
										<MenuItem onClick={onClick('Noida')}>
											Noida
										</MenuItem>
										<MenuItem onClick={onClick('Kolkata')}>
											Kolkata
										</MenuItem>
										<MenuItem onClick={onClick('Chennai')}>
											Chennai
										</MenuItem>
										<MenuItem onClick={onClick('Jaipur')}>
											Jaipur
										</MenuItem>
										<MenuItem onClick={onClick('Amritsar')}>
											Amritsar
										</MenuItem>
										<MenuItem onClick={onClick('Goa')}>
											Goa
										</MenuItem>
										<MenuItem onClick={onClick('Patna')}>
											Patna
										</MenuItem>
										<MenuItem onClick={onClick('Bhopal')}>
											Bhopal
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}
