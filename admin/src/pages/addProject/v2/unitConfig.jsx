import {
	Box,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import AddPropertyUnit from '../../../components/addProjectUnit';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import useGlobalStyles from '../../../common.style';
import useStyles from '../addProject.style';

function generate(element) {
	return Array.from({ length: 10 }).map((value) =>
		React.cloneElement(element, {
			key: value,
		})
	);
}

const UnitConfig = ({ handleNext, projectType, resources, projectInfo }) => {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const gClasses = useGlobalStyles();

	const toggleDialog = (status) => () => {
		setOpen(status);
	};
	return (
		<Box className={classes.wrapper}>
			<AddPropertyUnit
				open={open}
				handleClose={toggleDialog(false)}
				projectType={projectType}
				resources={resources}
			/>
			<h3>Unit Config</h3>
			{/* <pre>{JSON.stringify(projectInfo, null, 2)}</pre> */}
			<Grid container spacing={3}>
				{Array.from(
					{ length: projectInfo.towers },
					(_, i) => i + 1
				).map((c) => (
					<Grid item xs={12} md={4} key={c}>
						<Paper className={classes.towerWrapper}>
							<Box className={gClasses.justifyBetween}>
								<h4>Tower - {c}</h4>
								<IconButton
									color="primary"
									onClick={toggleDialog(true)}
								>
									<AddIcon />
								</IconButton>
							</Box>
							<Divider />
							<List
								dense={true}
								className={classes.propertyItemsContainer}
							>
								{generate(
									<ListItem>
										<ListItemText primary="Single-line item" />
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="delete"
												size="small"
											>
												<EditIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								)}
							</List>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
export default UnitConfig;
