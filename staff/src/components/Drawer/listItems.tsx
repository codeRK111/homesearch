import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import ListAltIcon from '@material-ui/icons/ListAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React from 'react';
import { useHistory } from 'react-router';

interface IDrawerListItems {
	closeDrawer: () => void;
}

const DrawerListItems: React.FC<IDrawerListItems> = ({ closeDrawer }) => {
	const history = useHistory();

	// Callbacks
	const changeRoute = (path: string) => () => {
		history.push(path);
		closeDrawer();
	};
	return (
		<div>
			<List>
				<ListItem button onClick={changeRoute('/add-lead')}>
					<ListItemIcon>
						<PostAddIcon color="primary" />
					</ListItemIcon>
					<ListItemText primary={'Add Lead'} />
				</ListItem>
				<ListItem button onClick={changeRoute('/leads')}>
					<ListItemIcon>
						<ListAltIcon color="primary" />
					</ListItemIcon>
					<ListItemText primary={'My Leads'} />
				</ListItem>
			</List>
		</div>
	);
};

export default DrawerListItems;
