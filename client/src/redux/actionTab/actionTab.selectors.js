import { createSelector } from 'reselect';

const selectActionTab = (state) => state.actionTab;

// Select Values
export const selectCurrentTab = createSelector(
	[selectActionTab],
	(c) => c.currentTab
);
// Select loading status

// Select Errors
