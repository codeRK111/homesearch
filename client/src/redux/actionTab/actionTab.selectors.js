import { createSelector } from 'reselect';

const selectActionTab = (state) => state.actionTab;

// Select Values
export const selectCurrentTab = createSelector(
	[selectActionTab],
	(c) => c.currentTab
);
export const selectSelectedCity = createSelector(
	[selectActionTab],
	(c) => c.selectedCity
);
// Select loading status

// Select Errors
