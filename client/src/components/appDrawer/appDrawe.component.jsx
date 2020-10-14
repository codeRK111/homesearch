import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default function TemporaryDrawer({ open, handleDrawer }) {
	return (
		<div>
			<React.Fragment>
				<Drawer anchor={'left'} open={open} onClose={handleDrawer}>
					<h5>Test</h5>
				</Drawer>
			</React.Fragment>
		</div>
	);
}
