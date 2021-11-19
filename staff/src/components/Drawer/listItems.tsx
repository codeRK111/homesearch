import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';

import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListDropDown from '../ListCollapse';
import PostAddIcon from '@material-ui/icons/PostAdd';
import RenderByMultipleRole from '../RenderByRole/multiple';
import RenderByRole from '../RenderByRole';
import SearchIcon from '@material-ui/icons/Search';
import { StaffType } from '../../model/staff.interface';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
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
	// const [propertyOpen, setPropertyOpen] = useState(false);
	// const [propertySaleOpen, setPropertySaleOpen] = useState(false);
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
					onClick={changeRoute('/')}
					className={clsx(manageSelectedStyle('/'))}
				>
					<ListItemIcon>
						<HomeIcon
							color="primary"
							className={clsx(manageSelectedStyleIcon('/'))}
						/>
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<RenderByMultipleRole
					types={[
						StaffType.AssistantSalesManager,
						StaffType.GM,
						StaffType.SalesExecutive,
					]}
				>
					<ListItem
						button
						onClick={changeRoute('/add-property-lead')}
						className={clsx(
							manageSelectedStyle('/add-property-lead')
						)}
					>
						<ListItemIcon>
							<PostAddIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon(
										'/add-property-lead'
									)
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Add Property'} />
					</ListItem>
				</RenderByMultipleRole>
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
					onClick={changeRoute('/browse-properties?t=0')}
					className={clsx(manageSelectedStyle('/browse-properties'))}
				>
					<ListItemIcon>
						<SearchIcon
							color="primary"
							className={clsx(
								manageSelectedStyleIcon('/browse-properties')
							)}
						/>
					</ListItemIcon>
					<ListItemText primary={'Browse Properties'} />
				</ListItem>
				<ListItem
					button
					onClick={changeRoute('/posted-leads')}
					className={clsx(manageSelectedStyle('/posted-leads'))}
				>
					<ListItemIcon>
						<ListAltIcon
							color="primary"
							className={clsx(
								manageSelectedStyleIcon('/posted-leads')
							)}
						/>
					</ListItemIcon>
					<ListItemText primary={'Posted Leads'} />
				</ListItem>
				<RenderByMultipleRole
					types={[StaffType.GM, StaffType.LeadStrategist]}
				>
					<ListItem
						button
						onClick={changeRoute('/lead-strategies')}
						className={clsx(
							manageSelectedStyle('/lead-strategies')
						)}
					>
						<ListItemIcon>
							<ListAltIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/lead-strategies')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'My Strategies'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByRole type={StaffType.GM}>
					<ListDropDown
						open={blogOpen}
						toggle={setBlogOpen}
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
						<ListItem
							button
							onClick={changeRoute('/blogs')}
							className={clsx(
								manageSelectedStyle('/blogs'),
								style.nested
							)}
						>
							<ListItemIcon>
								<ListAltIcon
									color="primary"
									className={clsx(
										manageSelectedStyleIcon('/blogs')
									)}
								/>
							</ListItemIcon>
							<ListItemText primary={'All Blogs'} />
						</ListItem>
					</ListDropDown>
				</RenderByRole>
				<RenderByMultipleRole
					types={[
						StaffType.GM,
						StaffType.ClientSupport,
						StaffType.Accountant,
					]}
				>
					<ListItem
						button
						onClick={changeRoute('/verify-payment')}
						className={clsx(manageSelectedStyle('/verify-payment'))}
					>
						<ListItemIcon>
							<VerifiedUserIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/verify-payment')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Verify Payment'} />
					</ListItem>
				</RenderByMultipleRole>
			</List>
		</div>
	);
};

export default DrawerListItems;
