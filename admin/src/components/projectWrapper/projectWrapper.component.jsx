import React from 'react';
import {
	Box,
	Paper,
	Collapse,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PropertyOneBHK from '../propertyOneBHK/propertyOneBHK.component';

const initialStateExpand = {
	oneBhk: false,
	twoBhk: false,
	threeBhk: false,
};

const AddProject = (props) => {
	const [expand, setExpand] = React.useState(initialStateExpand);

	const toggleExpand = (section) => (e) => {
		setExpand((prevState) => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	const heading = (name) => <b className="header">{name}</b>;
	return (
		<Box p="1rem">
			<Paper>
				<Box p="1rem">
					<ListItem
						button
						onClick={toggleExpand('oneBhk')}
						classes={{
							root: 'root',
						}}
					>
						<ListItemIcon>
							<ApartmentIcon color="primary" />
						</ListItemIcon>
						<ListItemText primary={heading('1 BHK')} />
						{expand.oneBhk ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Divider />
					<Collapse in={expand.oneBhk} timeout="auto">
						<PropertyOneBHK bhk={1} {...props} />
					</Collapse>
					<ListItem
						button
						onClick={toggleExpand('twoBhk')}
						classes={{
							root: 'root',
						}}
					>
						<ListItemIcon>
							<ApartmentIcon color="primary" />
						</ListItemIcon>
						<ListItemText primary={heading('2 BHK')} />
						{expand.twoBhk ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Divider />
					<Collapse in={expand.twoBhk} timeout="auto">
						<PropertyOneBHK bhk={2} {...props} />
					</Collapse>
					<ListItem
						button
						onClick={toggleExpand('threeBhk')}
						classes={{
							root: 'root',
						}}
					>
						<ListItemIcon>
							<ApartmentIcon color="primary" />
						</ListItemIcon>
						<ListItemText primary={heading('3 BHK')} />
						{expand.threeBhk ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Divider />
					<Collapse in={expand.threeBhk} timeout="auto">
						<PropertyOneBHK bhk={3} {...props} />
					</Collapse>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddProject;
