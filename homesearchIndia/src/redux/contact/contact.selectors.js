import { createSelector } from 'reselect';

const selectContact = (state) => state.contact;

// Select Values
// Select loading status
export const selectAddContactLoading = createSelector(
	[selectContact],
	(c) => c.addContactLoading
);
export const selectContactValidateNumberoading = createSelector(
	[selectContact],
	(c) => c.validateContactNumberLoading
);

// Select Errors
