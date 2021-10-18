import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	label: {
		padding: '0.5rem 0',
		width: '100%',
		borderRadius: '5px',
		cursor: 'pointer',
		display: 'block',
		boxSizing: 'border-box',
		textAlign: 'center',
	},
	uploadButton: {
		display: 'none',
	},
	rowWrapper2: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxSizing: 'border-box',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	columnWrapper2: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		boxSizing: 'border-box',
		marginRight: '2rem',

		'& > span': {
			fontWeight: '600',
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.8rem',
			},
		},
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem !important',
		},
	},
	imageWrapper: {
		borderRadius: 10,
		overflow: 'hidden',
		border: `4px solid ${theme.palette.primary.dark}`,
		padding: '0.2rem',
		boxSizing: 'border-box',
		position: 'relative',
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		zIndex: 2,
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0.5rem',
		boxSizing: 'border-box',
	},
	image: {
		width: '100%',
		height: '200px',
	},
	pointer: {
		cursor: 'pointer',
	},
	uploadMore: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
		alignItems: 'center',
		border: `2px dotted ${theme.palette.primary.main}`,
		cursor: 'pointer',
		minHeight: 200,
	},
}));

interface IUploadPhoto {
	photos: Array<any>;
	setPhotos: (value: any) => void;
	defaultPhoto: number;
	setDefaultPhoto: (value: number) => void;
}

const UploadPhoto: React.FC<IUploadPhoto> = ({
	photos,
	setPhotos,
	defaultPhoto,
	setDefaultPhoto,
}) => {
	const classes = useStyles();

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		console.log(files);
		if (files) {
			const temp = [...photos, ...Array.from(files)];
			if (temp.length < 15) {
				setPhotos(temp);
			} else {
				console.log({ temp });
				temp.splice(15, temp.length - 15);
				setPhotos(temp);
			}
		}
	};

	const handleUpdateImage =
		(i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;
			if (files) {
				let temp = [...photos];
				temp[i] = files[0];
				setPhotos(temp);
			}
		};
	const deletePhoto = (i: number) => () => {
		let temp = [...photos];
		temp.splice(i, 1);
		setPhotos(temp);
		if (defaultPhoto === i) {
			setDefaultPhoto(0);
		}
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
							<Box className={classes.contentWrapper}>
								<AddIcon />
								<Typography variant="body2">
									Select Photos
								</Typography>
							</Box>
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
							<Box display="flex" justifyContent="center">
								<FormControlLabel
									control={
										<Checkbox
											checked={defaultPhoto === i}
											onChange={(e) => setDefaultPhoto(i)}
											name="checkedB"
											color="primary"
										/>
									}
									label="Thumbnail"
								/>
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
