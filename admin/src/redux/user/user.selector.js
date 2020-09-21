import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectIsAuthenticated = createSelector(
	[selectUser],
	(user) => user.authenticated
);

export const selectLoading = createSelector(
	[selectUser],
	(user) => user.loading
);

export const selectAdminFetchLoading = createSelector(
	[selectUser],
	(user) => user.fetchAdminLoading
);
export const selectFetchAdminError = createSelector(
	[selectUser],
	(user) => user.fetchAdminError
);
export const selectCurrentUser = createSelector(
	[selectUser],
	(user) => user.currentUser
);
// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
