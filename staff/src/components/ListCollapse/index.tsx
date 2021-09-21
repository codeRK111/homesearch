import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { SvgIcon } from '@material-ui/core';

interface IListDropDown {
	open: boolean;
	toggle: (value: boolean) => void;
	Icon: typeof SvgIcon;
	label: string;
}
const ListDropDown: React.FC<IListDropDown> = ({
	open,
	toggle,
	Icon,
	children,
	label,
}) => {
	const handleClick = () => {
		toggle(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<Icon color="primary" />
				</ListItemIcon>
				<ListItemText primary={label} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{children}
				</List>
			</Collapse>
		</>
	);
};

export default ListDropDown;
