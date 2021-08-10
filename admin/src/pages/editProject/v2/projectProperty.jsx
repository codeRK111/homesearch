import {
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	CircularProgress,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
} from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import {
	getProject,
	updateProjectProperty,
	updateTowerNumbers,
} from '../../../utils/asyncProject';

import ActiveIcon from '@material-ui/icons/CheckCircle';
import AddPropertyUnit from '../../../components/addProjectUnit';
import EditIcon from '@material-ui/icons/Edit';
import EditTextField from '../../addProject/v2/editTextField';
import ErrorCard from '../../../components/errorCard';
import InactiveIcon from '@material-ui/icons/Cancel';
import LoaderBackdrop from '../../../components/backdrop';
import UpdateProjectUnitDialog from '../../../components/updateProjectUnit';
import axios from 'axios';
import { getAddProjectPageInfo } from '../../../utils/asyncFunctions';
import useStyles from '../../addProject/addProject.style';

const UpdateProjectProperty = ({
	match: {
		params: { pId, pType },
	},
}) => {
	const classes = useStyles();
	const cancelTokenFetchProject = useRef(undefined);
	const cancelToken = useRef(undefined);
	const cancelTokenChangeStatus = useRef(undefined);
	const [showEdit, setShowEdit] = React.useState(null);
	const [project, setProject] = useState(null);
	const [towers, setTowers] = React.useState(1);
	const [fetchError, setFetchError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [resourcesLoading, setResourcesLoading] = useState(false);
	const [updateTowerLoading, setUpdateTowerLoading] = React.useState(false);
	const [properties, setProperties] = useState([]);
	const [selectedTower, setSelectedTower] = React.useState(null);
	const [property, setProperty] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [changeStatusLoading, setChangeStatusLoading] = React.useState(false);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
	const [resources, setResources] = React.useState(null);

	const toggleDialog = (status) => () => {
		setOpen(status);
	};
	const toggleUpdateDialog = (status) => () => {
		setUpdateDialogOpen(status);
	};

	const onAddClick = (towerDetails) => () => {
		setSelectedTower(towerDetails);
		toggleDialog(true)();
	};
	const onEditClick = (propertyDetails) => () => {
		setProperty(propertyDetails);
		toggleUpdateDialog(true)();
	};

	const handleShowEdit = (towerDetails) => () => {
		if (showEdit && showEdit.id === towerDetails.id) {
			setShowEdit(null);
		} else {
			setShowEdit(towerDetails);
		}
	};

	const fetchProject = useCallback(() => {
		cancelTokenFetchProject.current = axios.CancelToken.source();
		getProject(pId, cancelTokenFetchProject.current, setLoading)
			.then((data) => {
				setProject(data.project);
				setProperties(data.properties);
				setFetchError(null);
			})
			.catch((error) => {
				setFetchError(error);
			});
	}, [pId]);

	const updateTower = () => {
		if (towers) {
			cancelToken.current = axios.CancelToken.source();
			updateTowerNumbers(
				pId,
				{
					towers: towers,
					towerNames: Array.from(
						{ length: towers },
						(_, i) => project.towerNames.length + (i + 1)
					).map((c) => ({ name: `${c}` })),
				},
				cancelToken.current,
				setUpdateTowerLoading
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

	const fetchPageDetails = useCallback(() => {
		cancelToken.current = axios.CancelToken.source();
		getAddProjectPageInfo(
			cancelToken.current,
			setResourcesLoading,
			setFetchError
		).then((data) => {
			setResources(data);
			console.log({ data });
		});
	}, []);

	const onStatusChange = (details) => () => {
		const formData = new FormData();
		if (details.status === 'active') {
			formData.append('status', 'expired');
		} else {
			formData.append('status', 'active');
		}
		cancelTokenChangeStatus.current = axios.CancelToken.source();
		updateProjectProperty(
			details.id,
			formData,
			cancelTokenChangeStatus.current,
			setChangeStatusLoading
		)
			.then((resp) => {
				fetchProject();
			})
			.catch((error) => {
				console.log(error);
				// setAddProjectError(error);
			});
	};

	React.useEffect(() => {
		fetchProject();
	}, [pId, fetchProject]);

	React.useEffect(() => {
		fetchPageDetails();
	}, [pId, fetchPageDetails]);

	const setTowerButtonProps = {};
	if (updateTowerLoading) {
		setTowerButtonProps.endIcon = (
			<CircularProgress size={20} color="inherit" />
		);
	}
	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop
				open={loading || resourcesLoading || changeStatusLoading}
			/>
			<h1>Update Project Property</h1>
			{fetchError && <ErrorCard error={fetchError} />}
			{!!project && !!resources && (
				<>
					<AddPropertyUnit
						open={open}
						handleClose={toggleDialog(false)}
						projectType={pType}
						resources={resources}
						project={pId}
						tower={selectedTower}
						fetchProject={fetchProject}
					/>
					{!!property && (
						<UpdateProjectUnitDialog
							open={updateDialogOpen}
							handleClose={toggleUpdateDialog(false)}
							projectType={pType}
							resources={resources}
							project={pId}
							tower={selectedTower}
							fetchProject={fetchProject}
							state={property}
						/>
					)}
					<Box mb="1rem">
						<TextField
							id="filled-basic"
							label="Number of towers to add"
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
						Add Towers
					</Button>
					<h3>Unit Config</h3>
					{/* <pre>{JSON.stringify(projectInfo, null, 2)}</pre> */}
					<Grid container spacing={3}>
						{project.towerNames.map((c) => (
							<Grid item xs={12} md={4} key={c._id}>
								<Card>
									<CardHeader
										action={
											<IconButton
												aria-label="settings"
												onClick={handleShowEdit(c)}
											>
												<EditIcon />
											</IconButton>
										}
										title={
											showEdit &&
											showEdit._id === c._id ? (
												<EditTextField
													tower={c}
													project={pId}
													fetchProject={fetchProject}
													setShowEdit={setShowEdit}
												/>
											) : (
												c.name
											)
										}
										subheader={`Tower- ${c.name}`}
									/>
									{/* <Box className={gClasses.justifyBetween}>
							<h4>Tower - {c.name}</h4>
							<IconButton
								color="primary"
								onClick={toggleDialog(true)}
							>
								<AddIcon />
							</IconButton>
						</Box>
						<Divider /> */}
									<List
										dense={true}
										className={
											classes.propertyItemsContainer
										}
									>
										{properties
											.filter(
												(b) => b.tower._id === c._id
											)
											.map((b) => (
												<ListItem key={b}>
													<ListItemText
														primary={b.title}
													/>
													<ListItemSecondaryAction>
														<IconButton
															edge="end"
															aria-label="delete"
															size="small"
															onClick={onEditClick(
																b
															)}
														>
															<EditIcon />
														</IconButton>
														<IconButton
															edge="end"
															aria-label="delete"
															size="small"
															onClick={onStatusChange(
																b
															)}
														>
															{b.status ===
															'active' ? (
																<ActiveIcon
																	style={{
																		color: 'green',
																	}}
																/>
															) : (
																<InactiveIcon
																	style={{
																		color: 'red',
																	}}
																/>
															)}
														</IconButton>
													</ListItemSecondaryAction>
												</ListItem>
											))}
									</List>
									<CardActions>
										<Button
											size="small"
											color="primary"
											onClick={onAddClick(c)}
										>
											Add Floor plan
										</Button>
										{properties.filter(
											(b) => b.tower._id === c._id
										).length === 0 && (
											<Button
												size="small"
												color="secondary"
											>
												Remove Tower
											</Button>
										)}
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default UpdateProjectProperty;
