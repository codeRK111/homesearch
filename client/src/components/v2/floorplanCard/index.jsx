import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ViewFullImage from '../viewFullImage';
import { makeStyles } from '@material-ui/core/styles';
import useGlobalStyle from '../../../common.style';

// import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		borderRadius: 20,
		background: theme.shadowColor,
		boxShadow: '10px 10px 20px #c7c7c7,-10px -10px 20px #f9f9f9',
		height: '100%',
	},
	media: {
		height: 200,
	},
}));

export default function MediaCard({ property, floorPlan }) {
	const classes = useStyles();
	const { noSpace } = useGlobalStyle();
	const [fullImageOpen, setFullImageOpen] = React.useState(false);
	const toggleFullImage = (status) => () => {
		setFullImageOpen(status);
	};

	return (
		<Card className={classes.root}>
			<ViewFullImage
				open={fullImageOpen}
				handleClose={toggleFullImage(false)}
				title={floorPlan.label}
				image={`/assets/projects/${floorPlan.image}`}
			/>

			<CardMedia
				className={classes.media}
				image={`/assets/projects/${floorPlan.image}`}
				title="Contemplative Reptile"
			/>
			<CardContent>
				<h3 className={noSpace}>About Plan</h3>
				<Typography variant="body2" color="textSecondary" component="p">
					{floorPlan.label}
				</Typography>
			</CardContent>

			<CardActions>
				<Button
					size="small"
					color="primary"
					onClick={toggleFullImage(true)}
				>
					View Full Image
				</Button>
			</CardActions>
		</Card>
	);
}
