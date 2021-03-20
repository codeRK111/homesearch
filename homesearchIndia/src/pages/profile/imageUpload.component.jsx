import { Avatar, Box, Button } from '@material-ui/core';
import { Backdrop, CircularProgress } from '@material-ui/core';
import {
	selectChangeUserProfilePictureLoading,
	selectUser,
} from '../../redux/auth/auth.selectors';

import React from 'react';
import { changeProfilePicture } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { handleImageUpload } from '../../utils/configure.utils';
import useStyles from './profile.styles';

const ImageUpload = ({ user, profilePictureLoading, changeProfilePicture }) => {
	const classes = useStyles();
	const [photo, setPhoto] = React.useState(null);
	const handleImage = (e) => {
		const { files } = e.target;
		handleImageUpload(files[0])
			.then((data) => {
				console.log('object');
				setPhoto(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	React.useEffect(() => {
		if (photo) {
			changeProfilePicture(photo, console.log);
		}
	}, [photo, changeProfilePicture]);
	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Backdrop className={classes.backdrop} open={profilePictureLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Avatar
				alt="User"
				src={
					user.photo
						? `/profile/${user.photo}`
						: photo
						? URL.createObjectURL(photo)
						: require('../../assets/dummy_user.png')
				}
				className={classes.avatar}
			/>
			<div className={classes.root}>
				<input
					accept="image/*"
					className={classes.input}
					onChange={handleImage}
					id="contained-button-file"
					multiple
					type="file"
				/>
				<label htmlFor="contained-button-file">
					<Button
						variant="contained"
						color="primary"
						component="span"
						className={classes.buttonUpload}
					>
						Upload
					</Button>
				</label>
				{/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> */}
			</div>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	profilePictureLoading: selectChangeUserProfilePictureLoading,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	changeProfilePicture: (image, callback) =>
		dispatch(changeProfilePicture({ image, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
