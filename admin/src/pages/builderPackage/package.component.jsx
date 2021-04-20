import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemAvatar, Box, Button } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import noImage from '../../assets/no-image.jpg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
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
	bgImage: {
		backgroundSize: 'contain',
	},
	noSpace: {
		margin: 0,
		padding: 0,
	},
	avatarItem: {
		height: 30,
		width: 30,
	},
	listItemAvatar: {
		minWidth: 40,
	},
}));

export default function RecipeReviewCard({ builderPackage }) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						P
					</Avatar>
				}
				action={
					<Switch
						color="primary"
						checked={
							builderPackage.status === 'active' ? true : 'false'
						}
					/>
				}
				title={builderPackage.name}
				subheader={builderPackage.price}
			/>
			<CardMedia
				className={classes.media}
				classes={{
					root: classes.bgImage,
				}}
				image={
					builderPackage.photo
						? `/assets/builders/packages/${builderPackage.photo}`
						: noImage
				}
				title="Paella dish"
			/>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				mt="1rem"
			>
				<Box mr="1rem">
					<Button
						startIcon={<EditIcon />}
						size="small"
						color="primary"
						variant="contained"
					>
						Update
					</Button>
				</Box>
			</Box>
			<CardContent>
				<List disablePadding>
					{builderPackage.packageDetails.map((c, i) => (
						<ListItem key={i} dense={true}>
							<ListItemAvatar
								classes={{ root: classes.listItemAvatar }}
							>
								<Avatar classes={{ root: classes.avatarItem }}>
									<StarIcon fontSize="small" />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={c} />
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
