import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AdminTable from '../../components/adminTable/adminTable.component';
import ProductTable from '../../components/productTable/propertySale.Table.component';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

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
							label: 'transform-none',
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
						<h3>Active properties</h3>
						<ProductTable />
					</Box>
				</Paper>
			</Box>
		</div>
	);
};

export default Admin;
