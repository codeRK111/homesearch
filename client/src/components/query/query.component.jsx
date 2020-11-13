import { Box, Divider, Grid } from '@material-ui/core';
import {
	faEnvelopeOpen,
	faMobileAlt,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AlignCenter } from '../../components/flexContainer/flexContainer.component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		margin: '0.5rem 0',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	message: {
		color: theme.fontColor,
	},
	cGreen: {
		color: theme.colorTwo,
	},
	icon: {
		fontSize: '0.8rem',
	},
	userDetailsWrapper: {
		marginRight: '1rem',
	},
	userDetails: {
		fontSize: '0.9rem',
		color: theme.fontColor,
	},
}));

export default function SimpleCard({ received }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					2nd Nov 2020
				</Typography>
				<b>3 BHK property for sale</b>

				<Box mt="1rem">
					<Typography
						variant="body2"
						component="p"
						className={classes.message}
					>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Vel aliquam consectetur debitis possimus tenetur,
						labore animi dicta minima. Tempora, ipsa?
					</Typography>
				</Box>
				{received && (
					<Box>
						<Box mt="0.5rem" mb="0.5rem">
							<Divider />
						</Box>
						<Box width="100%">
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<AlignCenter
										className={classes.userDetailsWrapper}
									>
										<Box mr="0.5rem">
											<FontAwesomeIcon
												icon={faUser}
												className={[
													classes.cGreen,
													classes.icon,
												].join(' ')}
											/>
										</Box>
										<Typography
											className={classes.userDetails}
										>
											Patik Gandhi
										</Typography>
									</AlignCenter>
								</Grid>
								<Grid item xs={12} md={4}>
									<AlignCenter
										className={classes.userDetailsWrapper}
									>
										<Box mr="0.5rem">
											<FontAwesomeIcon
												icon={faEnvelopeOpen}
												className={[
													classes.cGreen,
													classes.icon,
												].join(' ')}
											/>
										</Box>
										<Typography
											className={classes.userDetails}
										>
											rakeshchandrra@gmail.com
										</Typography>
									</AlignCenter>
								</Grid>
								<Grid item xs={12} md={4}>
									<AlignCenter
										className={classes.userDetailsWrapper}
									>
										<Box mr="0.5rem">
											<FontAwesomeIcon
												icon={faMobileAlt}
												className={[
													classes.cGreen,
													classes.icon,
												].join(' ')}
											/>
										</Box>
										<Typography
											className={classes.userDetails}
										>
											9853325956
										</Typography>
									</AlignCenter>
								</Grid>
							</Grid>
						</Box>
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
