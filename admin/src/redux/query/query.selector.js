import { createSelector } from 'reselect';

const selectProperty = (state) => state.query;

export const selectGetQueriesLoading = createSelector(
	[selectProperty],
	(c) => c.getQueriesLoading
);
export const selectDeleteQueryLoading = createSelector(
	[selectProperty],
	(c) => c.deleteQueryLoading
);
export const selectQueries = createSelector([selectProperty], (c) => c.queries);
// Select Errors
