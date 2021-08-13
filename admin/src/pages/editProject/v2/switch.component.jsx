import { Box, CircularProgress } from '@material-ui/core';
import React, { useRef, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { manageTowerStatus } from '../../../utils/asyncProject';
import { withStyles } from '@material-ui/core/styles';

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		display: 'flex',
	},
	switchBase: {
		padding: 2,
		color: theme.palette.grey[500],
		'&$checked': {
			transform: 'translateX(12px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
			},
		},
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: 'none',
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white,
	},
	checked: {},
}))(Switch);

export default function StatusSwitch({ project, tower, fetchProject }) {
	// UI
	const [error, setError] = useState(null);

	// Cancel Token
	const cancelToken = useRef(undefined);

	// Loaders
	const [loading, setLoading] = useState(false);

	const handleChange = async (event) => {
		const checked = event.target.checked;
		try {
			const data = {
				status: checked ? 'active' : 'inactive',
			};
			cancelToken.current = axios.CancelToken.source();
			await manageTowerStatus(
				project.id,
				tower._id,
				data,
				cancelToken.current,
				setLoading
			);
			setError(null);
			fetchProject();
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			{error ? (
				<Typography align="center" style={{ color: 'red' }}>
					{error}
				</Typography>
			) : (
				<Typography>Status</Typography>
			)}

			<Typography component="div">
				<Grid
					component="label"
					container
					alignItems="center"
					spacing={1}
				>
					<Grid item>
						<Typography variant="caption">Inactive</Typography>
					</Grid>
					<Grid item>
						{loading ? (
							<CircularProgress size={15} />
						) : (
							<AntSwitch
								checked={
									tower.status === 'active' ? true : false
								}
								onChange={handleChange}
								name="checkedC"
							/>
						)}
					</Grid>
					<Grid item>
						<Typography variant="caption">Active</Typography>
					</Grid>
				</Grid>
			</Typography>
		</Box>
	);
}
