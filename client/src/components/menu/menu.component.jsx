import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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
		borderLeft: '1px solid #cccccc',
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
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const goToProfilePage = (e) => {
		handleClose(e);
		history.push('/profile');
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
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
						<PersonIcon className={classes.icon} />
						<span>Account</span>
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
							<Paper elevation={3}>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="menu-list-grow"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={goToProfilePage}>
											Profile
										</MenuItem>
										<MenuItem onClick={handleClose}>
											My account
										</MenuItem>
										<MenuItem onClick={handleClose}>
											Logout
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
