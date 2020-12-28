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
export const selectGetProjectDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.getProjectDetailsLoading
);
export const selectGetProjectPropertyDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.getProjectPropertyDetailsLoading
);
export const selectGetPropertyResourcesLoading = createSelector(
	[selectProperty],
	(c) => c.getPropertyResourcesLoading
);
export const selectGetPropertyCountLoading = createSelector(
	[selectProperty],
	(c) => c.getPropertyCountLoading
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
export const selectProjectCount = createSelector(
	[selectProperty],
	(c) => c.projectCount
);
export const selectSaleCount = createSelector(
	[selectProperty],
	(c) => c.saleCount
);
export const selectRentCount = createSelector(
	[selectProperty],
	(c) => c.rentCount
);
// Select Errors
