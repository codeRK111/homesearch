import { createSelector } from 'reselect';

const selectAdmins = (state) => state.admins;

export const selectAllAdmins = createSelector([selectAdmins], (u) => u.admins);
export const selectAllAdminsLoading = createSelector(
	[selectAdmins],
	(u) => u.admins_loading
);
export const selectAllAdminsError = createSelector(
	[selectAdmins],
	(u) => u.admins_error
);
export const selectUpdateAdminLoading = createSelector(
	[selectAdmins],
	(u) => u.admin_update_loading
);
export const selectUpdateAdminError = createSelector(
	[selectAdmins],
	(u) => u.admin_update_error
);
export const selectAddAdminLoading = createSelector(
	[selectAdmins],
	(u) => u.admin_add_loading
);
export const selectAddAdminError = createSelector(
	[selectAdmins],
	(u) => u.admin_add_error
);

// export const selectLoading = createSelector(
// 	[selectUser],
// 	(user) => user.loading
// );

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
