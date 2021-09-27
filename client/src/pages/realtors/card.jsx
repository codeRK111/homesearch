import {
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { hideNumber, renderProfileImage } from '../../utils/render.utils';

import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyles from '../../common.style';
import user from '../../assets/demoUser.jfif';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		height: '100%',
		boxSizing: 'border-box',
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

const RealtorCard = ({ realtor }) => {
	const style = useStyles();
	const history = useHistory();
	const { bold, link } = useGlobalStyles();
	return (
		<Paper elevation={5} component={Box} p="1rem" className={style.wrapper}>
			<Avatar
				src={renderProfileImage(realtor.photo, user)}
				className={style.imageWrapper}
			/>
			<Box ml="1rem" className={style.contentWrapper}>
				<Link to={`/realtors/${realtor.id}`} className={link}>
					<Typography variant="h6" className={bold} gutterBottom>
						{realtor.name}
					</Typography>
				</Link>
				<Typography variant="button" display="block" gutterBottom>
					{realtor.companyName}
				</Typography>
				<Typography variant="body2" gutterBottom>
					{realtor.address}
				</Typography>
				<Typography variant="body2" gutterBottom>
					<b>10</b> Active properties
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					ID: {realtor.hsID}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
					marginBottom="1rem"
				>
					{realtor.cities.map((c) => (
						<Chip key={c._id} label={c.name} variant="outlined" />
					))}
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							fullWidth
							startIcon={<CallIcon />}
						>
							{hideNumber(realtor.number)}
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
								history.push(`/realtors/${realtor.id}`)
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
