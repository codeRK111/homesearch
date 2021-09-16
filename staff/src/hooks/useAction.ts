import { authActionCreators, uiActionCreators } from '../redux';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export enum ResourceType {
	Auth = 'auth',
	UI = 'ui',
}

type IResource = {
	[key in ResourceType]: any;
};

const resource: IResource = {
	auth: authActionCreators,
	ui: uiActionCreators,
};

export const useRepositoryAction = (type: ResourceType) => {
	const dispatch = useDispatch();
	return bindActionCreators(resource[type], dispatch);
};
