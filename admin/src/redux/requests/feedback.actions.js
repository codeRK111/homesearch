import { feedbackActionTypes } from './feedback.types';

// Fetch
export const addFeedback = (payload) => ({
	type: feedbackActionTypes.ADD_FEEDBACK_START,
	payload,
});
export const fetchFeedbacks = (payload) => ({
	type: feedbackActionTypes.FETCH_FEEDBACK_START,
	payload,
});
export const deleteFeedback = (payload) => ({
	type: feedbackActionTypes.DELETE_FEEDBACK_START,
	payload,
});

export const setFeedback = (payload) => ({
	type: feedbackActionTypes.SET_FEEDBACKS,
	payload,
});

// Toggle
export const addFeedbackLoading = (payload) => ({
	type: feedbackActionTypes.TOGGLE_ADD_FEEDBACK_LOADING,
	payload,
});
export const fetchFeedbackLoading = (payload) => ({
	type: feedbackActionTypes.TOGGLE_FETCH_FEEDBACK_LOADING,
	payload,
});
export const deleteFeedbackLoading = (payload) => ({
	type: feedbackActionTypes.TOGGLE_DELETE_FEEDBACK_LOADING,
	payload,
});
