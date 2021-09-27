import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';

import Nav from '../../../components/v2/pageNav/nav.component';
import UpdateMyBasicInfo from './updateBasicInfo';
import UpdateMyNumber from './updateNumber';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchUserProfile } from '../../../redux/auth/auth.actions';
import { renderProfileImage } from '../../../utils/render.utils';
import { selectUser } from '../../../redux/auth/auth.selectors';
import { setProfilePhoto } from '../../../utils/asyncUser';
import { setSnackbar } from '../../../redux/ui/ui.actions';
import useStyles from './updateProfile.style';

const UpdateProfilePage = ({ user, setSnackbar, fetchUser }) => {
	const { ProfileWrapper, profileImage, inputFile } = useStyles();
	const cancelToken = useRef(undefined);

	// State
	const [photo, setPhoto] = useState(null);
	const [updatePhotoLoading, setUpdatePhotoLoading] = useState(false);

	const myImage = () => {
		if (photo) {
			return URL.createObjectURL(photo);
		}
		return renderProfileImage(user.photo);
	};

	const fetchMyInfo = () => {
		const token = localStorage.getItem('JWT_CLIENT');
		fetchUser(token, (d) => {});
	};

	const updatePhoto = async (photo) => {
		if (!photo) {
			setSnackbar({
				open: true,
				message: 'Please select a photo',
				severity: 'error',
			});

			return;
		}
		try {
			cancelToken.current = axios.CancelToken.source();

			await setProfilePhoto(
				photo,
				cancelToken.current,
				setUpdatePhotoLoading
			);
			setSnackbar({
				open: true,
				message: 'Photo Updated successfully',
				severity: 'success',
			});
			setPhoto(photo);
			fetchMyInfo();
		} catch (error) {
			setSnackbar({
				open: true,
				message: error,
				severity: 'error',
			});
		}
	};

	const handleImage = (e) => {
		const { files } = e.target;
		updatePhoto(files[0]);
	};

	return (
		<div>
			<Nav />
			<Container component={Box} mt="2rem">
				<div className={ProfileWrapper}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<img
							src={myImage()}
							alt="User"
							className={profileImage}
						/>
						<input
							accept="image/*"
							className={inputFile}
							id="contained-button-file"
							type="file"
							onChange={handleImage}
						/>
						<label htmlFor="contained-button-file">
							<Button
								variant="contained"
								color="primary"
								component="span"
								disabled={updatePhotoLoading}
							>
								{updatePhotoLoading ? (
									<CircularProgress
										size={20}
										color="inherit"
									/>
								) : (
									'Upload'
								)}
							</Button>
						</label>
					</Box>
				</div>
				<Typography variant="h5" align="center">
					Update Basic Info
				</Typography>
				<UpdateMyBasicInfo
					user={user}
					fetchMyInfo={fetchMyInfo}
					updateBasicDetailsLoading={false}
				/>
				<Box mt="2rem">
					<Typography variant="h5" align="center">
						Update Phone Number
					</Typography>
					<UpdateMyNumber user={user} fetchMyInfo={fetchMyInfo} />
				</Box>
			</Container>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePage);
