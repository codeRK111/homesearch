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

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
