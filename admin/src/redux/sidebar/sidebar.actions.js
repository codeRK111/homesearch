import { SidebarActionTypes } from './sidebar.types';

export const togglePropertyRent = () => ({
	type: SidebarActionTypes.TOGGLE_PROPERTY_RENT,
});

export const togglePropertySale = () => ({
	type: SidebarActionTypes.TOGGLE_PROPERTY_SALE,
});

export const toggleLocation = () => ({
	type: SidebarActionTypes.TOGGLE_LOCATION,
});