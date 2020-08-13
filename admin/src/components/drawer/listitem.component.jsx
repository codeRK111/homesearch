import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Divider from '@material-ui/core/Divider';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';

const MainListItems = () => {
	const history = useHistory();
	const onUsersClick = (route) => () => history.push(route);
	return (
		<div>
			<ListItem button onClick={onUsersClick('/users')}>
				<ListItemIcon>
					<PeopleAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Users" />
			</ListItem>
			<Divider color="#fff" />
			<ListItem button onClick={onUsersClick('/admins')}>
				<ListItemIcon>
					<PeopleOutlineIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Admin / Staffs" />
			</ListItem>
			<Divider color="#fff" />
			<ListItem button onClick={onUsersClick('/authentication')}>
				<ListItemIcon>
					<LockIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Authentication" />
			</ListItem>
		</div>
	);
};

export default MainListItems;
