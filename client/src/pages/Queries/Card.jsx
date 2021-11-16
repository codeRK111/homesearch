import {
	StaticPaths,
	capitalizeFirstLetter,
	parseDate,
} from '../../utils/render.utils';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		background: theme.shadowColor,
		borderRadius: 20,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
	tag: {
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		padding: '0.7rem 0.5rem',
		fontWeight: 'bold',
		fontSize: 12,
		borderRadius: 10,
	},
}));

export default function RecipeReviewCard({ query }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root} elevation={5}>
			<CardHeader
				avatar={
					<Avatar
						aria-label="recipe"
						className={classes.avatar}
						src={StaticPaths.profile(query.queryByUser.photo)}
					>
						R
					</Avatar>
				}
				action={
					<div className={classes.tag}>
						{capitalizeFirstLetter(query.queryType)}
					</div>
				}
				title={query.queryByUser.name}
				subheader={parseDate(query.createdAt)}
			/>

			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					<b>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. pit!
					</b>
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Typography>View User Details</Typography>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Box display="flex" alignItems="center">
						<PermIdentityIcon />
						<Box ml="1rem">
							<b>{query.queryByUser.name}</b>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<MailOutlineIcon />
						<Box ml="1rem">
							<b>{query.queryByUser.email}</b>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<PhoneIcon />
						<Box ml="1rem">
							<b>{query.queryByUser.number}</b>
						</Box>
					</Box>
				</CardContent>
			</Collapse>
		</Card>
	);
}
