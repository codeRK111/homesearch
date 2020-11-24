import { createSelector } from 'reselect';

const selectProperty = (state) => state.property;

// Select Values
// Select loading status
export const selectPropertyLoading = createSelector(
	[selectProperty],
	(c) => c.searchPropertyLoading
);

export const selectGetPropertyDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.getPropertyDetailsLoading
);
export const selectGetPropertyResourcesLoading = createSelector(
	[selectProperty],
	(c) => c.getPropertyResourcesLoading
);

export const selectPostPropertyLoading = createSelector(
	[selectProperty],
	(c) => c.postPropertyLoading
);

export const selectUpdatePropertyLoading = createSelector(
	[selectProperty],
	(c) => c.updatePropertyLoading
);
export const selectQueryOnPropertyLoading = createSelector(
	[selectProperty],
	(c) => c.queryOnPropertyLoading
);
export const selectGetQueriesLoading = createSelector(
	[selectProperty],
	(c) => c.getQueriesLoading
);

export const selectMyPropertiesLoading = createSelector(
	[selectProperty],
	(c) => c.getMyPropertiesLoading
);
export const selectAmenities = createSelector(
	[selectProperty],
	(c) => c.amenities
);
export const selectFurnishes = createSelector(
	[selectProperty],
	(c) => c.furnishes
);
export const selectMyQueries = createSelector(
	[selectProperty],
	(c) => c.myQueries
);
export const selectQueriesReceived = createSelector(
	[selectProperty],
	(c) => c.queriesReceived
);
// Select Errors
