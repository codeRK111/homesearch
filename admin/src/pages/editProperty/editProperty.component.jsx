import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '../../components/textField/textField.component';
import Select from '../../components/select/select.component';

const forMenuItems = [
	{
		value: 'rent',
		label: 'Rent',
	},
];

const initialState = {
	for: 'rent',
	title: '',
};

const EditProperty = () => {
	const [property, setProperty] = React.useState(initialState);

	const handlePropertyChange = (e) => {
		e.persist();
		setProperty((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<Box p="1rem">
			<h3>Edit Property</h3>
			<Paper>
				<Box p="0.5rem">
					<Grid container>
						<Grid item xs={12} md={12} lg={9}>
							<Box p="0.8rem">
								<Grid container>
									<Grid item xs={12} md={12} lg={6}>
										For *
									</Grid>
									<Grid item xs={12} md={12} lg={6}>
										<Select
											name="for"
											value={property.for}
											onChange={handlePropertyChange}
											label={'Select'}
											menuItems={forMenuItems}
										/>
									</Grid>
								</Grid>
							</Box>
							<Box p="0.8rem">
								<Grid container>
									<Grid item xs={12} md={12} lg={6}>
										Title *
									</Grid>
									<Grid item xs={12} md={12} lg={6}>
										<TextField
											name="title"
											value={property.type}
											onChange={handlePropertyChange}
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default EditProperty;
