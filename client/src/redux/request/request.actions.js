import { requestActionTypes } from './request.types';

// Fetch
export const addRequestPhoto = (payload) => ({
	type: requestActionTypes.ADD_REQUEST_PHOTO_START,
	payload,
});
export const validateRequestPhoto = (payload) => ({
	type: requestActionTypes.VALIDATE_REQUEST_PHOTO_START,
	payload,
});

// Toggle
export const addRequestPhotoLoading = (payload) => ({
	type: requestActionTypes.TOGGLE_ADD_REQUEST_PHOTO_LOADING,
	payload,
});
export const validateRequestPhotoLoading = (payload) => ({
	type: requestActionTypes.TOGGLE_VALIDATE_REQUEST_PHOTO_LOADING,
	payload,
});
