import { createSelector } from 'reselect';

const selectCitiy = (state) => state.city;

export const selectAllCity = createSelector([selectCitiy], (c) => c.cities);
export const selectAllStates = createSelector([selectCitiy], (c) => c.states);
export const selectLoading = createSelector([selectCitiy], (c) => c.loading);

// export const selectLoading = createSelector(
// 	[selectUser],
// 	(user) => user.loading
// );

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
