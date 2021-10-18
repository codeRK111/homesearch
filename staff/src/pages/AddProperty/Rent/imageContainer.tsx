import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import UploadPhoto from '../../../components/UploadImage';
import { asyncAddPropertyImage } from '../../../API/property';

interface IRentImageContainer {
	propertyId?: string;
	onBack: () => void;
}

const RentImageContainer: React.FC<IRentImageContainer> = ({
	propertyId,
	onBack,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [defaultPhoto, setDefaultPhoto] = useState(0);
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	const addPhotos = async () => {
		try {
			if (photos.length > 0 && propertyId) {
				setLoading(true);
				await asyncAddPropertyImage(propertyId, photos, defaultPhoto);
				setLoading(false);
				setSnackbar({
					open: true,
					message: 'Photos uploaded successfully',
					severity: 'success',
				});
			}
		} catch (error: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
	};
	return (
		<div>
			<UploadPhoto
				photos={photos}
				setPhotos={setPhotos}
				defaultPhoto={defaultPhoto}
				setDefaultPhoto={setDefaultPhoto}
			/>
			<Box display="flex" justifyContent="space-between">
				<Button
					type="button"
					variant="contained"
					color="primary"
					size="large"
					onClick={onBack}
				>
					Back
				</Button>
				<Button
					onClick={addPhotos}
					variant="contained"
					color="primary"
					size="large"
					disabled={loading}
					endIcon={
						loading ? (
							<CircularProgress size={20} color={'inherit'} />
						) : (
							<></>
						)
					}
				>
					Upload Image
				</Button>
			</Box>
		</div>
	);
};

export default RentImageContainer;
