import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

// Select Values
export const selectAuthenticated = createSelector(
	[selectAuth],
	(c) => c.authenticated
);
export const selectUser = createSelector([selectAuth], (c) => c.user);
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
export const selectSignInLoading = createSelector(
	[selectAuth],
	(c) => c.signInLoading
);
export const selectUserProfileLoading = createSelector(
	[selectAuth],
	(c) => c.userProfileLoading
);
// Select Errors
export const selectSignInError = createSelector(
	[selectAuth],
	(c) => c.signInError
);
