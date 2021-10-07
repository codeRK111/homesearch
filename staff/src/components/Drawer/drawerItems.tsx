import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import DrawerListItems from './listItems';
import React from 'react';
import { SpaceBetween } from '../UI/Flex';
import { renderStaffRole } from '../../utils/render';
import useStyles from './drawer.style';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IDrawerItems {
	closeDrawer: () => void;
}

const DrawerItems: React.FC<IDrawerItems> = ({ closeDrawer }) => {
	// Styles
	const style = useStyles();
	const { user } = useTypedSelector((state) => state.auth);

	return (
		<div className={style.drawerWrapper}>
			<SpaceBetween>
				<Typography variant="h6">Homesearch18</Typography>

				<IconButton onClick={closeDrawer}>
					<CloseIcon />
				</IconButton>
			</SpaceBetween>
			<Divider />

			<Box mt="0.5rem" display="flex" justifyContent="center">
				{user && (
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar>
								<AccountCircleIcon
									color="primary"
									fontSize="large"
								/>
							</Avatar>
						</ListItemAvatar>

						<ListItemText
							primary={user.name}
							secondary={
								<Typography color="primary">
									<b>{renderStaffRole(user.type)}</b> <br />
								</Typography>
							}
						/>
					</ListItem>
				)}
			</Box>

			<DrawerListItems closeDrawer={closeDrawer} />
		</div>
	);
};

export default DrawerItems;
