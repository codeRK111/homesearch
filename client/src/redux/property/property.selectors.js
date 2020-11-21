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
// Select Errors
