import {
	Box,
	Chip,
	Grid,
	Menu,
	MenuItem,
	Slide,
	Typography,
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Plan from './plan.component';
import PlanSelect from '../planSelect/planSelect.component';
import React from 'react';
import useGlobalStyle from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './plans.style';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose }) {
	const classes = useStyles();
	const gClasses = useGlobalStyle();

	const [plan, setPlan] = React.useState('paid');
	const history = useHistory();

	const onNext = () => {
		if (plan === 'paid') {
			history.push('/packages/123');
		}
	};
	return (
		<div>
			<Dialog
				open={open}
				classes={{
					container: classes.container,
					paper: classes.paper,
				}}
				TransitionComponent={Transition}
				maxWidth={'xl'}
				keepMounted={true}
				fullWidth={true}
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{'Please choose a plan for your property'}
				</DialogTitle>
				<Box className={classes.contentWrapper}>
					<Grid container spacing={3} justify="center">
						<Grid item xs={12} md={3}>
							<Plan plan={plan} setPlan={setPlan} />
						</Grid>
						<Grid item xs={12} md={3}>
							<Plan plan={plan} setPlan={setPlan} />
						</Grid>
						<Grid item xs={12} md={3}>
							<Plan
								plan={plan}
								setPlan={setPlan}
								popular
								selected
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<Plan plan={plan} setPlan={setPlan} />
						</Grid>
					</Grid>
					<Box mt="2rem" className={classes.slideWrapper}>
						<Slide
							direction="left"
							in={plan === 'free'}
							mountOnEnter
							unmountOnExit
						>
							<Box className={classes.warningWrapper}>
								<Typography variant="caption">
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Reprehenderit
									necessitatibus corporis maxime ducimus
									fugit, consectetur fugiat ipsam sunt labore
									officia!
								</Typography>
							</Box>
						</Slide>
					</Box>
					<Box
						mt="2rem"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<button
							className={classes.button}
							onClick={handleClose}
						>
							Cancel
						</button>
						<button className={classes.button} onClick={onNext}>
							Next
						</button>
					</Box>
				</Box>
			</Dialog>
		</div>
	);
}
