import { Divider, IconButton, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DrawerListItems from './listItems';
import React from 'react';
import { SpaceBetween } from '../UI/Flex';
import useStyles from './drawer.style';

interface IDrawerItems {
	closeDrawer: () => void;
}

const DrawerItems: React.FC<IDrawerItems> = ({ closeDrawer }) => {
	// Styles
	const style = useStyles();

	return (
		<div className={style.drawerWrapper}>
			<SpaceBetween>
				<Typography variant="h6">Homesearch18</Typography>

				<IconButton onClick={closeDrawer}>
					<CloseIcon />
				</IconButton>
			</SpaceBetween>
			<Divider />
			<DrawerListItems closeDrawer={closeDrawer} />
		</div>
	);
};

export default DrawerItems;
