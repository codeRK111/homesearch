import { Box, CircularProgress, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { StaticPaths } from '../../utils/render';
import { asyncAddPropertyLeadPhoto } from '../../API/property';
import { makeStyles } from '@material-ui/core/styles';

interface IUploadLeadImage {
	id: string;
}

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	label: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100,
		cursor: 'pointer',
		border: '1px solid #cccccc',
		'&:hover': {
			background: '#c1c1c1',
		},
	},
	image: {
		width: '100%',
		height: 300,
		objectFit: 'cover',
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
	},
}));

const UploadLeadImage: React.FC<IUploadLeadImage> = ({ id }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const { input, label, image } = useStyles();
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState<Array<string>>([]);

	const uploadImage = async (image: File) => {
		try {
			setLoading(true);
			const resp = await asyncAddPropertyLeadPhoto(id, image);
			setLoading(false);
			setPhotos(resp.photos);
			setSnackbar({
				open: true,
				message: 'Image uploaded successfully',
				severity: 'success',
			});
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (loading) return;
		if (e.target.files) {
			const t = e.target.files[0];
			uploadImage(t);
		}
	};
	return (
		<Box mt="1rem">
			<Box display="flex" justifyContent="center" mb="1rem">
				<input
					type="file"
					className={input}
					id="upload-button"
					accept="image/*"
					onChange={handleImage}
				/>
				<label htmlFor="upload-button" className={label}>
					{loading ? (
						<CircularProgress size={20} color="inherit" />
					) : (
						<CloudUploadIcon />
					)}
				</label>
			</Box>
			<Grid container spacing={3}>
				{photos.map((c, i) => (
					<Grid
						item
						xs={12}
						md={4}
						key={i}
						style={{ position: 'relative' }}
					>
						{/* <HighlightOffIcon className={closeIcon} /> */}
						<img
							src={StaticPaths.property(c)}
							alt="Property"
							className={image}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default UploadLeadImage;
