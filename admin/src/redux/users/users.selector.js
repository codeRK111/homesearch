import { createSelector } from 'reselect';

const selectUsers = (state) => state.users;

export const selectAllUsers = createSelector([selectUsers], (u) => u.users);
export const selectLoading = createSelector([selectUsers], (u) => u.loading);
export const selectAddUserLoading = createSelector(
	[selectUsers],
	(u) => u.addUserLoading
);
export const selectAddUserError = createSelector(
	[selectUsers],
	(u) => u.addError
);

// export const selectLoading = createSelector(
// 	[selectUser],
// 	(user) => user.loading
// );

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
