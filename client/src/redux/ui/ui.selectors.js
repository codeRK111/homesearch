import { createSelector } from 'reselect';

const selectUI = (state) => state.ui;

// Select Values
// Select loading status
export const loginDialogStatus = createSelector(
	[selectUI],
	(c) => c.loginPopup
);
export const snackbarDetails = createSelector([selectUI], (c) => c.snackbar);
export const getAuthOption = createSelector([selectUI], (c) => c.authOption);

// Select Errors
