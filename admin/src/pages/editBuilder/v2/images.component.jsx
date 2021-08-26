import { Box, CircularProgress, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import AddDirectorModal from './addDirector.component';
import AddIcon from '@material-ui/icons/Add';
import DirectorCard from './directorCard.component';
import PrimaryCheckBox from './primaryCheckbox.component';
import RemovePhotoButton from './removeButton.component';
import axios from 'axios';
import { handleBuilderImages } from '../../../utils/asyncBuilder';
import noImage from '../../../assets/no-image.jpg';
import { renderImage } from '../../../utils/render.utils';
import useStyles from './editBuilder.style';

const BuilderImages = ({ builder }) => {
	const classes = useStyles();
	// Axios Cancel Token
	const cancelToken = useRef(null);
	const [logo, setLogo] = useState(null);
	const [open, setOpen] = useState(false);
	const [teamPhoto, setTeamPhoto] = useState(null);
	const [error, setError] = useState(null);
	const [logoLoading, setLogoLoading] = useState(false);
	const [teamPhotoLoading, setTeamPhotoLoading] = useState(false);
	const [photosLoading, setPhotosLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [directors, setDirectors] = useState([]);

	const hidePhoto = (id) => {
		setPhotos((prevState) => {
			const tempPhotos = prevState.filter((c) => c._id !== id);
			return tempPhotos;
		});
	};

	const toggleOpen = (status) => () => {
		setOpen(status);
	};

	const handleLoading = (type) => (status) => {
		if (type === 'logo') {
			setLogoLoading(status);
		} else if (type === 'teamPhoto') {
			setTeamPhotoLoading(status);
		} else {
			setPhotosLoading(status);
		}
	};

	const handleImage = (type, data) => {
		cancelToken.current = axios.CancelToken.source();
		return handleBuilderImages(
			builder.id,
			data,
			cancelToken.current,
			handleLoading(type)
		);
	};

	// Logo
	const handleLogo = async (e) => {
		const img = e.target.files[0];
		// setLogo(img);
		try {
			const resp = await handleImage('logo', { logo: img });
			setError(null);
			setLogo(resp.logo);
		} catch (error) {
			setError(error);
		}
	};
	// Team Photo
	const handleTeamPhoto = async (e) => {
		const img = e.target.files[0];
		// setLogo(img);
		try {
			const resp = await handleImage('teamPhoto', { teamPhoto: img });
			setError(null);
			setTeamPhoto(resp.teamPhoto);
		} catch (error) {
			setError(error);
		}
	};
	// Photos
	const handlePhotos = async (e) => {
		const { files } = e.target;
		const temp = [...photos, ...Array.from(files)];
		try {
			const resp = await handleImage('photos', { photos: temp });
			setError(null);
			setPhotos(resp.photos);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (builder.logo) {
			setLogo(builder.logo);
		}
		if (builder.photos) {
			setPhotos(builder.photos);
		}
		if (builder.teamPhoto) {
			setTeamPhoto(builder.teamPhoto);
		}
		if (builder.photos) {
			setDirectors(builder.directors);
		}
	}, [builder]);

	return (
		<div className={classes.wrapper}>
			<AddDirectorModal
				open={open}
				handleClose={toggleOpen(false)}
				builderId={builder.id}
				callback={setDirectors}
			/>
			<Grid container spacing={5}>
				<Grid item xs={12} md={3}>
					<h3>Logo</h3>
					<Paper>
						<Box
							style={{
								width: '100%',
								height: 200,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{logoLoading ? (
								<CircularProgress size={30} color="inherit" />
							) : (
								<img
									src={
										logo
											? renderImage(
													logo,
													'/assets/builders'
											  )
											: noImage
									}
									className={classes.logo}
									alt="Logo"
								/>
							)}
						</Box>
						<Box>
							<input
								accept="image/*"
								type="file"
								id="logo"
								className={classes.input}
								onChange={handleLogo}
							/>
							<label htmlFor="logo" className={classes.label}>
								Upload Logo
							</label>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} md={9}>
					<h3>Images</h3>
					<Paper className={classes.wrapper}>
						<Grid container spacing={1}>
							{photos.map((c) => (
								<Grid item xs={6} md={3} key={c._id}>
									<Box className={classes.photoWrapper}>
										<img
											src={`/assets/builders/${c.image}`}
											alt="Builder"
											className={classes.photo}
										/>
										<Box className={classes.cancelWrapper}>
											<RemovePhotoButton
												id={builder.id}
												image={c}
												callback={hidePhoto}
											/>
										</Box>
									</Box>
									<PrimaryCheckBox
										builderId={builder.id}
										id={c._id}
										primary={!!c.primary}
										setPhotos={setPhotos}
									/>
								</Grid>
							))}
							<Grid item xs={6} md={3}>
								<input
									accept="image/*"
									type="file"
									id="photos"
									multiple
									className={classes.input}
									onChange={handlePhotos}
								/>
								<label
									htmlFor="photos"
									className={classes.addWrapper}
								>
									{photosLoading ? (
										<CircularProgress
											size={30}
											color="inherit"
										/>
									) : (
										<AddIcon />
									)}
								</label>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					<h3>Team Photo</h3>
					<Paper>
						<Box
							style={{
								width: '100%',
								height: 200,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{teamPhotoLoading ? (
								<CircularProgress size={30} color="inherit" />
							) : (
								<img
									src={
										teamPhoto
											? renderImage(
													teamPhoto,
													'/assets/builders'
											  )
											: noImage
									}
									className={classes.logo}
									alt="Logo"
								/>
							)}
						</Box>
						<Box>
							<input
								accept="image/*"
								type="file"
								id="team-photo"
								className={classes.input}
								onChange={handleTeamPhoto}
							/>
							<label
								htmlFor="team-photo"
								className={classes.label}
							>
								Upload Team Photo
							</label>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} md={9}>
					<h3>Directors</h3>
					<Paper className={classes.wrapper}>
						<Grid container spacing={1}>
							{directors.map((c) => (
								<Grid item xs={6} md={4} key={c._id}>
									<DirectorCard
										id={c._id}
										name={c.name}
										image={c.image}
										builderId={builder.id}
										setDirectors={setDirectors}
									/>
								</Grid>
							))}
							<Grid item xs={6} md={4}>
								<div
									className={classes.addDirectorWrapper}
									onClick={toggleOpen(true)}
								>
									<AddIcon />
								</div>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default BuilderImages;
