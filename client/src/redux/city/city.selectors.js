import { createSelector } from 'reselect';

const selectCity = (state) => state.city;

// Select Values
// Select loading status
export const selectSearchCityLoading = createSelector(
	[selectCity],
	(c) => c.searchCityLoading
);
export const selectSearchLocationLoading = createSelector(
	[selectCity],
	(c) => c.searchLocationLoading
);
// Select Errors
