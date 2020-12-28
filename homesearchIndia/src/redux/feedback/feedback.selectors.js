import { createSelector } from 'reselect';

const selectFeedback = (state) => state.feedback;

// Select Values
// Select loading status
export const selectAddFeedbackLoading = createSelector(
	[selectFeedback],
	(c) => c.addFeedbackLoading
);

// Select Errors
