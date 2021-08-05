import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	TextField,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import AddPropertyUnit from '../../../components/addProjectUnit';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import axios from 'axios';
import { updateProject } from '../../../utils/asyncProject';
import useGlobalStyles from '../../../common.style';
import useStyles from '../addProject.style';

const UnitConfig = ({
	handleNext,
	projectType,
	resources,
	projectInfo,
	fetchProject,
}) => {
	const cancelToken = React.useRef(undefined);
	const [open, setOpen] = React.useState(false);
	const [updateTowerLoading, setUpdateTowerLoading] = React.useState(false);
	const [towers, setTowers] = React.useState(projectInfo.towers);
	const [items, setItems] = React.useState([]);
	const classes = useStyles();
	const gClasses = useGlobalStyles();

	const toggleDialog = (status) => () => {
		setOpen(status);
	};

	const updateTower = () => {
		if (towers) {
			cancelToken.current = axios.CancelToken.source();
			updateProject(
				projectInfo.id,
				{
					towers: towers,
					towerNames: Array.from(
						{ length: towers },
						(_, i) => i + 1
					).map((c) => ({ name: `${c}` })),
				},
				cancelToken.current,
				setUpdateTowerLoading,
				'data'
			)
				.then((resp) => {
					fetchProject();
				})
				.catch((error) => {
					console.log(error);
					// setAddProjectError(error);
				});
		}
	};
	const setTowerButtonProps = {};
	if (updateTowerLoading) {
		setTowerButtonProps.endIcon = (
			<CircularProgress size={20} color="inherit" />
		);
	}
	return (
		<Box className={classes.wrapper}>
			<AddPropertyUnit
				open={open}
				handleClose={toggleDialog(false)}
				projectType={projectType}
				resources={resources}
				items={items}
				setItems={setItems}
			/>
			<Box mb="1rem">
				<TextField
					id="filled-basic"
					label="Number of towers"
					variant="filled"
					type="number"
					value={towers}
					onChange={(e) => setTowers(e.target.value)}
				/>
			</Box>
			<Button
				variant="contained"
				{...setTowerButtonProps}
				onClick={updateTower}
			>
				Save
			</Button>

			<h3>Unit Config</h3>
			{/* <pre>{JSON.stringify(projectInfo, null, 2)}</pre> */}
			<Grid container spacing={3}>
				{projectInfo.towerNames.map((c) => (
					<Grid item xs={12} md={4} key={c.id}>
						<Paper className={classes.towerWrapper}>
							<Box className={gClasses.justifyBetween}>
								<h4>Tower - {c.name}</h4>
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
								{items.map((b) => (
									<ListItem key={b}>
										<ListItemText primary={b} />
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
								))}
							</List>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
export default UnitConfig;
