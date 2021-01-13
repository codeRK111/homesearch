import { kraActionTypes } from './kra.types';

// Fetch

export const addProjectAdvertisement = (payload) => ({
	type: kraActionTypes.ADD_PROJECT_ADVERTISEMENT,
	payload,
});
export const addProjectAdvertisementLead = (payload) => ({
	type: kraActionTypes.ADD_PROJECT_ADVERTISEMENT_LEAD,
	payload,
});
export const fetchProjectAdvertisements = (payload) => ({
	type: kraActionTypes.FETCH_PROJECT_ADVERTISEMENTS,
	payload,
});
export const fetchMyTasks = (payload) => ({
	type: kraActionTypes.FETCH_MY_TASKS,
	payload,
});
export const fetchProjectAdvertisementLeads = (payload) => ({
	type: kraActionTypes.FETCH_PROJECT_ADVERTISEMENT_LEADS,
	payload,
});
export const fetchProjectAdvertisementLeadsSchedule = (payload) => ({
	type: kraActionTypes.FETCH_PROJECT_ADVERTISEMENT_LEADS_SCHEDULE,
	payload,
});
export const fetchProjectAdvertisementLeadDetails = (payload) => ({
	type: kraActionTypes.FETCH_PROJECT_ADVERTISEMENT_LEAD_DETAILS,
	payload,
});
export const updateProjectAdvertisementLeadDetails = (payload) => ({
	type: kraActionTypes.UPDATE_PROJECT_ADVERTISEMENT_LEAD_DETAILS,
	payload,
});
export const fetchProjectAdvertisementDetails = (payload) => ({
	type: kraActionTypes.FETCH_PROJECT_ADVERTISEMENT_DETAILS,
	payload,
});
export const updateProjectAdvertisementDetails = (payload) => ({
	type: kraActionTypes.UPDATE_PROJECT_ADVERTISEMENT_DETAILS,
	payload,
});
export const deleteProjectAdvertisement = (payload) => ({
	type: kraActionTypes.DELETE_PROJECT_ADVERTISEMENT,
	payload,
});
export const deleteProjectAdvertisementLead = (payload) => ({
	type: kraActionTypes.DELETE_PROJECT_ADVERTISEMENT_LEAD,
	payload,
});
export const addProjectAdvertisementLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_ADD_PROJECT_ADVERTISEMENT_LOADING,
	payload,
});
export const addProjectAdvertisementLeadLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_ADD_PROJECT_ADVERTISEMENT_LEAD_LOADING,
	payload,
});
export const fetchProjectAdvertisementsLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENTS_LOADING,
	payload,
});
export const fetchMyTasksLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_FETCH_MY_TASKS_LOADING,
	payload,
});
export const fetchProjectAdvertisementLeadsLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEADS_LOADING,
	payload,
});
export const fetchProjectAdvertisementLeadsScheduleLoading = (payload) => ({
	type:
		kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEADS_SCHEDULE_LOADING,
	payload,
});
export const fetchProjectAdvertisementLeadDetailsLoading = (payload) => ({
	type:
		kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEAD_DETAILS_LOADING,
	payload,
});
export const updateProjectAdvertisementLeadDetailsLoading = (payload) => ({
	type:
		kraActionTypes.TOGGLE_UPDATE_PROJECT_ADVERTISEMENT_LEAD_DETAILS_LOADING,
	payload,
});
export const fetchProjectAdvertisementDetailsLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_DETAILS_LOADING,
	payload,
});
export const updateProjectAdvertisementDetailsLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_UPDATE_PROJECT_ADVERTISEMENT_DETAILS_LOADING,
	payload,
});
export const deleteProjectAdvertisementLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_DELETE_PROJECT_ADVERTISEMENT_LOADING,
	payload,
});
export const deleteProjectAdvertisementLeadLoading = (payload) => ({
	type: kraActionTypes.TOGGLE_DELETE_PROJECT_ADVERTISEMENT_LEAD_LOADING,
	payload,
});
