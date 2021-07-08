import { Box, Grid, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ChipWrapper from '../../../../components/v2/chipWrapper/chipWrapper.component';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import useStyles from '../postPage.style';

const UploadPhoto = ({ photos, setPhotos }) => {
	const classes = useStyles();

	const handleImage = (e) => {
		const { files } = e.target;
		const temp = [...photos, ...Array.from(files)];
		if (temp.length < 15) {
			setPhotos(temp);
		} else {
			console.log({ temp });
			temp.splice(15, temp.length - 15);
			setPhotos(temp);
		}
	};

	const handleUpdateImage = (i) => (e) => {
		const { files } = e.target;
		let temp = [...photos];
		temp[i] = files[0];
		setPhotos(temp);
	};
	const deletePhoto = (i) => () => {
		let temp = [...photos];
		temp.splice(i, 1);
		setPhotos(temp);
	};
	return (
		<React.Fragment>
			<Box className={classes.rowWrapper2}>
				<Box className={classes.columnWrapper2}>
					<Box mb="1rem">
						<input
							type="file"
							id={`upload-photo`}
							className={classes.uploadButton}
							onChange={handleImage}
							multiple
						/>
						<label className={classes.label} htmlFor="upload-photo">
							<ChipWrapper>
								<Box className={classes.contentWrapper}>
									<AddIcon />
									<Typography variant="body2">
										Add Photos
									</Typography>
								</Box>
							</ChipWrapper>
						</label>
					</Box>
					<Typography variant="caption" align="center">
						Photos 0/15 increase your chances of getting genuine
						leads by adding at least 5 photos of Hall, Bedrooms,
						Kitchen & bathrooms.
					</Typography>
				</Box>
			</Box>
			<Box mt="2rem">
				<Grid container justify="center" spacing={3}>
					{photos.map((c, i) => (
						<Grid key={i} item xs={6} md={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={URL.createObjectURL(c)}
									alt="project"
									srcset=""
									className={classes.image}
								/>
								<Box className={classes.overlay}>
									<input
										type="file"
										id={`update-photo-${i}`}
										className={classes.uploadButton}
										onChange={handleUpdateImage(i)}
										multiple
									/>
									<label
										htmlFor={`update-photo-${i}`}
										className={classes.pointer}
									>
										<EditIcon
											style={{ color: '#ffffff' }}
										/>
									</label>

									<label
										onClick={deletePhoto(i)}
										className={classes.pointer}
									>
										<CloseIcon
											style={{ color: '#ffffff' }}
										/>
									</label>
								</Box>
							</Box>
						</Grid>
					))}
					{photos.length > 0 && (
						<Grid item xs={6} md={3}>
							<input
								type="file"
								id={`add-photo`}
								className={classes.uploadButton}
								onChange={handleImage}
								multiple
							/>
							<label
								htmlFor="add-photo"
								className={classes.uploadMore}
							>
								<AddIcon />
							</label>
						</Grid>
					)}
				</Grid>
			</Box>
		</React.Fragment>
	);
};

export default UploadPhoto;
