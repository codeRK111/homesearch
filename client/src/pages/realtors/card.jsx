import {
	Avatar,
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { hideNumber, renderProfileImage } from '../../utils/render.utils';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';

import CallIcon from '@material-ui/icons/Call';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PersonIcon from '@material-ui/icons/Person';
import { addQueryV2 } from '../../utils/asyncQuery';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
import useGlobalStyles from '../../common.style';

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
		height: 60,
		width: 60,
		backgroundColor: theme.palette.primary.main,
	},
	contentWrapper: {
		flexGrow: 1,
		'& > *': {
			lineHeight: 1.5,
			letterSpacing: 1,
			fontWeight: 600,
		},
	},
	primaryBg: {
		backgroundColor: theme.palette.primary,
	},
	button: {
		border: `2px solid ${theme.palette.primary.main}`,
		backgroundColor: 'transparent',
		// padding: '0.5rem 2rem',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: 1,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			color: '#ffffff',
		},
	},
}));

const RealtorCard = ({ realtor, isAuthenticated, toggleLoginPopup, user }) => {
	const style = useStyles();
	const history = useHistory();
	const { bold, link } = useGlobalStyles();

	// State
	const [viewNumberLoading, setViewNumberLoading] = useState(false);
	const [showNumber, setShowNumber] = useState(false);

	const addQuery = async (data, setLoading, callback) => {
		try {
			setLoading(true);
			const resp = await addQueryV2(data);
			setLoading(false);
			callback(null, resp);
		} catch (error) {
			setLoading(false);
			callback(error.message, null);
		}
	};

	const onNumberClick = () => {
		if (!isAuthenticated) {
			toggleLoginPopup(true);
			return;
		}
		if (!showNumber) {
			addQuery(
				{
					queryForUser: realtor._id,
					queryFor: 'agent',
					queryType: 'number',
				},
				setViewNumberLoading,
				(error, data) => {
					if (error) {
						setShowNumber(false);
						return;
					}
					setShowNumber(true);
				}
			);
		}
	};

	return (
		<Paper elevation={5} component={Box} p="1rem" className={style.wrapper}>
			<Avatar
				src={renderProfileImage(realtor.photo, user)}
				className={style.imageWrapper}
			/>
			<Box ml="1rem" className={style.contentWrapper}>
				<Link to={`/realtors/${realtor._id}`} className={link}>
					<Typography variant="h6" className={bold} gutterBottom>
						{realtor.name}
					</Typography>
				</Link>
				<Typography variant="button" display="block" gutterBottom>
					<b>{realtor.companyName}</b>
				</Typography>
				<Typography variant="body2" gutterBottom>
					{realtor.address}
				</Typography>
				<Typography variant="body2" gutterBottom>
					<b>{realtor.propertyCount}</b> Active properties
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
						<Chip
							icon={<LocationCityIcon />}
							key={c._id}
							label={c.name}
							variant="outlined"
						/>
					))}
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<Button
							className={style.button}
							variant="outlined"
							color="primary"
							size="large"
							fullWidth
							startIcon={<CallIcon />}
							onClick={onNumberClick}
							disabled={viewNumberLoading}
							endIcon={
								viewNumberLoading ? (
									<CircularProgress
										size={15}
										color="inherit"
									/>
								) : (
									<></>
								)
							}
						>
							{showNumber
								? realtor.number
								: hideNumber(realtor.number)}
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							className={style.button}
							color="primary"
							size="large"
							fullWidth
							startIcon={<PersonIcon />}
							onClick={() =>
								history.push(`/realtors/${realtor._id}`)
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

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RealtorCard);
