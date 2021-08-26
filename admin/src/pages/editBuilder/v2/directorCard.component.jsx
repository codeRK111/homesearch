import {
	Box,
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { memo, useRef, useState } from 'react';
import { removeDirector, updateDirector } from '../../../utils/asyncBuilder';

import { Alert } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import noImage from '../../../assets/no-image.jpg';
import { renderImage } from '../../../utils/render.utils';
import useGlobalStyles from '../../../common.style';
import useStyles from './editBuilder.style';

const DirectorCard = memo(({ id, name, image, builderId, setDirectors }) => {
	const cancelToken = useRef(null);
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [photoLoading, setPhotoLoading] = useState(false);
	const [removeLoading, setRemoveLoading] = useState(false);
	const [success, showSuccess] = useState(false);
	const [nameLoading, setNameLoading] = useState(false);
	const [error, setError] = useState(null);
	const [state, setState] = useState({ id, name, image });
	const handleChange = (e) => {
		const { value } = e.target;
		setState((prevState) => ({
			...prevState,
			name: value,
		}));
	};

	const handleLoading = (type) => (status) => {
		if (type === 'photo') {
			setPhotoLoading(status);
		} else if (type === 'name') {
			setNameLoading(status);
		}
	};

	const handleUpdate = (type, data) => {
		cancelToken.current = axios.CancelToken.source();
		return updateDirector(
			builderId,
			data,
			cancelToken.current,
			handleLoading(type)
		);
	};
	const handleRemove = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await removeDirector(
				builderId,
				id,
				cancelToken.current,
				setRemoveLoading
			);
			setDirectors(resp.directors);
			setError(null);
		} catch (error) {
			setError(error);
		}
	};

	// Image Upload
	const handleImage = async (e) => {
		const img = e.target.files[0];
		// setLogo(img);
		try {
			const resp = await handleUpdate('photo', { image: img, id });
			setError(null);
			setState((prevState) => {
				const tempImg = resp.directors.find((c) => c._id === id);
				return {
					...prevState,
					image: tempImg.image,
				};
			});
		} catch (error) {
			setError(error);
		}
	};
	const handleName = async () => {
		try {
			await handleUpdate('name', { name: state.name, id });
			setError(null);
			showSuccess(true);
		} catch (error) {
			setError(error);
			showSuccess(false);
		}
	};

	const onKeyDown = (e) => {
		if (e.key === 'Enter' && state.name) {
			handleName();
		}
	};

	const buttonProps = {};
	if (removeLoading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}

	return (
		<div className={classes.directorWrapper}>
			<div className={classes.directorImageWrapper}>
				<div className={classes.cancelWrapper}>
					<input
						accept="image/*"
						type="file"
						id={`director-photo-${id}`}
						multiple
						className={classes.input}
						onChange={handleImage}
					/>
					<label htmlFor={`director-photo-${id}`}>
						{photoLoading ? (
							<CircularProgress size={30} color="primary" />
						) : (
							<CloudUploadIcon className={classes.uploadIcon} />
						)}
					</label>
				</div>
				<img
					src={
						state.image
							? renderImage(state.image, '/assets/builders')
							: noImage
					}
					alt="director"
					className={classes.photo}
				/>
			</div>
			<Box mt="0.5rem">
				<TextField
					variant="filled"
					fullWidth
					size="small"
					value={state.name}
					onChange={handleChange}
					onKeyDown={onKeyDown}
					InputProps={{
						endAdornment: nameLoading ? (
							<CircularProgress size={15} color="primary" />
						) : null,
					}}
				/>
			</Box>
			<Box>
				{error && (
					<Typography
						variant="caption"
						gutterBottom
						className={gClasses.errorColor}
					>
						{error}
					</Typography>
				)}
			</Box>
			{success && (
				<Alert severity="success" onClose={() => showSuccess(false)}>
					Director Updated Successfully
				</Alert>
			)}
			<Box mt="1rem">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12}>
						<Button
							variant="outlined"
							color="secondary"
							fullWidth
							disabled={removeLoading}
							onClick={handleRemove}
							{...buttonProps}
						>
							Remove
						</Button>
					</Grid>
					{/* <Grid item xs={12} sm={6}>
						<Button
							variant="outlined"
							color="primary"
							fullWidth
							disabled={nameLoading}
							onClick={handleName}
							{...buttonProps}
						>
							Update Name
						</Button>
					</Grid> */}
				</Grid>
			</Box>
		</div>
	);
});

export default DirectorCard;
