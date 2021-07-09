import { Box, Button, ListItemAvatar, Typography } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import noImage from '../../assets/no-image.jpg';
import { red } from '@material-ui/core/colors';

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

export default function RecipeReviewCard({ propertyPackage }) {
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
							propertyPackage.status === 'active' ? true : 'false'
						}
					/>
				}
				title={propertyPackage.name}
				subheader={propertyPackage.price}
			/>

			<CardContent>
				<Typography align="center" variant="h6">
					Package Details
				</Typography>
				<List disablePadding>
					{propertyPackage.packageDetails.map((c, i) => (
						<ListItem key={i} dense={true}>
							<ListItemAvatar
								classes={{ root: classes.listItemAvatar }}
							>
								<Avatar classes={{ root: classes.avatarItem }}>
									<StarIcon fontSize="small" />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={c.detail} />
						</ListItem>
					))}
				</List>
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
			</CardContent>
		</Card>
	);
}
