import { SidebarActionTypes } from './sidebar.types';

const INITIAL_STATE = {
	propertyRent: false,
	propertySale: false,
	location: false,
	project: false,
	builder: false,
	kra: false,
	kpi: false,
	package: false,
	review: false,
	joinRequest: false,
	leads: false,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SidebarActionTypes.TOGGLE_PROPERTY_RENT:
			return {
				...state,
				propertyRent: !state.propertyRent,
			};
		case SidebarActionTypes.TOGGLE_PROPERTY_SALE:
			return {
				...state,
				propertySale: !state.propertySale,
			};
		case SidebarActionTypes.TOGGLE_LOCATION:
			return {
				...state,
				location: !state.location,
			};
		case SidebarActionTypes.TOGGLE_PROJECT:
			return {
				...state,
				project: !state.project,
			};
		case SidebarActionTypes.TOGGLE_BUILDER:
			return {
				...state,
				builder: !state.builder,
			};
		case SidebarActionTypes.TOGGLE_KRA:
			return {
				...state,
				kra: !state.kra,
			};
		case SidebarActionTypes.TOGGLE_KPI:
			return {
				...state,
				kpi: !state.kpi,
			};
		case SidebarActionTypes.TOGGLE_PACKAGE:
			return {
				...state,
				package: !state.package,
			};
		case SidebarActionTypes.TOGGLE_REVIEW:
			return {
				...state,
				review: !state.review,
			};
		case SidebarActionTypes.TOGGLE_JOIN_REQUEST:
			return {
				...state,
				joinRequest: !state.joinRequest,
			};
		case SidebarActionTypes.TOGGLE_LEADS:
			return {
				...state,
				leads: !state.leads,
			};

		default:
			return state;
	}
};

export default sidebarReducer;
