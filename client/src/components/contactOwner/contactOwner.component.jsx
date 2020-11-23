import {
	Box,
	Button,
	Divider,
	Modal,
	Paper,
	TextField,
} from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'absolute',
		boxShadow: theme.shadows[5],
		width: 600,
		outline: 'none',
		padding: theme.spacing(2, 4, 3),
		[theme.breakpoints.down('sm')]: {
			width: 300,
		},
	},
	icon: {
		color: '#ffffff',
		fontSize: '2rem',
		cursor: 'pointer',
	},
	iconWh: {
		color: '#ffffff',
		cursor: 'pointer',
		marginRight: '0.5rem',
	},
	paper: {
		padding: '1rem',
		width: '100%',
		boxSizing: 'border-box',
	},
	inputWrapper: {
		boxSizing: 'border-box',
	},
	input: {
		width: '100%',
		padding: '1rem 0 1rem 0.5rem',
		border: '1px solid #cccccc',
		boxSizing: 'border-box',
		fontWeight: '700',
	},
	button: {
		padding: '1rem',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		border: 'none',
		textDecoration: 'none',
	},
	heading: {
		textAlign: 'center',
	},
}));
const PropertyShare = ({ status, handleClose }) => {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	return (
		<Modal
			open={status}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{
				backgroundColor: 'rgba(0,0,0,0.7)',
			}}
		>
			<Box style={modalStyle} className={classes.wrapper}>
				<Box display="flex" justifyContent="flex-end" width="100%">
					<HighlightOffIcon
						className={classes.icon}
						onClick={handleClose}
					/>
				</Box>
				<Paper className={classes.paper}>
					<Box p="1rem">
						<Box display="flex" alignItems="center">
							<Box flexGrow={2}>
								<Divider />
							</Box>
							<Box flexGrow={1}>
								<h3 className={classes.heading}>
									Contact owner
								</h3>
							</Box>
							<Box flexGrow={2}>
								<Divider />
							</Box>
						</Box>
						<Box mb="2rem">
							<TextField placeholder="Full Name" fullWidth />
						</Box>
						<Box mt="2rem">
							<TextField
								placeholder="Email"
								type="email"
								fullWidth
							/>
						</Box>
						<Box mt="2rem" mb="2rem">
							<TextField
								placeholder="Phone Number"
								type="number"
								fullWidth
							/>
						</Box>
						<Box
							mt="2rem"
							mb="2rem"
							display="flex"
							justifyContent="center"
						>
							<Button color="primary" variant="contained">
								Submit
							</Button>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Modal>
	);
};

PropertyShare.propTypes = {
	status: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};

export default PropertyShare;