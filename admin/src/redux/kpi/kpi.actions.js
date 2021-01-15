import { kpiActionTypes } from './kpi.types';

export const fetchAllLeads = (payload) => ({
	type: kpiActionTypes.FETCH_ALL_LEADS,
	payload,
});
export const fetchAllLeadsLoading = (payload) => ({
	type: kpiActionTypes.FETCH_ALL_LEADS_LOADING,
	payload,
});
