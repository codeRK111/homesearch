import { createSelector } from 'reselect';

const selectCity = (state) => state.city;

// Select Values
// Select loading status
export const selectSearchCityLoading = createSelector(
	[selectCity],
	(c) => c.searchCityLoading
);
// Select Errors
