import { createSelector } from 'reselect';

const selectCitiy = (state) => state.city;

export const selectAllCity = createSelector([selectCitiy], (c) => c.cities);
export const selectAllStates = createSelector([selectCitiy], (c) => c.states);
export const selectLoading = createSelector([selectCitiy], (c) => c.loading);
export const selectCityLoading = createSelector(
	[selectCitiy],
	(c) => c.cityLoading
);
export const selectFetchCitiesLoading = createSelector(
	[selectCitiy],
	(c) => c.fetchCitiesLoading
);
export const selectLocationLoading = createSelector(
	[selectCitiy],
	(c) => c.locationLoading
);
export const selectFetchLocationLoading = createSelector(
	[selectCitiy],
	(c) => c.fetchLocationLoading
);

// export const selectLoading = createSelector(
// 	[selectUser],
// 	(user) => user.loading
// );

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
