import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

// Select Values
// Select loading status
export const selectSignUpLoading = createSelector(
	[selectAuth],
	(c) => c.signUpLoading
);
export const selectSendOtpLoading = createSelector(
	[selectAuth],
	(c) => c.sendOtpLoading
);
export const selectValidateOtpLoading = createSelector(
	[selectAuth],
	(c) => c.validateOtpLoading
);
// Select Errors
