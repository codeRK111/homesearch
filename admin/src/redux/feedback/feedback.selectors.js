import { createSelector } from 'reselect';

const selectFeedback = (state) => state.feedback;

// Select Values
// Select loading status
export const selectAddFeedbackLoading = createSelector(
	[selectFeedback],
	(c) => c.addFeedbackLoading
);
export const selectFetchFeedbackLoading = createSelector(
	[selectFeedback],
	(c) => c.fetchFeedbackLoading
);
export const selecSearchFeedbacks = createSelector(
	[selectFeedback],
	(c) => c.searchFeedbacks
);
export const selectSearchFeedbacksCount = createSelector(
	[selectFeedback],
	(c) => c.searchFeedbacksCount
);
export const selectDeleteFeedbacksCount = createSelector(
	[selectFeedback],
	(c) => c.deleteFeedbackLoading
);

// Select Errors
