import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LocationTable from '../../components/locationTable/locationTable.component';
import { useHistory } from 'react-router-dom';

const Admin = () => {
	const history = useHistory();
	return (
		<div>
			<Box p="1rem">
				<Box display="flex" justifyContent="flex-end" mb="1rem">
					{/* <Button
						variant="contained"
						color="default"
						classes={{
							label: 'tranform-none',
						}}
						startIcon={<AddIcon />}
						size="small"
						onClick={() => history.push('/admins/add')}
					>
						Add Admin / Staff
					</Button> */}
				</Box>
				<Paper>
					<Box p="1rem">
						<h3>Locations</h3>
						<LocationTable />
					</Box>
				</Paper>
			</Box>
		</div>
	);
};

export default Admin;
