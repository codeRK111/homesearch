import {
	authActionCreators,
	cpActionCreators,
	uiActionCreators,
} from '../redux';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export enum ResourceType {
	Auth = 'auth',
	UI = 'ui',
	CP = 'cp',
}

type IResource = {
	[key in ResourceType]: any;
};

const resource: IResource = {
	auth: authActionCreators,
	ui: uiActionCreators,
	cp: cpActionCreators,
};

export const useRepositoryAction = (type: ResourceType) => {
	const dispatch = useDispatch();
	return bindActionCreators(resource[type], dispatch);
};
