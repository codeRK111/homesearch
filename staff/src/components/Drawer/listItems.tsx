import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import GetAppIcon from '@material-ui/icons/GetApp';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListDropDown from '../ListCollapse';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import RenderByMultipleRole from '../RenderByRole/multiple';
import RenderByRole from '../RenderByRole';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
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
				<RenderByMultipleRole
					types={[StaffType.GM, StaffType.ClientSupport]}
				>
					<ListItem
						button
						onClick={changeRoute('/add-project')}
						className={clsx(manageSelectedStyle('/add-project'))}
					>
						<ListItemIcon>
							<PostAddIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/add-project')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Add Project'} />
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
				<ListItem
					button
					onClick={changeRoute('/testimonials')}
					className={clsx(manageSelectedStyle('/testimonials'))}
				>
					<ListItemIcon>
						<PeopleAltIcon
							color="primary"
							className={clsx(
								manageSelectedStyleIcon('/testimonials')
							)}
						/>
					</ListItemIcon>
					<ListItemText primary={'Manage Testimonials'} />
				</ListItem>
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
				<RenderByMultipleRole types={[StaffType.Accountant]}>
					<ListItem
						button
						onClick={changeRoute('/manage-target')}
						className={clsx(manageSelectedStyle('/manage-target'))}
					>
						<ListItemIcon>
							<MonetizationOnIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/manage-target')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Manage Target'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole types={[StaffType.Accountant]}>
					<ListItem
						button
						onClick={changeRoute('/manage-gst')}
						className={clsx(manageSelectedStyle('/manage-gst'))}
					>
						<ListItemIcon>
							<MonetizationOnIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/manage-gst')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Manage GST'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole types={[StaffType.GM]}>
					<ListItem
						button
						onClick={changeRoute('/manage-city')}
						className={clsx(manageSelectedStyle('/manage-city'))}
					>
						<ListItemIcon>
							<LocationCityIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/manage-city')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Manage City'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole types={[StaffType.Accountant]}>
					<ListItem
						button
						onClick={changeRoute('/manage-packages')}
						className={clsx(
							manageSelectedStyle('/manage-packages')
						)}
					>
						<ListItemIcon>
							<PaymentIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/manage-packages')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Manage Packages'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole
					types={[StaffType.ClientSupport, StaffType.Accountant]}
				>
					<ListItem
						button
						onClick={changeRoute('/share-package-link')}
						className={clsx(
							manageSelectedStyle('/share-package-link')
						)}
					>
						<ListItemIcon>
							<ShareIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon(
										'/share-package-link'
									)
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Share Package Link'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole
					types={[
						StaffType.ClientSupport,
						StaffType.Accountant,
						StaffType.AssistantSalesManager,
						StaffType.SalesExecutive,
					]}
				>
					<ListItem
						button
						onClick={changeRoute('/my-deals')}
						className={clsx(manageSelectedStyle('/my-deals'))}
					>
						<ListItemIcon>
							<CheckCircleIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/my-deals')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'My Deals'} />
					</ListItem>
				</RenderByMultipleRole>
				<RenderByMultipleRole
					types={[StaffType.Accountant, StaffType.SuperAdmin]}
				>
					<ListItem
						button
						onClick={changeRoute('/create-invoice')}
						className={clsx(manageSelectedStyle('/create-invoice'))}
					>
						<ListItemIcon>
							<GetAppIcon
								color="primary"
								className={clsx(
									manageSelectedStyleIcon('/create-invoice')
								)}
							/>
						</ListItemIcon>
						<ListItemText primary={'Create Invoice'} />
					</ListItem>
				</RenderByMultipleRole>
			</List>
		</div>
	);
};

export default DrawerListItems;
