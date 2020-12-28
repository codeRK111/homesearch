import { requestActionTypes } from './request.types';

const initialState = {
	// Initial Values
	// Loading States
	addRequestPhotoLoading: false,
	validateRequestPhotoLoading: false,

	// Errors
};

const requestReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case requestActionTypes.TOGGLE_ADD_REQUEST_PHOTO_LOADING:
			return {
				...state,
				addRequestPhotoLoading: payload,
			};
		case requestActionTypes.TOGGLE_VALIDATE_REQUEST_PHOTO_LOADING:
			return {
				...state,
				validateRequestPhotoLoading: payload,
			};

		default:
			return state;
	}
};

export default requestReducer;
