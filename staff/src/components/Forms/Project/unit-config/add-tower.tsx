import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../../hooks/useAction';

import { Project } from '../../../../model/project.interface';
import { asyncUpdateProjectTower } from '../../../../API/project';

interface IAddProjectTower {
	id: null | string;
	project: null | Project;
	fetchProjectDetails: () => void;
}

export const AddProjectTower: React.FC<IAddProjectTower> = ({
	id,
	fetchProjectDetails,
	project,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [towers, setTowers] = useState<any>(1);
	const [updateTowerLoading, setUpdateTowerLoading] = useState(false);

	const updateTower = async () => {
		if (towers > 0 && project && id) {
			try {
				const towerNames = Array.from(
					{ length: towers },
					(_, i) => project.towerNames.length + (i + 1)
				).map((c) => ({ name: `${c}` }));
				setUpdateTowerLoading(true);
				await asyncUpdateProjectTower(towerNames, id);
				await fetchProjectDetails();
				setUpdateTowerLoading(false);
			} catch (error: any) {
				setUpdateTowerLoading(false);
				setSnackbar({
					open: true,
					message: error.message,
					severity: 'error',
				});
			}
		}
	};
	return (
		<div>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
			>
				<TextField
					id="filled-basic"
					label="Number of towers to add"
					variant="filled"
					type="number"
					value={towers}
					onChange={(e) => setTowers(e.target.value)}
				/>
			</Box>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
			>
				<Button
					color="primary"
					size="small"
					variant="contained"
					disabled={updateTowerLoading}
					onClick={updateTower}
					endIcon={
						updateTowerLoading ? (
							<CircularProgress color="inherit" size={15} />
						) : (
							<></>
						)
					}
				>
					Add Towers
				</Button>
			</Box>
		</div>
	);
};
