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
export const selectResetMyPasswordLoading = createSelector(
	[selectAuth],
	(c) => c.resetMyPasswordLoading
);
export const selectSignInLoading = createSelector(
	[selectAuth],
	(c) => c.signInLoading
);
export const selectUserProfileLoading = createSelector(
	[selectAuth],
	(c) => c.userProfileLoading
);
export const selectChangeUserProfilePictureLoading = createSelector(
	[selectAuth],
	(c) => c.changeProfilePictureLoading
);
export const selectChangeUserProfileInfoLoading = createSelector(
	[selectAuth],
	(c) => c.changeProfileInfoLoading
);
export const selectChangePasswordLoading = createSelector(
	[selectAuth],
	(c) => c.changePasswordLoading
);
export const selectSendResetPasswordOtpLoading = createSelector(
	[selectAuth],
	(c) => c.sendResetPasswordOtpLoading
);
// Select Errors
export const selectSignInError = createSelector(
	[selectAuth],
	(c) => c.signInError
);
export const profileCompletePercentage = createSelector(
	[selectAuth],
	(c) => c.profileCompleted
);
