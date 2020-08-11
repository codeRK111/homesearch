import React from 'react';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AddQuery from '../../components/addQuery/addQuery.component';
import './queries.styles.scss';

function Home(props) {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setOpen(open);
	};
	return (
		<>
			<Drawer anchor={'top'} open={open} onClose={toggleDrawer(false)}>
				<div className="drawer-wrapper">
					<div>
						<div className="flex-wrapper">
							<b>Add Query (Coming Soon..)</b>
							<IconButton
								aria-label="delete"
								onClick={toggleDrawer(false)}
							>
								<CloseIcon />
							</IconButton>
						</div>
						<AddQuery />
					</div>
				</div>
			</Drawer>
			<Paper>
				<div className="button-wrapper">
					<Button
						variant="contained"
						color="primary"
						onClick={toggleDrawer(true)}
					>
						Add Query
					</Button>
				</div>
			</Paper>

			<MaterialTable
				title="Queries"
				style={{
					padding: '1rem',
				}}
				columns={[
					{
						title: 'Name',
						field: 'name',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Number',
						field: 'number',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Occupation',
						field: 'occupation',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Purpose',
						field: 'purpose',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Type of money',
						field: 'type',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'City',
						field: 'city',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Message',
						field: 'message',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
					{
						title: 'Date',
						field: 'date',
						align: 'center',
						headerStyle: {
							backgroundColor: '#34495e',
							color: '#ffffff',
						},
					},
				]}
				data={(query) =>
					new Promise((resolve, reject) => {
						let url = `${process.env.REACT_APP_BASE_URL}/get_queries.php`;
						fetch(url)
							.then((response) => response.json())
							.then((result) => {
								// console.log(result.data);
								let d = result.data.map((d) => {
									return {
										name: d.user.name,
										number: d.user.phone,
										occupation: d.occupation,
										purpose: d.purpose
											? d.purpose.name
											: 'not found',
										type: d.type.name,
										city: d.city.name,
										message: d.message,
										date: d.created_at,
									};
								});

								resolve({
									data: d,
									page: 0,
									totalCount: d.length,
								});
							});
					})
				}
				// actions={[
				// 	{
				// 		icon: 'save',
				// 		tooltip: 'Save User',
				// 		onClick: (event, rowData) =>
				// 			alert('You saved ' + rowData.name),
				// 	},
				// ]}
				options={{
					search: false,
				}}
			/>
		</>
	);
}

export default Home;
