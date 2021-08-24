import ChatIcon from '@material-ui/icons/Chat';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
	name: {
		paddingLeft: theme.spacing(2),
		fontWeight: 'bold',
		color: 'yellow',
		fontSize: '1.5rem',
	},
	whiteColor: {
		color: '#ffffff',
	},
}));

const AgentListItems = ({ selectCurrentUser }) => {
	const classes = useStyles();
	const history = useHistory();
	const onUsersClick = (route) => () => history.push(route);

	return (
		<div>
			<h3
				className={classes.name}
			>{`Hello ${selectCurrentUser.name}`}</h3>
			<ListItem button onClick={onUsersClick('/agent-queries')}>
				<ListItemIcon>
					<ChatIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Queries" />
			</ListItem>
			<ListItem button onClick={onUsersClick('/add-project-v2')}>
				<ListItemIcon>
					<PeopleAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Add Project" />
			</ListItem>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	selectCurrentUser,
});

export default connect(mapStateToProps)(AgentListItems);
