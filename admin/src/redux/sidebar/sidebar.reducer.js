import { SidebarActionTypes } from './sidebar.types';

const INITIAL_STATE = {
	propertyRent: false,
	propertySale: false,
	location: false,
	project: false,
	builder: false,
	kra: false,
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

		default:
			return state;
	}
};

export default sidebarReducer;
