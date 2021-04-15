import {
	Box,
	Button,
	LinearProgress,
	Paper,
	Typography,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { profileCompletePercentage } from '../../redux/auth/auth.selectors';
import { useHistory } from 'react-router-dom';
import useStyles from './completeProfile.style';

const CompleteProfile = ({ percentage, children }) => {
	const classes = useStyles();
	const history = useHistory();

	const redirect = (path) => () => {
		history.push(path);
	};
	const message = (
		<Paper className={classes.wrapper}>
			<Typography variant="h6" align="center">
				Please update your profile information
			</Typography>
			<Typography variant="body1" align="center">
				We need to have your name,email,city and phone number to process
				your request.Please update these information in order to post
				property
			</Typography>
			<Box display="flex" justifyContent="center" width="100%" mt="1rem">
				<Typography variant="caption" align="center" color="primary">
					{`${percentage}% Profile Completed`}
				</Typography>
			</Box>
			<Box width="100%" mt={'1rem'}>
				<LinearProgress
					variant="determinate"
					value={percentage}
					classes={{ root: classes.progressBar }}
				/>
			</Box>
			<Box
				width="100%"
				mt={'1rem'}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Box mr="1rem">
					<Button
						variant="contained"
						startIcon={<EditIcon />}
						onClick={redirect('/update-profile')}
					>
						Update Profile
					</Button>
				</Box>
				<Box mr="1rem">
					<Button
						variant="contained"
						startIcon={<HomeIcon />}
						onClick={redirect('/')}
					>
						Home
					</Button>
				</Box>
			</Box>
		</Paper>
	);
	return <div>{percentage === 100 ? children : message}</div>;
};

const mapStateToProps = createStructuredSelector({
	percentage: profileCompletePercentage,
});

export default connect(mapStateToProps)(CompleteProfile);
