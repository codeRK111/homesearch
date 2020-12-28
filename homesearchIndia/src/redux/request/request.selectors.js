import { createSelector } from 'reselect';

const selectRequest = (state) => state.request;

// Select Values
// Select loading status
export const selectAddRequestPhotoLoading = createSelector(
	[selectRequest],
	(c) => c.addRequestPhotoLoading
);
export const selectValidateRequestPhotoLoading = createSelector(
	[selectRequest],
	(c) => c.validateRequestPhotoLoading
);

// Select Errors
