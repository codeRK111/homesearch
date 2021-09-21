import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';

import ApartmentIcon from '@material-ui/icons/Apartment';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListDropDown from '../ListCollapse';
import PostAddIcon from '@material-ui/icons/PostAdd';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import useStyles from './drawer.style';

interface IDrawerListItems {
	closeDrawer: () => void;
}

const DrawerListItems: React.FC<IDrawerListItems> = ({ closeDrawer }) => {
	const history = useHistory();
	const style = useStyles();

	// State
	const [propertyOpen, setPropertyOpen] = useState(false);
	const [blogOpen, setBlogOpen] = useState(false);

	// Callbacks
	const changeRoute = (path: string) => () => {
		history.push(path);
		closeDrawer();
	};

	const manageSelectedStyle = (route: string) => {
		return history.location.pathname === route ? style.selectedRoute : '';
	};
	const manageSelectedStyleIcon = (route: string) => {
		return history.location.pathname === route ? style.colorWhite : '';
	};
	return (
		<div>
			<List>
				<ListItem
					button
					onClick={changeRoute('/add-lead')}
					className={clsx(manageSelectedStyle('/add-lead'))}
				>
					<ListItemIcon>
						<PostAddIcon
							color="primary"
							className={clsx(
								manageSelectedStyleIcon('/add-lead')
							)}
						/>
					</ListItemIcon>
					<ListItemText primary={'Add Lead'} />
				</ListItem>
				<ListItem
					button
					onClick={changeRoute('/leads')}
					className={clsx(manageSelectedStyle('/leads'))}
				>
					<ListItemIcon>
						<ListAltIcon
							color="primary"
							className={clsx(manageSelectedStyleIcon('/leads'))}
						/>
					</ListItemIcon>
					<ListItemText primary={'My Leads'} />
				</ListItem>
				<ListDropDown
					open={propertyOpen}
					toggle={setPropertyOpen}
					Icon={ChromeReaderModeIcon}
					label={'Manage Blog'}
				>
					<ListItem
						button
						onClick={changeRoute('/add-blog')}
						className={clsx(
							manageSelectedStyle('/add-blog'),
							style.nested
						)}
					>
						<ListItemIcon>
							<ListAltIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/add-blog')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Add Blog'} />
					</ListItem>
				</ListDropDown>
				<ListDropDown
					open={blogOpen}
					toggle={setBlogOpen}
					Icon={ApartmentIcon}
					label={'Manage Property'}
				>
					<ListItem
						button
						onClick={changeRoute('/add-property/rent')}
						className={clsx(
							manageSelectedStyle('/add-property/rent'),
							style.nested
						)}
					>
						<ListItemIcon>
							<ListAltIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon(
										'/add-property/rent'
									)
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Add Property Rent'} />
					</ListItem>
				</ListDropDown>
			</List>
		</div>
	);
};

export default DrawerListItems;
