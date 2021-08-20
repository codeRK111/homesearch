import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import {
	addAgent,
	getAddAgentPageData,
	searchByCity,
} from '../../utils/asyncProject';

import Alert from '@material-ui/lab/Alert';
import AutocompleteStaffs from './autoComplete';
import ErrorCard from '../../components/errorCard';
import LoaderBackdrop from '../../components/backdrop';
import SearchPlace from '../../components/searchPlace';
import axios from 'axios';
import useStyles from './addAgent.style';

const AddAgent = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const fetchProjectSource = useRef(null);
	const addAgentSource = useRef(null);
	const [data, setData] = useState(null);
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [projectCity, setProjectCity] = useState(null);
	const [agents, setAgents] = useState([]);
	const [error, setError] = useState(null);

	const onProjectChange = (e) => {
		setSelectedProject(e.target.value);
	};

	const onAddAgent = async () => {
		try {
			const data = {
				project: selectedProject,
				agents,
			};
			addAgentSource.current = axios.CancelToken.source();
			await addAgent(data, addAgentSource.current, setAddLoading);
			setAgents([]);
			setSelectedProject(null);
			setProjectCity(null);
			setSuccessMessage(true);
		} catch (error) {
			setError(error);
			setSuccessMessage(false);
		}
	};

	useEffect(() => {
		const source = axios.CancelToken.source();
		getAddAgentPageData(source, setLoading)
			.then((resp) => {
				setData(resp);
				setError(null);
			})
			.catch((error) => {
				setError(error);
			});

		return () => {
			source.cancel('Component got unmounted');
		};
	}, []);
	useEffect(() => {
		if (projectCity) {
			fetchProjectSource.current = axios.CancelToken.source();
			searchByCity(projectCity.id, fetchProjectSource.current, setLoading)
				.then((resp) => {
					setProjects(resp);
					setError(null);
				})
				.catch((error) => {
					setError(error);
				});
			return () => {
				fetchProjectSource.current.cancel('Component got unmounted');
			};
		}
	}, [projectCity]);

	const buttonProps = {
		onClick: onAddAgent,
	};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}
	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop open={loading} />
			<h1>Add Agent</h1>
			{error && <ErrorCard error={error} />}
			{data && (
				<div className={classes.formWrapper}>
					{successMessage && (
						<Box mb="1rem">
							<Alert
								severity="success"
								onClose={() => setSuccessMessage(false)}
							>
								Agent added successfully
							</Alert>
						</Box>
					)}
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<SearchPlace
								type="city"
								onSelect={(c) => {
									setProjectCity(c);
								}}
								error={null}
								padding={false}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="filled" fullWidth>
								<InputLabel id="demo-simple-select-filled-label">
									Select Project
								</InputLabel>
								<Select
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									value={selectedProject}
									onChange={onProjectChange}
									fullWidth
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{projects.map((c) => (
										<MenuItem
											key={c.id}
											value={c.id}
										>{`${c.title}`}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{data && data.admins && (
							<Grid item xs={12}>
								<AutocompleteStaffs
									projects={data.admins}
									onSelect={setAgents}
									value={agents}
								/>
							</Grid>
						)}
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								{...buttonProps}
							>
								Add Agent
							</Button>
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
};

export default AddAgent;
