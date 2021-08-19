import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getAddAgentPageData, searchByCity } from '../../utils/asyncProject';

import AutocompleteProjects from './autoComplete';
import ErrorCard from '../../components/errorCard';
import LoaderBackdrop from '../../components/backdrop';
import SearchPlace from '../../components/searchPlace';
import axios from 'axios';
import useStyles from './addAgent.style';

const AddAgent = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const fetchProjectSource = useRef(null);
	const [data, setData] = useState(null);
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [projectCity, setProjectCity] = useState(null);
	const [admin, setAdmin] = useState('');
	const [error, setError] = useState(null);

	const onAdminChange = (e) => {
		setAdmin(e.target.value);
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
	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop open={loading} />
			<h1>Add Agent</h1>
			{error && <ErrorCard error={error} />}
			{data && (
				<div className={classes.formWrapper}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="filled" fullWidth>
								<InputLabel id="demo-simple-select-filled-label">
									Select Staff
								</InputLabel>
								<Select
									labelId="demo-simple-select-filled-label"
									id="demo-simple-select-filled"
									value={admin}
									onChange={onAdminChange}
									fullWidth
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{data.admins.map((c) => (
										<MenuItem
											key={c.id}
											value={c.id}
										>{`${c.name} - ${c.type}`}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
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
							<AutocompleteProjects
								projects={projects}
								onSelect={setSelectedProject}
							/>
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
};

export default AddAgent;
