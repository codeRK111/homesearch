import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ProjectTable from '../../components/projectTable/projectTable.component';

const Builders = () => {
	return (
		<div>
			<Box p="1rem">
				<Box display="flex" justifyContent="flex-end" mb="1rem">
					{/* <Button
						variant="contained"
						color="default"
						classes={{
							label: 'transform-none',
						}}
						startIcon={<AddIcon />}
						size="small"
						onClick={() => history.push('/admins/add')}
					>
						Add Builders / Staff
					</Button> */}
				</Box>
				<Paper>
					<Box p="1rem">
						<h3> Projects</h3>
						<ProjectTable />
					</Box>
				</Paper>
			</Box>
		</div>
	);
};

export default Builders;
