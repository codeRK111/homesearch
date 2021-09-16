import Drawer from '@material-ui/core/Drawer';
import DrawerItems from './drawerItems';
import React from 'react';

interface IAppDrawer {
	open: boolean;
	onClose: () => void;
}

const AppDrawer: React.FC<IAppDrawer> = ({ open, onClose }) => {
	return (
		<div>
			<React.Fragment>
				<Drawer anchor={'left'} open={open} onClose={onClose}>
					<DrawerItems closeDrawer={onClose} />
				</Drawer>
			</React.Fragment>
		</div>
	);
};

export default AppDrawer;
