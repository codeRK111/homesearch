import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import React from 'react';
import badgeIcon from '../../assets/icons/badge.svg';
import useStyles from './details.style';
import { withStyles } from '@material-ui/core/styles';

const SmallAvatar = withStyles((theme) => ({
	root: {
		width: 22,
		height: 22,
		border: `2px solid ${theme.palette.background.paper}`,
	},
}))(Avatar);
const CustomBadge = withStyles((theme) => ({
	badge: {
		bottom: -15,
		right: -25,
	},
}))(Badge);

export default function BadgeAvatar({ photo }) {
	const { realtorPhoto } = useStyles();
	return (
		<div>
			<CustomBadge
				overlap="circular"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={<SmallAvatar alt="Remy Sharp" src={badgeIcon} />}
			>
				<Avatar
					variant="rounded"
					alt="Travis Howard"
					src={photo}
					className={realtorPhoto}
				/>
			</CustomBadge>
		</div>
	);
}
