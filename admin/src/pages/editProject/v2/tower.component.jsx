import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Select,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { copyTower, manageTowerFloorPlan } from '../../../utils/asyncProject';

import ActiveIcon from '@material-ui/icons/CheckCircle';
import ChipHeading from '../../../components/chipHeading';
import EditIcon from '@material-ui/icons/Edit';
import EditTextField from '../../addProject/v2/editTextField';
import InactiveIcon from '@material-ui/icons/Cancel';
import RemoveTowerButton from './removeButton';
import StatusSwitch from './switch.component';
import axios from 'axios';
import { renderImage } from '../../../utils/render.utils';
import useEditStyles from './style';
import useStyles from '../../addProject/addProject.style';

const Tower = ({
	project,
	fetchProject,
	tower,
	properties,
	onAddClick,
	onEditClick,
	onStatusChange,
}) => {
	const classes = useStyles();
	const editClasses = useEditStyles();
	const [floorPlan, setFloorPlan] = useState(null);

	// UI
	const [error, setError] = useState(null);
	const [showEdit, setShowEdit] = useState(false);
	const [uploadOption, setUploadOption] = useState(null);

	// Cancel Token
	const cancelToken = useRef(undefined);
	const cancelTokenCopyTower = useRef(undefined);

	// Loaders
	const [uploadImageLoading, setUploadImageLoading] = useState(false);
	const [copyTowerLoading, setCopyTowerLoading] = useState(false);

	// Data
	const propertiesToShow = properties.filter(
		(b) => b.tower._id === tower._id
	);

	const handleShowEdit = () => {
		setShowEdit(!showEdit);
	};
	const onAddUnit = () => {
		onAddClick(tower)();
	};

	const onClickUploadOption = (option) => () => {
		setUploadOption(option);
	};

	const handleFloorPlan = async (e) => {
		const img = e.target.files[0];
		setFloorPlan(img);
		try {
			const formData = new FormData();
			formData.append('floorPlan', img);
			cancelToken.current = axios.CancelToken.source();
			await manageTowerFloorPlan(
				project.id,
				tower._id,
				formData,
				cancelToken.current,
				setUploadImageLoading
			);
			setError(null);
			fetchProject();
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	const handleChangeCopy = async (e) => {
		const { value } = e.target;
		try {
			cancelTokenCopyTower.current = axios.CancelToken.source();
			const response = await copyTower(
				tower._id,
				value,
				project.id,
				cancelTokenCopyTower.current,
				setCopyTowerLoading
			);
			console.log(response);
			fetchProject();
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (propertiesToShow.length > 0) {
			setUploadOption('add');
		}
	}, [propertiesToShow]);

	return (
		<Card className={editClasses.cardWrapper}>
			{copyTowerLoading ? (
				<Box
					width="100%"
					height="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress size={40} />
				</Box>
			) : (
				<>
					<CardHeader
						action={
							<IconButton
								aria-label="settings"
								onClick={handleShowEdit}
							>
								<EditIcon />
							</IconButton>
						}
						title={
							showEdit ? (
								<EditTextField
									tower={tower}
									project={project.id}
									fetchProject={fetchProject}
									setShowEdit={setShowEdit}
								/>
							) : (
								tower.name
							)
						}
					/>
					<Box p="0.5rem">
						{error && (
							<Typography align="center" style={{ color: 'red' }}>
								{error}
							</Typography>
						)}
						<Box mb="1rem">
							<StatusSwitch
								tower={tower}
								project={project}
								fetchProject={fetchProject}
							/>
						</Box>
						<Box mb="1rem">
							<Divider />
						</Box>
						{propertiesToShow.length === 0 && (
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Box display="flex" justifyContent="center">
										<Typography variant="caption">
											Select unit upload option
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6}>
									<Button
										size="small"
										variant="outlined"
										color="primary"
										fullWidth
										onClick={onClickUploadOption('copy')}
									>
										<Typography variant="caption">
											Copy From Others
										</Typography>
									</Button>
								</Grid>
								<Grid item xs={12} md={6}>
									<Button
										size="small"
										variant="outlined"
										color="primary"
										fullWidth
										onClick={onClickUploadOption('add')}
									>
										<Typography variant="caption">
											Add Manually
										</Typography>
									</Button>
								</Grid>
							</Grid>
						)}
						{(() => {
							switch (uploadOption) {
								case 'copy':
									return project.towerNames.length > 1 &&
										propertiesToShow.length === 0 ? (
										<Box
											display={'flex'}
											justifyContent={'center'}
										>
											<FormControl fullWidth>
												<InputLabel htmlFor="age-native-simple">
													Copy From
												</InputLabel>
												<Select
													native
													onChange={handleChangeCopy}
												>
													<option
														aria-label="None"
														value=""
													/>
													{project.towerNames
														.filter(
															(c) =>
																c._id !==
																tower._id
														)
														.map((c) => (
															<option
																value={c._id}
																key={c._id}
															>
																{c.name}
															</option>
														))}
												</Select>
											</FormControl>
										</Box>
									) : null;

								case 'add':
									return (
										<CardContent>
											<Box
												display="flex"
												justifyContent="space-between"
											>
												<input
													type="file"
													id={`upload-floorplan-${tower._id}`}
													accept="image/*"
													style={{ display: 'none' }}
													onChange={handleFloorPlan}
												/>
												{uploadImageLoading ? (
													<CircularProgress
														size={15}
													/>
												) : (
													<label
														htmlFor={`upload-floorplan-${tower._id}`}
														size="small"
														variant="outlined"
														color="primary"
														className={
															editClasses.floorplanWrapper
														}
													>
														<Typography
															variant="caption"
															style={{
																textTransform:
																	'uppercase',
															}}
														>
															Upload Floorplan
															Image
														</Typography>
													</label>
												)}

												<Button
													size="small"
													variant="outlined"
													color="primary"
													onClick={onAddUnit}
												>
													<Typography variant="caption">
														Add Unit
													</Typography>
												</Button>
											</Box>
											{properties.filter(
												(b) => b.tower._id === tower._id
											).length === 0 && (
												<Box mt="1rem">
													<RemoveTowerButton
														towerId={tower._id}
														projectId={project.id}
														fetchProject={
															fetchProject
														}
													/>
												</Box>
											)}
											{floorPlan ? (
												<img
													src={renderImage(floorPlan)}
													alt="Floorplan"
													className={
														editClasses.imageWrapper
													}
												/>
											) : tower.floorPlan ? (
												<img
													src={renderImage(
														tower.floorPlan,
														'/assets/projects'
													)}
													alt="Floorplan"
													className={
														editClasses.imageWrapper
													}
												/>
											) : (
												<Typography
													variant="caption"
													display="block"
													align="center"
												>
													No floor plan
												</Typography>
											)}
										</CardContent>
									);

								default:
									return null;
							}
						})()}
					</Box>

					<Box height="100%">
						<ChipHeading text="Available Units" />
						<List
							dense={true}
							className={classes.propertyItemsContainer}
						>
							{propertiesToShow.map((b) => (
								<ListItem key={b}>
									<ListItemText
										primary={
											<Typography variant="caption">
												{b.title}
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											aria-label="delete"
											size="small"
											onClick={onEditClick(b)}
										>
											<EditIcon
												style={{
													fontSize: '1.2rem',
												}}
											/>
										</IconButton>
										<IconButton
											edge="end"
											aria-label="delete"
											size="small"
											onClick={onStatusChange(b)}
										>
											{b.status === 'active' ? (
												<ActiveIcon
													style={{
														color: 'green',
														fontSize: '1.2rem',
													}}
												/>
											) : (
												<InactiveIcon
													style={{
														color: 'red',
														fontSize: '1.2rem',
													}}
												/>
											)}
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</Box>
				</>
			)}
		</Card>
	);
};

export default Tower;
