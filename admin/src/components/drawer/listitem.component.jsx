import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { useHistory } from 'react-router-dom';

const MainListItems = () => {
	const history = useHistory();
	const onUsersClick = () => history.push('/users');
	return (
		<div>
			<ListItem button onClick={onUsersClick}>
				<ListItemIcon>
					<PeopleAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Users" />
			</ListItem>
		</div>
	);
};

export default MainListItems;
