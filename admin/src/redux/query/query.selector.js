import { createSelector } from 'reselect';

const selectProperty = (state) => state.query;

export const selectGetQueriesLoading = createSelector(
	[selectProperty],
	(c) => c.getQueriesLoading
);
export const selectGetExpertQueriesLoading = createSelector(
	[selectProperty],
	(c) => c.getExpertQueriesLoading
);
export const selectAddExpertQueryLoading = createSelector(
	[selectProperty],
	(c) => c.addExpertQueryLoading
);
export const selectGetExpertQueriesCount = createSelector(
	[selectProperty],
	(c) => c.expertQueriesCount
);
export const selectGetExpertQueryDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.getExpertQueryDetailsLoading
);
export const selectUpdateExpertQueryDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.updateExpertQueryDetailsLoading
);
export const selectDeleteQueryLoading = createSelector(
	[selectProperty],
	(c) => c.deleteQueryLoading
);
export const selectDeleteExpertQueryLoading = createSelector(
	[selectProperty],
	(c) => c.deleteExpertQueryLoading
);
export const selectQueries = createSelector([selectProperty], (c) => c.queries);
export const selectExpertQueries = createSelector(
	[selectProperty],
	(c) => c.expertQueries
);
// Select Errors
