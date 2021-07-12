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
import PackageEdit from './updatePackage.component';
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { Switch } from '@material-ui/core';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
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

export default function RecipeReviewCard({ propertyPackage, fetchPackages }) {
	let cancelToken = React.useRef();
	const classes = useStyles();
	const [editOpen, setEditOpen] = React.useState(false);
	const [status, setStatus] = React.useState(
		propertyPackage.status === 'active' ? true : false
	);
	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});
	const handleClickOpen = () => {
		setEditOpen(true);
	};
	const handleClose = () => {
		setEditOpen(false);
	};

	const changeStatus = async (value) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();
			const jwt = localStorage.getItem('JWT');
			await axios.patch(
				apiUrl(
					`/utility/property-package/${propertyPackage._id}`,
					'v2'
				),
				{
					status: value ? 'active' : 'inactive',
				},
				{
					cancelToken: cancelToken.current.token,
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
		} catch (error) {
			setAsyncState({
				error: error.response.data.message,
				loading: false,
			});
		}
	};

	const handleStatus = (event) => {
		setStatus(event.target.checked);
		changeStatus(event.target.checked);
	};

	return (
		<Card className={classes.root} elevation={5}>
			<PackageEdit
				open={editOpen}
				handleClose={handleClose}
				propertyPackage={propertyPackage}
				fetchPackages={fetchPackages}
			/>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						P
					</Avatar>
				}
				action={
					<Switch
						color="primary"
						onChange={handleStatus}
						checked={status}
					/>
				}
				title={propertyPackage.name}
				subheader={`₹${propertyPackage.price}`}
			/>

			<CardContent>
				<Box display="flex" justifyContent="center" mb="0.5rem">
					<Typography align="center" variant="caption">
						Expiry Date
					</Typography>
				</Box>
				<Box mb="0.5rem">
					<Typography align="center" variant="h6">
						{moment(propertyPackage.expiresAt).format('DD-MM-YYYY')}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="center" mb="0.5rem">
					<Typography align="center" variant="caption">
						Package Details
					</Typography>
				</Box>
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
							onClick={handleClickOpen}
						>
							Update
						</Button>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
