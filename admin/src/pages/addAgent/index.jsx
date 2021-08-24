import { Box, Button, CircularProgress, Grid, Paper } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	addAgent,
	getAddAgentPageData,
	getAgentsOfAProject,
} from '../../utils/asyncProject';

import Alert from '@material-ui/lab/Alert';
import AutocompleteStaffs from './autoComplete';
import ClientSupportChip from './clientSupport.component';
import ErrorCard from '../../components/errorCard';
import LoaderBackdrop from '../../components/backdrop';
import axios from 'axios';
import useStyles from './addAgent.style';

const AddAgent = ({
	match: {
		params: { id },
	},
}) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [notFound, setFound] = useState(false);
	const [fetchExistingLoading, setFetchExistingLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const addAgentSource = useRef(null);
	const fetchExistingSource = useRef(null);
	const [data, setData] = useState(null);
	const [selectedProject, setSelectedProject] = useState(id);
	const [agents, setAgents] = useState([]);
	const [existingAgents, setExistingAgents] = useState([]);
	const [error, setError] = useState(null);

	const onAddAgent = async () => {
		if (agents.length > 0) {
			try {
				const data = {
					project: selectedProject,
					agents,
				};
				addAgentSource.current = axios.CancelToken.source();
				await addAgent(data, addAgentSource.current, setAddLoading);
				setAgents([]);
				setSuccessMessage(true);
				fetchExisting();
			} catch (error) {
				setError(error);
				setSuccessMessage(false);
			}
		}
	};

	const fetchExisting = useCallback(() => {
		if (id) {
			fetchExistingSource.current = axios.CancelToken.source();
			getAgentsOfAProject(
				id,
				fetchExistingSource.current,
				setFetchExistingLoading
			)
				.then((resp) => {
					if (resp) {
						setExistingAgents(resp.agents);
						if (resp.agents.length > 0) {
							setFound(false);
						} else {
							setFound(true);
						}
					} else {
						setFound(true);
						setExistingAgents([]);
					}
				})
				.catch((error) => {
					setFound(false);
					setExistingAgents(null);
					setError(error);
				});
		}
	}, [id]);

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

		// return () => {
		// 	source.cancel('Component got unmounted');
		// };
	}, []);
	useEffect(() => {
		fetchExisting();

		return () => {
			if (fetchExistingSource.current) {
				fetchExistingSource.current.cancel();
			}
		};
	}, [fetchExisting]);

	const buttonProps = {
		onClick: onAddAgent,
	};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}
	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop open={loading} />
			{error && <ErrorCard error={error} />}
			<h3>Existing Agents</h3>
			{fetchExistingLoading ? (
				<p>Fetching Existing agents ...</p>
			) : notFound ? (
				<p>No agents</p>
			) : (
				<Paper component="ul" className={classes.chipWrapper}>
					{existingAgents.map((c) => (
						<li key={c.id}>
							<ClientSupportChip
								admin={c}
								fetchExisting={fetchExisting}
								projectId={id}
							/>
						</li>
					))}
				</Paper>
			)}

			<h3>Add Agent</h3>
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
