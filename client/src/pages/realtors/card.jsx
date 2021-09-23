import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyles from '../../common.style';
import user from '../../assets/demoUser.jfif';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		borderRadius: 20,
		background: theme.shadowColor,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	imageWrapper: {
		height: 75,
		width: 75,
	},
	contentWrapper: {
		flexGrow: 1,
	},
}));

const RealtorCard = () => {
	const style = useStyles();
	const history = useHistory();
	const { bold, link } = useGlobalStyles();
	return (
		<Paper elevation={5} component={Box} p="1rem" className={style.wrapper}>
			<Avatar src={user} className={style.imageWrapper} />
			<Box ml="1rem" className={style.contentWrapper}>
				<Link to={`/realtors/jasa5skd54sd5a465d`} className={link}>
					<Typography variant="h6" className={bold} gutterBottom>
						Lorem ipsum dolor sit amet.
					</Typography>
				</Link>
				<Typography variant="body2" gutterBottom>
					Bhubaneswar,Odisha
				</Typography>
				<Typography variant="body2" gutterBottom>
					<b>10</b> Active properties
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					ID: HSI005
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							fullWidth
							startIcon={<CallIcon />}
						>
							7978 XXXXXX
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							fullWidth
							startIcon={<PersonIcon />}
							onClick={() =>
								history.push(`/realtors/dsad76d7as7d6a`)
							}
						>
							View Profile
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default RealtorCard;
