import { createSelector } from 'reselect';

const selectProperty = (state) => state.property;

export const selectFurnishes = createSelector(
	[selectProperty],
	(c) => c.furnishes
);
export const selectAmenities = createSelector(
	[selectProperty],
	(c) => c.amenities
);
export const selectProperties = createSelector(
	[selectProperty],
	(c) => c.properties
);
export const selectLoading = createSelector([selectProperty], (c) => c.loading);
export const selectPropertyDetailsLoading = createSelector(
	[selectProperty],
	(c) => c.propertyDetailsLoading
);
export const selectUpdatePropertyLoading = createSelector(
	[selectProperty],
	(c) => c.updatePropertyLoading
);

// export const selectLoading = createSelector(
// 	[selectUser],
// 	(user) => user.loading
// );

// export const loading = createSelector(
//   [selectUser],
//   user => user.loading
// );
