import { createSelector } from 'reselect';

const selectProperty = (state) => state.kpi;

export const selectFetchAllLeadsLoading = createSelector(
	[selectProperty],
	(c) => c.fetchAllLeadsLoading
);

// Select Errors
