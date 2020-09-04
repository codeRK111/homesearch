import { createSelector } from 'reselect';

const selectSidebar = (state) => state.sidebar;

export const selectPropertyRent = createSelector(
	[selectSidebar],
	(u) => u.propertyRent
);
export const selectPropertySale = createSelector(
	[selectSidebar],
	(u) => u.propertySale
);
export const selectLocation = createSelector(
	[selectSidebar],
	(u) => u.location
);
