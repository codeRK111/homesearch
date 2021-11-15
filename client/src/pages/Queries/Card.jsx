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
import { red } from '@material-ui/core/colors';

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
		backgroundColor: red[500],
	},
}));

export default function RecipeReviewCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root} elevation={5}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				title="Rakesh Chandra Dash"
				subheader="September 14, 2016"
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
							<b>Rakesh Chandra Dash</b>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<MailOutlineIcon />
						<Box ml="1rem">
							<b>rakeshchandrra@gmail.com</b>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" mt="1rem">
						<PhoneIcon />
						<Box ml="1rem">
							<b>9853325956</b>
						</Box>
					</Box>
				</CardContent>
			</Collapse>
		</Card>
	);
}
