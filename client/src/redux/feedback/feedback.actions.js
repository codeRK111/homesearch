import { feedbackActionTypes } from './feedback.types';

// Fetch
export const addFeedback = (payload) => ({
	type: feedbackActionTypes.ADD_FEEDBACK_START,
	payload,
});

// Toggle
export const addFeedbackLoading = (payload) => ({
	type: feedbackActionTypes.TOGGLE_ADD_FEEDBACK_LOADING,
	payload,
});
