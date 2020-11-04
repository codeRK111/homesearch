import { createSelector } from 'reselect';

const selectProperty = (state) => state.property;

// Select Values
// Select loading status
export const selectPropertyLoading = createSelector(
	[selectProperty],
	(c) => c.searchPropertyLoading
);

// Select Errors
